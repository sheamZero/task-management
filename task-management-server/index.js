require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const admin = require("firebase-admin");

const stripe = require("stripe")(process.env.payment_secret);

app.use(cors());
app.use(express.json());
// db
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = `mongodb+srv://${process.env.mongoDbUSER}:${process.env.mongoDbPASS}@cluster0.fflfquf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = "mongodb+srv://taskManagement:Dgac1n1G4ugoMOnp@cluster0.gusrp.mongodb.net/?appName=Cluster0";

const decoded = Buffer.from(
  process.env.firebase_service_key,
  "base64"
).toString("utf-8");
const serviceAccount = JSON.parse(decoded);

// console.log("Firebase Service Account Loaded:", serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// MiddleWare
function createVerifyFirebaseTokenMiddleware(userCollection) {
  return async function verifyFirebaseToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided. Please login again." });
    }

    const idToken = authHeader.split(" ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const email = decodedToken.email;

      if (!email) {
        return res
          .status(400)
          .json({ message: "Invalid token. Email not found." });
      }

      const user = await userCollection.findOne({ email });

      if (!user) {
        return res.status(403).json({ message: "User not found in database." });
      }

      req.user = {
        email,
        uid: decodedToken.uid,
        role: user.role,
      };

      next();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid token. Please login again." });
    }
  };
}

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions." });
    }
    next();
  };
};

app.get("/", (req, res) => {
  res.send("Working.........");
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
//
async function run() {
  try {
    const taskCollection = client
      .db(process.env.mongoDbUSER)
      .collection("taskCollection");
    const userCollection = client
      .db(process.env.mongoDbUSER)
      .collection("userCollection");
    const paymentCollecton = client
      .db(process.env.mongoDbUSER)
      .collection("paymentCollecton");
    const submittedTaskCollecton = client
      .db(process.env.mongoDbUSER)
      .collection("submittedTaskCollecton");
    const withdrawCollection = client
      .db(process.env.mongoDbUSER)
      .collection("withdrawCollection");
    const notification = client
      .db(process.env.mongoDbUSER)
      .collection("notification");

    const verifyFirebaseToken =
      createVerifyFirebaseTokenMiddleware(userCollection);

    // USER
   app.post("/users", async (req, res) => {
  const user = req.body;
  const email = user.email;
  const existUser = await userCollection.findOne({ email });
  
  if (existUser) {
    return res.status(200).send(existUser); // return existing user
  }

  const result = await userCollection.insertOne(user);
  res.status(201).send(result);
});

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    app.delete(
      "/users/:id",
      verifyFirebaseToken,
      authorizeRoles("admin"),
      async (req, res) => {
        const id = req.params.id;
        const result = await userCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      }
    );
    app.get("/users/:email", verifyFirebaseToken, async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email: email });
      res.send(result);
    });
    // best worker
    app.get("/workerDetails", async (req, res) => {
      const result = await userCollection
        .find({ role: "worker" })
        .sort({ coin: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });
    // update user role
    app.patch(
      "/update-role/:id",
      verifyFirebaseToken,
      authorizeRoles("admin"),
      async (req, res) => {
        const id = req.params.id;
        const newRole = req.body.role;

        const user = await userCollection.findOne({ _id: new ObjectId(id) });

        if (!user) {
          res.send("No User Found");
          return;
        }

        if (user.role === newRole) {
          res.send(`already` + newRole);
          return;
        }

        const result = await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role: newRole } }
        );

        const notify = {
          message: `Your role has been updated to ${newRole}.`,
          ToEmail: user.email,
          actionRoute: "/dashboard",
          Time: new Date().toISOString(),
        };

        await notification.insertOne(notify);
        res.send(result);
      }
    );
    //

    // add task
    app.post(
      "/add-task",
      verifyFirebaseToken,
      authorizeRoles("buyer"),
      async (req, res) => {
        const task = req.body.task;

        const email = task.buyerEmail;
        const buyer = await userCollection.findOne({ email: email });
        if (!buyer) {
          res.send("Buyer Not Found");
          return;
        }

        const updateCoin = buyer.coin - task.totalPayable;
        await userCollection.updateOne(
          { email: email },
          { $set: { coin: updateCoin } }
        );

        const result = await taskCollection.insertOne(task);
        res.send(result);
      }
    );

    // get all tasks
    app.get("/tasks", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });

    app.get("/feature-task", async (req, res) => {
      res.send(
        await taskCollection
          .find()
          .sort({ payable_amount: -1 })
          .limit(8)
          .toArray()
      );
    });

    app.get("/tasks/:id", verifyFirebaseToken, async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // delete task
    app.delete("/tasks/:id", verifyFirebaseToken, async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // my task
    app.get(
      "/my-tasks/:email",
      verifyFirebaseToken,
      authorizeRoles("buyer"),
      async (req, res) => {
        const email = req.params.email;
        const result = await taskCollection
          .find({ buyerEmail: email })
          .toArray();
        res.send(result);
      }
    );

    // Update Task
    app.put(
      "/update-my-task/:id",
      verifyFirebaseToken,
      authorizeRoles("buyer"),
      async (req, res) => {
        const id = req.params.id;
        const { task_title, task_detail, submission_info } = req.body;

        const result = await taskCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              task_title,
              task_detail,
              submission_info,
            },
          }
        );

        res.send(result);
      }
    );

    // delete task
    app.delete(
      "/my-tasks/:id",
      verifyFirebaseToken,
      authorizeRoles("buyer"),
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const task = await taskCollection.findOne(query);
        const email = task.buyerEmail;
        if (!task) {
          res.send({ mgs: "No Task Found" });
          return;
        }
        const buyer = await userCollection.findOne({ email: email });
        const updateCoin = buyer.coin + task.totalPayable;
        await userCollection.updateOne(
          { email: email },
          { $set: { coin: updateCoin } }
        );
        const result = await taskCollection.deleteOne(query);
        res.send(result);
      }
    );

    // PAYMENT
    app.post(
      "/create-payment-intent",
      verifyFirebaseToken,
      async (req, res) => {
        const amountInCents = req.body.amountInCents;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
      }
    );
    // payment
    app.post(
      "/payment",
      verifyFirebaseToken,
      authorizeRoles("buyer"),
      async (req, res) => {
        const { coins, amount, currency, transactionID, email, name } =
          req.body;

        const buyer = await userCollection.findOne({ email: email });

        const updateCoin = buyer.coin + coins;

        const update = await userCollection.updateOne(
          { email: email },
          {
            $set: {
              coin: updateCoin,
            },
          }
        );

        const paymentDetails = {
          amount,
          currency,
          transactionID,
          email,
          name,
          paidAt: new Date().toISOString(),
        };

        const result = await paymentCollecton.insertOne(paymentDetails);

        res.send(result, update);
      }
    );

    // Get Payment History
    app.get(
      "/payment-history/:email",
      verifyFirebaseToken,
      authorizeRoles("buyer"),
      async (req, res) => {
        const email = req.params.email;
        const result = await paymentCollecton
          .find({ email: email })
          .sort({ paidAt: -1 })
          .toArray();
        res.send(result);
      }
    );

    // SUBMISSION task
    app.post(
      "/submitted-task",
      verifyFirebaseToken,
      authorizeRoles("worker"),
      async (req, res) => {
        const submittedTask = req.body.submittedTask;
        const newTask = {
          ...submittedTask,
          current_Date: new Date().toISOString(),
        };
        const result = await submittedTaskCollecton.insertOne(newTask);

        const nofify = {
          message: `${submittedTask.worker_name} submitted a task`,
          ToEmail: submittedTask.buyerEmail,
          actionRoute: "/dashboard",
          Time: new Date().toISOString(),
        };

        await notification.insertOne(nofify);
        res.send(result);
      }
    );
    // get submitted task
    app.get("/submitted-task", async (req, res) => {
      const buyerEmail = req.query.buyerEmail;
      let query = {};
      if (buyerEmail) {
        query = { buyerEmail: buyerEmail };
      }
      const result = await submittedTaskCollecton.find(query).toArray();
      res.send(result);
    });
    // my Submitted task
    app.get(
      "/my-submitted-task/:email",
      verifyFirebaseToken,
      async (req, res) => {
        const email = req.params.email;
        const result = await submittedTaskCollecton
          .find({ worker_email: email })
          .sort({ current_Date: -1 })
          .toArray();
        res.send(result);
      }
    );

    // Update Submitted Task
    app.patch(
      "/update-submitted-task/:id",
      verifyFirebaseToken,
      async (req, res) => {
        const id = req.params.id;
        const newStatus = req.body.newStatus;

        const submittedTask = await submittedTaskCollecton.findOne({
          _id: new ObjectId(id),
        });
        const worker = await userCollection.findOne({
          email: submittedTask.worker_email,
        });
        const task = await taskCollection.findOne({
          _id: new ObjectId(submittedTask.task_id),
        });

        if (newStatus === "approved") {
          const updatedCoin =
            parseInt(worker.coin) + parseInt(submittedTask.payable_amount);
          const updateWorkerCoin = await userCollection.updateOne(
            { email: submittedTask.worker_email },
            {
              $set: {
                coin: updatedCoin,
              },
            }
          );
          const updateStatus = await submittedTaskCollecton.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: {
                status: newStatus,
              },
            }
          );

          const updateWorker = parseInt(task.required_workers) - 1;

          const updateRequireWorker = await taskCollection.updateOne(
            { _id: new ObjectId(submittedTask.task_id) },
            { $set: { required_workers: updateWorker } }
          );

          const nofify = {
            message: `You Have Earned ${submittedTask.payable_amount} coins from ${submittedTask.buyerName}`,
            ToEmail: submittedTask.worker_email,
            actionRoute: "/dashboard",
            Time: new Date().toISOString(),
          };

          await notification.insertOne(nofify);

          res.send(updateStatus);
          return;
        }

        if (newStatus === "rejected") {
          const updateRejectStatus = await submittedTaskCollecton.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: { status: newStatus },
            }
          );

          const updateWorker = parseInt(task.required_workers) + 1;
          const updateRequireWorker = await taskCollection.updateOne(
            { _id: new ObjectId(submittedTask.task_id) },
            { $set: { required_workers: updateWorker } }
          );

          const nofify = {
            message: `Buyer ${submittedTask.buyerName} rejected your Submission for ${submittedTask.task_title}`,
            ToEmail: submittedTask.worker_email,
            actionRoute: "/dashboard",
            Time: new Date().toISOString(),
          };

          await notification.insertOne(nofify);

          res.send(updateRejectStatus);
        }
      }
    );

    // withdraw
    app.post(
      "/withdraw-request",
      verifyFirebaseToken,
      authorizeRoles("worker"),
      async (req, res) => {
        const withdrawData = req.body.withdrawData;
        const result = await withdrawCollection.insertOne(withdrawData);
        res.send(result);
      }
    );
    // Get Withdraw
    app.get("/withdraw-request", verifyFirebaseToken, async (req, res) => {
      const result = await withdrawCollection.find().toArray();
      res.send(result);
    });
    // update after mark as approve withdraw
    app.patch(
      "/approveWithdraw/:withdrawID",
      verifyFirebaseToken,
      async (req, res) => {
        const withdrawID = req.params.withdrawID;
        const withdrawReq = await withdrawCollection.findOne({
          _id: new ObjectId(withdrawID),
        });
        const updateStatus = await withdrawCollection.updateOne(
          { _id: new ObjectId(withdrawID) },
          { $set: { status: "approved" } }
        );

        if (updateStatus.modifiedCount === 1) {
          const user = await userCollection.findOne({
            email: withdrawReq.worker_email,
          });
          const updateCoin = user.coin - withdrawReq.withdrawal_coin;

          const result = await userCollection.updateOne(
            { email: withdrawReq.worker_email },
            { $set: { coin: updateCoin } }
          );

          const notify = {
            message: `Your withdrawal request has been approved. You have withdrawn $${withdrawReq.withdrawal_amount}"`,
            ToEmail: withdrawReq.worker_email,
            actionRoute: "/dashboard",
            Time: new Date().toISOString(),
          };

          await notification.insertOne(notify);
          res.send(result);
        }
      }
    );

    // get notification
    app.get("/notification/:email", verifyFirebaseToken, async (req, res) => {
      const email = req.params.email;
      const result = await notification
        .find({ ToEmail: email })
        .sort({ Time: -1 })
        .toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);
app.listen(PORT);
