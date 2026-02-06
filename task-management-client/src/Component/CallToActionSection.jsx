import { NavLink } from "react-router";
import { motion } from "framer-motion";

export const CallToActionSection = () => (
  <section className="py-20 bg-base-300">
    <div className="container mx-auto px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-primary mb-6"
      >
        Ready to Start Earning & Learning?
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex justify-center gap-4"
      >
        <NavLink
          to="/register"
          className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/70 transition"
        >
          Get Started
        </NavLink>
        <NavLink
          to="/about"
          className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/50 transition"
        >
          Learn More
        </NavLink>
      </motion.div>
    </div>
  </section>
);
