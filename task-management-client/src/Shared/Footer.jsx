import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="relative bg-base-300 text-base-content font-semibold overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
                <div
                    className="absolute top-10 left-20 w-72 h-72 rounded-full blur-3xl"
                    style={{ background: "#5a716b" }}
                ></div>
                <div
                    className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: "#5a716b" }}
                ></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
                {/* Logo + About */}
                <div>
                    <Link to="/" className="flex items-center space-x-2 mb-4">
                        <span className="text-3xl font-bold">
                            Task <span className="text-primary">Mint.</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed opacity-80">
                        ZenTask is a trusted micro-task platform that connects workers and
                        clients, ensuring smooth task completion and reliable earnings.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-primary uppercase">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-primary transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/tasks" className="hover:text-primary transition-colors">
                                Browse Tasks
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-primary transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-primary transition-colors">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-primary uppercase">
                        Company
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                to="/privacy"
                                className="hover:text-primary transition-colors"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/terms"
                                className="hover:text-primary transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/faq"
                                className="hover:text-primary transition-colors"
                            >
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/support"
                                className="hover:text-primary transition-colors"
                            >
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact + Socials */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-primary uppercase">
                        Get In Touch
                    </h3>
                    <p className="text-sm mb-4 opacity-80">
                        Have any questions or suggestions? We’re here to help.
                    </p>
                    <p className="text-sm opacity-90 mb-2">
                        📧 <a href="mailto:support@taskmint.com" className="hover:text-primary">support@taskmint.com</a>
                    </p>
                    <p className="text-sm opacity-90 mb-4">📍 Dhaka, Bangladesh</p>

                    <div className="flex space-x-4 mt-3">
                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary transition-all duration-200"
                            title="Facebook"
                        >
                            <FaFacebook size={22} />
                        </a>
                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary transition-all duration-200"
                            title="LinkedIn"
                        >
                            <FaLinkedin size={22} />
                        </a>
                        <a
                            href="https://www.github.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary transition-all duration-200"
                            title="GitHub"
                        >
                            <FaGithub size={22} />
                        </a>
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary transition-all duration-200"
                            title="Instagram"
                        >
                            <FaInstagram size={22} />
                        </a>
                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary transition-all duration-200"
                            title="Twitter (X)"
                        >
                            <BsTwitterX size={22} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider + Copyright */}
            <div className="border-t border-base-200 py-4 text-center text-sm text-base-content relative z-10">
                © {new Date().getFullYear()}{" "}
                <span className="font-bold text-primary">ZenTask</span>. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;
