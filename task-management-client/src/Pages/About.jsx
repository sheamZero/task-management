import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-purple-100 overflow-hidden py-30">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 opacity-20 text-9xl text-purple-200 select-none pointer-events-none">✨</div>
      <div className="absolute bottom-20 right-20 opacity-20 text-8xl text-pink-200 select-none pointer-events-none">🛠️</div>
      <div className="absolute top-1/3 right-1/4 opacity-10 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 opacity-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-6 text-secondary"
        >
          About ZenTask
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-center max-w-3xl mx-auto text-gray-700 mb-16"
        >
          ZenTask is a next-generation micro-tasking platform where you can <span className="text-secondary font-semibold">earn rewards</span>, <span className="text-secondary font-semibold">learn digital skills</span>, and <span className="text-secondary font-semibold">grow with community</span>. We believe small tasks create big opportunities and lasting impact.
        </motion.p>

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl shadow-lg hover:shadow-2xl bg-white border border-primary/50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 transition"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">🚀 Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to <span className="font-semibold">empower individuals</span> by offering micro-tasks that generate income while improving technical knowledge and real-world digital skills. ZenTask makes earning accessible to everyone.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-8 rounded-3xl shadow-lg hover:shadow-2xl bg-white border border-primary/50 hover:bg-gradient-to-br hover:from-secondary/10 hover:to-primary/10 transition"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">💡 Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a <span className="font-semibold">global community</span> where anyone, regardless of background, can earn online, learn new skills, and improve career prospects. ZenTask bridges the gap between <span className="font-semibold">earning and learning</span>.
            </p>
          </motion.div>

          {/* Developer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="p-8 rounded-3xl shadow-lg hover:shadow-2xl bg-white border border-primary/50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 transition"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">👨‍💻 Join as Developer</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              ZenTask is open for developers globally to collaborate, contribute features, fix bugs, and enhance the platform. Grow as a developer while impacting thousands of users.
            </p>
            <a
              href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-SazidSifat"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-secondary text-white px-6 py-2 rounded-xl font-semibold hover:bg-secondary/70 transition"
            >
              Contribute Now
            </a>
          </motion.div>
        </div>

        {/* Extra Details Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto text-center text-gray-700 space-y-6"
        >
          <p>🌱 ZenTask is not just a platform – it’s a <span className="font-semibold text-secondary">community</span> where every small contribution matters.</p>
          <p>📈 By completing tasks, you <span className="font-semibold text-secondary">boost your skills</span> and <span className="font-semibold text-secondary">earn coins</span> that can be used for rewards and services.</p>
          <p>🤝 Our platform encourages collaboration, knowledge-sharing, and mutual growth, creating <span className="font-semibold text-secondary">opportunities for everyone</span>.</p>
          <p>🎓 ZenTask also provides <span className="font-semibold text-secondary">learning resources</span> and tutorials to help users improve their digital skills and knowledge.</p>
          <p>🏆 Achievements and leaderboards motivate users to perform better and stay engaged in completing tasks effectively.</p>
          <p>🔒 We prioritize <span className="font-semibold text-secondary">security and trust</span> to ensure a safe and reliable experience for all users.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;