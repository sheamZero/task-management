import React, { useState, useEffect } from 'react';
import { Briefcase,  TrendingUp, Award, ChevronRight, Sparkles } from 'lucide-react';

const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const slides = [
        {
            title: "Transform Your Career",
            subtitle: "Join innovative teams building the future",
            description: "Connect with top employers seeking exceptional talent like you",
            icon: TrendingUp,
            gradient: "from-slate-900/80 via-[#5a716b]/90 to-slate-800/80",
            image: "https://i.postimg.cc/gj6sB1Rx/pexels-cottonbro-4069291.jpg"
        },
        {
            title: "Your Dream Job Awaits",
            subtitle: "Discover opportunities that match your passion",
            description: "Access exclusive positions from leading companies worldwide",
            icon: Briefcase,
            gradient: "from-slate-800/80 via-[#5a716b]/90 to-slate-900/80",
            image: "https://i.postimg.cc/W4w0tTmm/pexels-olly-3764178.jpg"
        },
        {
            title: "Grow With The Best",
            subtitle: "Unlock your potential with premier employers",
            description: "Fast-track your career with personalized job recommendations",
            icon: Award,
            gradient: "from-[#5a716b]/80 via-slate-800/90 to-slate-900/80",
            image: "https://i.postimg.cc/pXKrPkJz/pexels-armin-rimoldi-5553043.jpg"
        }
    ];

    const currentSlideData = slides[currentSlide];
    const Icon = currentSlideData.icon;

    return (
        <div className="relative h-screen overflow-hidden bg-slate-900">
            {/* Animated Background Images */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                </div>
            ))}

            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            opacity: 0.2,
                            backgroundColor: '#5a716b'
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full">
                    <div className="text-center space-y-8">
                        {/* Icon Animation */}
                        <div
                            className={`inline-flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                                }`}
                            style={{ transitionDelay: '200ms' }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ backgroundColor: '#5a716b' }} />
                                <div className="relative p-6 rounded-full border-2" style={{
                                    backgroundColor: 'rgba(90, 113, 107, 0.2)',
                                    borderColor: 'rgba(90, 113, 107, 0.4)',
                                    backdropFilter: 'blur(12px)'
                                }}>
                                    <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                        {/* Title with stagger animation */}
                        <div className="space-y-4">
                            <h1
                                className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: '400ms' }}
                            >
                                {currentSlideData.title.split(' ').map((word, i) => (
                                    <span
                                        key={i}
                                        className="inline-block mr-4"
                                        style={{
                                            animation: `fadeInUp 0.8s ease-out ${0.6 + i * 0.1}s both`
                                        }}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </h1>

                            <p
                                className={`text-2xl sm:text-3xl text-white/90 font-light transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: '800ms' }}
                            >
                                {currentSlideData.subtitle}
                            </p>

                            <p
                                className={`text-lg sm:text-xl text-white/80 max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: '1000ms' }}
                            >
                                {currentSlideData.description}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div
                            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: '1200ms' }}
                        >
                            <button
                                className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Browse Jobs
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div
                                    className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                                    style={{ backgroundColor: '#5a716b' }}
                                />
                            </button>

                            <button
                                className="group px-8 py-4 rounded-full font-semibold text-lg border-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    backgroundColor: 'rgba(90, 113, 107, 0.2)',
                                    borderColor: 'rgba(90, 113, 107, 0.6)',
                                    backdropFilter: 'blur(12px)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(90, 113, 107, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(90, 113, 107, 0.2)'}
                            >
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    Post a Job
                                </span>
                            </button>
                        </div>

                        {/* Stats */}
                        <div
                            className={`grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: '1400ms' }}
                        >
                            {[
                                { number: '50K+', label: 'Active Jobs' },
                                { number: '200K+', label: 'Happy Candidates' },
                                { number: '10K+', label: 'Top Companies' }
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm sm:text-base" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-12' : 'w-8'
                            }`}
                        style={{
                            backgroundColor: index === currentSlide ? '#5a716b' : 'rgba(90, 113, 107, 0.4)'
                        }}
                        onMouseEnter={(e) => {
                            if (index !== currentSlide) {
                                e.currentTarget.style.backgroundColor = 'rgba(90, 113, 107, 0.6)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (index !== currentSlide) {
                                e.currentTarget.style.backgroundColor = 'rgba(90, 113, 107, 0.4)';
                            }
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default Banner;