import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => setSubmitted(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail("");
        }
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f8faf9 0%, #e8f0ed 100%)' }}></div>

            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="absolute top-20 -left-20 w-96 h-96 rounded-full animate-blob" style={{ background: '#5a716b' }}></div>
                <div className="absolute top-40 -right-20 w-80 h-80 rounded-full animate-blob animation-delay-2000" style={{ background: '#6d8680' }}></div>
                <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full animate-blob animation-delay-4000" style={{ background: '#7a9589' }}></div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10" data-aos="fade-up">
                {/* Main Newsletter Card */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'linear-gradient(90deg, #5a716b 0%, #6d8680 50%, #5a716b 100%)' }}></div>

                    {/* Content Container */}
                    <div className="relative px-8 py-16 md:px-16 md:py-20">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full" style={{ background: '#5a716b' }}></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5 rounded-full" style={{ background: '#5a716b' }}></div>

                        <div className="relative z-10">
                            {/* Icon/Badge */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, #5a716b 0%, #6d8680 100%)' }}>
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Heading */}
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
                                Stay In The Loop
                            </h2>
                            <p className="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                                Subscribe to our newsletter and get exclusive updates, tips, and special offers delivered straight to your inbox. Join our community today!
                            </p>

                            {/* Success Message */}
                            {submitted && (
                                <div className="mb-8 max-w-md mx-auto animate-slide-down">
                                    <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
                                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-green-800">Successfully Subscribed!</p>
                                            <p className="text-sm text-green-600">Check your inbox for confirmation.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form */}
                            <div className="max-w-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row gap-4 p-2 bg-gray-50 rounded-2xl shadow-inner">
                                    <div className="relative flex-1">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleSubmit(e);
                                                }
                                            }}
                                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform relative overflow-hidden group"
                                        style={{ background: 'linear-gradient(135deg, #5a716b 0%, #6d8680 100%)' }}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Subscribe Now
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    </button>
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-10 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" style={{ color: '#5a716b' }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>No spam, ever</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" style={{ color: '#5a716b' }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secure & private</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" style={{ color: '#5a716b' }} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span>Unsubscribe anytime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .animate-slide-down {
                    animation: slide-down 0.5s ease-out;
                }
            `}</style>
        </section>
    );
};

export default Newsletter;