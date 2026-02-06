import React, { useEffect } from 'react';
import { FaUserPlus, FaClipboardCheck, FaMoneyBillWave } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const steps = [
        {
            icon: <FaUserPlus className="text-5xl" />,
            title: 'Sign Up',
            description: 'Create an account as a Buyer or Worker in just a few clicks.',
            color: '#5a716b',
            gradient: 'linear-gradient(135deg, #5a716b 0%, #6d8680 100%)',
        },
        {
            icon: <FaClipboardCheck className="text-5xl" />,
            title: 'Complete Tasks',
            description: 'Workers select and submit micro tasks from available opportunities.',
            color: '#7a8f88',
            gradient: 'linear-gradient(135deg, #7a8f88 0%, #8da59d 100%)',
        },
        {
            icon: <FaMoneyBillWave className="text-5xl" />,
            title: 'Get Paid',
            description: 'Earn coins for completed tasks and withdraw them as real cash.',
            color: '#5a716b',
            gradient: 'linear-gradient(135deg, #5a716b 0%, #6d8680 100%)',
        },
    ];

    return (
        <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8faf9 100%)' }}>
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full" style={{ background: '#5a716b' }}></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full" style={{ background: '#5a716b' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full" style={{ background: '#5a716b' }}></div>
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: '#5a716b' }}>SIMPLE PROCESS</p>
                    <h2 className="text-5xl font-bold text-gray-800 mb-4">How It Works</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Get started in three easy steps and begin earning or delegating tasks today</p>
                </div>

                {/* Steps Container */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connection Lines (Desktop) */}
                        <div className="hidden md:block absolute top-24 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, transparent 15%, #5a716b20 15%, #5a716b20 85%, transparent 85%)' }}></div>

                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative"
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                            >
                                {/* Step Card */}
                                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                                    {/* Number Badge */}
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform duration-500 group-hover:scale-110" style={{ background: step.gradient }}>
                                        {index + 1}
                                    </div>

                                    {/* Icon Container */}
                                    <div className="mt-8 mb-6 relative">
                                        <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `${step.color}15` }}>
                                            {/* Animated Background */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: step.gradient }}></div>

                                            {/* Icon */}
                                            <div className="relative z-10 transition-colors duration-500" style={{ color: step.color }}>
                                                <div className="group-hover:text-white transition-colors duration-500">
                                                    {step.icon}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pulse Effect */}
                                        <div className="absolute inset-0 w-24 h-24 mx-auto rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-ping" style={{ background: step.color }}></div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center transition-colors duration-300 group-hover:opacity-80" style={{ color: step.color }}>
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-center leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Hover Arrow */}
                                    <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                        <svg className="w-6 h-6" style={{ color: step.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>

                                    {/* Decorative Corner */}
                                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 rounded-tl-full transition-all duration-500 group-hover:opacity-10" style={{ background: step.gradient }}></div>
                                </div>

                                {/* Mobile Arrow */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden flex justify-center my-6">
                                        <svg className="w-8 h-8 opacity-30" style={{ color: '#5a716b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="500">
                    <button className="px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform" style={{ background: 'linear-gradient(135deg, #5a716b 0%, #6d8680 100%)' }}>
                        Get Started Now
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes ping {
                    75%, 100% {
                        transform: scale(1.2);
                        opacity: 0;
                    }
                }
                .animate-ping {
                    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;