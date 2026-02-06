import React, { useEffect } from 'react';
import { FaMoneyBillWave, FaLock, FaBolt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhyChooseUs = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const features = [
        {
            icon: <FaMoneyBillWave className="text-5xl" />,
            title: "Fast Payouts",
            description: "Withdraw your earnings quickly with Bkash, Nagad, or Rocket. Get your money when you need it.",
            color: '#5a716b',
            accentColor: '#4a9d7f',
        },
        {
            icon: <FaLock className="text-5xl" />,
            title: "Secure & Transparent",
            description: "Your data and coins are protected with role-based access and secure tokens. Trust is our priority.",
            color: '#5a716b',
            accentColor: '#6d8680',
        },
        {
            icon: <FaBolt className="text-5xl" />,
            title: "Real-Time Updates",
            description: "Get instant notifications for approvals, payments, and submissions. Stay informed every step.",
            color: '#5a716b',
            accentColor: '#7a9589',
        },
    ];

    return (
        <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4f3 0%, #e0e8e6 100%)' }}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #5a716b 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 animate-float" style={{ background: '#5a716b' }}></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 animate-float-delayed" style={{ background: '#5a716b' }}></div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: '#5a716b' }}>OUR ADVANTAGES</p>
                    <h2 className="text-5xl font-bold text-gray-800 mb-6">Why Choose TaskMint?</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Experience the difference with our platform built for efficiency, security, and your success</p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative group"
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            {/* Glow Effect on Hover */}
                            <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.accentColor})` }}></div>

                            {/* Main Card */}
                            <div className="relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                {/* Top Accent Bar */}
                                <div className="absolute top-0 left-0 w-full h-1.5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" style={{ background: `linear-gradient(90deg, ${feature.color}, ${feature.accentColor})` }}></div>

                                {/* Icon Container */}
                                <div className="relative mb-6">
                                    {/* Icon Background Circle */}
                                    <div className="w-28 h-28 mx-auto rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-110" style={{ background: `${feature.color}10` }}>
                                        {/* Spinning Border */}
                                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                                            background: `conic-gradient(from 0deg, transparent, ${feature.color}, transparent)`,
                                            animation: 'spin 3s linear infinite'
                                        }}></div>

                                        {/* Inner Circle */}
                                        <div className="absolute inset-2 rounded-full bg-white"></div>

                                        {/* Icon */}
                                        <div className="relative z-10 transition-all duration-500 group-hover:scale-110" style={{ color: feature.color }}>
                                            {feature.icon}
                                        </div>
                                    </div>

                                    {/* Floating Particles Effect */}
                                    <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-1" style={{ background: feature.color }}></div>
                                    <div className="absolute top-4 left-1/4 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-2" style={{ background: feature.accentColor }}></div>
                                    <div className="absolute top-4 right-1/4 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-3" style={{ background: feature.color }}></div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center group-hover:translate-y-1 transition-transform duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Bottom Shine Effect */}
                                <div className="absolute bottom-0 left-0 w-full h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent transform translate-y-32 group-hover:translate-y-0 transition-transform duration-700"></div>
                                </div>

                                {/* Corner Decoration */}
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-5 transition-all duration-500 group-hover:opacity-10 group-hover:scale-150" style={{ background: feature.color }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats/Trust Bar */}
                <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="600">
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2" style={{ color: '#5a716b' }}>10K+</div>
                        <div className="text-gray-600 text-sm">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2" style={{ color: '#5a716b' }}>99.9%</div>
                        <div className="text-gray-600 text-sm">Uptime</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2" style={{ color: '#5a716b' }}>24/7</div>
                        <div className="text-gray-600 text-sm">Support</div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }

                @keyframes particle-1 {
                    0% { transform: translate(0, 0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(-30px, -50px); opacity: 0; }
                }

                @keyframes particle-2 {
                    0% { transform: translate(0, 0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(-40px, -40px); opacity: 0; }
                }

                @keyframes particle-3 {
                    0% { transform: translate(0, 0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(40px, -40px); opacity: 0; }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite;
                }

                .animate-particle-1 {
                    animation: particle-1 1.5s ease-out;
                }

                .animate-particle-2 {
                    animation: particle-2 1.8s ease-out 0.2s;
                }

                .animate-particle-3 {
                    animation: particle-3 1.6s ease-out 0.1s;
                }
            `}</style>
        </section>
    );
};

export default WhyChooseUs;