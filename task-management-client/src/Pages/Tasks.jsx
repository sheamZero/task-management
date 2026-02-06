import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { DollarSign, Calendar, ArrowRight } from "react-feather"; // Feather Icons
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/tasks`).then(({ data }) => {
      setTasks(data);
      setIsVisible(true);
    });
  }, []);

  return (
    <section className="py-24 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
          Available Tasks
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tasks.map((task, index) => (
            <div
              key={task._id}
              className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
                }`}
              style={{
                transitionDelay: `${600 + index * 100}ms`,
                boxShadow:
                  hoveredCard === task._id
                    ? "0 25px 50px -12px rgba(90, 113, 107, 0.25)"
                    : "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7e6",
              }}
              onMouseEnter={() => setHoveredCard(task._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={task.task_image || "/fallback.jpg"}
                  alt={task.task_title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(30, 41, 59, 0.8), transparent)",
                    opacity: hoveredCard === task._id ? 1 : 0.7,
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="p-6 relative z-10">
                <h3
                  className="text-xl font-bold mb-4 line-clamp-2 min-h-[56px]"
                  style={{ color: "#1e293b" }}
                >
                  {task.task_title}
                </h3>

                {/* Info Section */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    {/* Payment */}
                    <div className="flex items-center gap-2">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: "rgba(90, 113, 107, 0.1)",
                        }}
                      >
                        <DollarSign className="w-4 h-4" style={{ color: "#5a716b" }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <p className="font-bold" style={{ color: "#5a716b" }}>
                          ${task.totalPayable}
                        </p>
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-2">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: "rgba(90, 113, 107, 0.1)",
                        }}
                      >
                        <Calendar className="w-4 h-4" style={{ color: "#5a716b" }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Deadline</p>
                        <p className="font-semibold text-xs text-gray-700">
                          {task.completion_date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Button */}
                <Link to={`/taskDetails/${task._id}`} className="block">
                  <button
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    style={{
                      backgroundColor:
                        hoveredCard === task._id
                          ? "#5a716b"
                          : "rgba(90, 113, 107, 0.1)",
                      color: hoveredCard === task._id ? "white" : "#5a716b",
                    }}
                  >
                    View Details
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === task._id ? "translate-x-1" : ""
                        }`}
                    />
                  </button>
                </Link>

                {/* Decorative Corner */}
                <div
                  className="absolute bottom-0 right-0 w-24 h-24 opacity-5 rounded-tl-full"
                  style={{ background: "#5a716b" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tasks;
