import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-base-200 py-30 px-6 overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 container mx-auto max-w-4xl">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center text-secondary mb-4"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Questions, feedback, or collaboration inquiries? Fill out the form below or reach out via our contact info. We are here to help you grow with ZenTask.
        </motion.p>

        {/* Contact Info Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-primary/30 hover:shadow-2xl transition"
          >
            <FaEnvelope className="text-primary w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-gray-600 text-center">support@zentask.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-primary/30 hover:shadow-2xl transition"
          >
            <FaPhoneAlt className="text-secondary w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-gray-600 text-center">+880 1909758810</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-primary/30 hover:shadow-2xl transition"
          >
            <FaMapMarkerAlt className="text-primary w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-gray-600 text-center">Rajshahi, Bangladesh</p>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white p-10 rounded-2xl shadow-xl border border-primary/30 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-4 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-4 border border-primary/30 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            required
            className="w-full p-4 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
          />

          <textarea
            rows={6}
            placeholder="Your Message"
            required
            className="w-full p-4 border border-primary/30 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition resize-none"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/80 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;