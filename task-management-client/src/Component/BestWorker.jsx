import React, { useEffect, useState } from "react";
import {
    Trophy,
    Medal,
    Award,
    Coins,
    Star,
    TrendingUp,
    Crown,
    Sparkles,
} from "lucide-react";

const BestWorker = () => {
    const [worker, setWorker] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredWorker, setHoveredWorker] = useState(null);

    // Make visible after mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    // Fetch worker data
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/workerDetails`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched workers:", data);
                setWorker(Array.isArray(data) ? data : []);
            })
            .catch(() => setError("Failed to load worker details"))
            .finally(() => setLoading(false));
    }, []);

    // Icon logic
    const getRankIcon = (index) => {
        switch (index) {
            case 0:
                return { icon: Crown, color: "#FFD700", bg: "rgba(255, 215, 0, 0.1)" };
            case 1:
                return { icon: Medal, color: "#C0C0C0", bg: "rgba(192, 192, 192, 0.1)" };
            case 2:
                return { icon: Award, color: "#CD7F32", bg: "rgba(205, 127, 50, 0.1)" };
            default:
                return { icon: Star, color: "#5a716b", bg: "rgba(90, 113, 107, 0.1)" };
        }
    };

    return (
        <section className="relative py-20 px-4" style={{ backgroundColor: "#ffffff" }}>
            {/* 🌿 Background Decorative Circles */}
            <div
                className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-2xl"
                style={{ background: "#5a716b" }}
            ></div>
            <div
                className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-2xl"
                style={{ background: "#5a716b" }}
            ></div>

            {/* ✨ Floating Animated Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 120 + 60}px`,
                            height: `${Math.random() * 120 + 60}px`,
                            background: `radial-gradient(circle, rgba(90,113,107,0.1), transparent)`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* 🏆 Main Container */}
            <div className="container mx-auto relative z-10">
                {/* Header */}
                <header className="mb-16 text-center">
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                            }`}
                        style={{
                            backgroundColor: "rgba(90, 113, 107, 0.1)",
                            borderColor: "rgba(90, 113, 107, 0.3)",
                        }}
                    >
                        <Trophy className="w-4 h-4" style={{ color: "#5a716b" }} />
                        <span className="text-sm font-semibold" style={{ color: "#5a716b" }}>
                            Top Performers
                        </span>
                    </div>

                    <h2
                        className={`text-5xl md:text-6xl font-bold mb-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                        style={{ color: "#1e293b", transitionDelay: "200ms" }}
                    >
                        Best Workers
                    </h2>
                    <p
                        className={`text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                        style={{ color: "#64748b", transitionDelay: "400ms" }}
                    >
                        Meet our exceptional contributors who consistently deliver outstanding results.
                    </p>
                </header>

                {/* Loading / Error / Empty States */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div
                            className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin mb-4"
                            style={{ borderColor: "#5a716b", borderTopColor: "transparent" }}
                        />
                        <p className="text-lg" style={{ color: "#64748b" }}>
                            Loading top performers...
                        </p>
                    </div>
                )}

                {error && (
                    <div
                        className="max-w-md mx-auto p-6 rounded-2xl text-center"
                        style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                    >
                        <p className="text-lg font-semibold" style={{ color: "#dc2626" }}>
                            {error}
                        </p>
                    </div>
                )}

                {!loading && worker.length === 0 && !error && (
                    <div
                        className="max-w-md mx-auto p-8 rounded-2xl text-center"
                        style={{ backgroundColor: "rgba(90, 113, 107, 0.05)" }}
                    >
                        <Trophy className="w-16 h-16 mx-auto mb-4" style={{ color: "#5a716b" }} />
                        <p className="text-lg" style={{ color: "#64748b" }}>
                            No workers found yet. Be the first!
                        </p>
                    </div>
                )}

                {/* 👩‍💻 Workers Grid */}
                {!loading && worker.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {worker.map((w, index) => {
                            const rankInfo = getRankIcon(index);
                            const RankIcon = rankInfo.icon;

                            return (
                                <div
                                    key={w._id || index}
                                    className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                                        }`}
                                    style={{
                                        transitionDelay: `${600 + index * 100}ms`,
                                        boxShadow:
                                            hoveredWorker === w._id
                                                ? "0 25px 50px -12px rgba(90, 113, 107, 0.25)"
                                                : "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
                                    }}
                                    onMouseEnter={() => setHoveredWorker(w._id)}
                                    onMouseLeave={() => setHoveredWorker(null)}
                                >
                                    {/* Rank Badge */}
                                    {index < 3 && (
                                        <div
                                            className="absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm"
                                            style={{ backgroundColor: rankInfo.bg }}
                                        >
                                            <RankIcon className="w-6 h-6" style={{ color: rankInfo.color }} />
                                        </div>
                                    )}

                                    {/* Gradient Header */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-32 transition-all duration-500"
                                        style={{
                                            background: `linear-gradient(135deg, rgba(90,113,107,${hoveredWorker === w._id ? "0.2" : "0.1"
                                                }), rgba(90,113,107,0.05))`,
                                        }}
                                    />

                                    {/* Worker Info */}
                                    <div className="relative p-8 flex flex-col items-center text-center">
                                        <div className="relative mb-6">
                                            <div
                                                className="absolute inset-0 rounded-full animate-pulse"
                                                style={{
                                                    background: `radial-gradient(circle, ${rankInfo.color}40, transparent)`,
                                                    transform: hoveredWorker === w._id ? "scale(1.2)" : "scale(1)",
                                                    transition: "transform 0.5s",
                                                }}
                                            />
                                            <div
                                                className="relative p-1 rounded-full transition-all duration-500"
                                                style={{
                                                    background:
                                                        hoveredWorker === w._id
                                                            ? `linear-gradient(135deg, ${rankInfo.color}, #5a716b)`
                                                            : `linear-gradient(135deg, #5a716b, ${rankInfo.color})`,
                                                }}
                                            >
                                                <img
                                                    src={w?.imageUrl}
                                                    alt={w?.name || "Worker"}
                                                    className="w-28 h-28 rounded-full border-4 border-white object-cover"
                                                />
                                            </div>
                                            <div
                                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold border-2 border-white"
                                                style={{
                                                    backgroundColor: rankInfo.color,
                                                    color: "white",
                                                }}
                                            >
                                                #{index + 1}
                                            </div>
                                        </div>

                                        <h3
                                            className="text-2xl font-bold mb-3 transition-colors duration-300"
                                            style={{
                                                color: hoveredWorker === w._id ? "#5a716b" : "#1e293b",
                                            }}
                                        >
                                            {w.name}
                                        </h3>

                                        <div
                                            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
                                            style={{
                                                backgroundColor:
                                                    hoveredWorker === w._id
                                                        ? "rgba(90, 113, 107, 0.15)"
                                                        : "rgba(90, 113, 107, 0.1)",
                                            }}
                                        >
                                            <Coins
                                                className="w-5 h-5 transition-transform duration-300"
                                                style={{
                                                    color: "#5a716b",
                                                    transform:
                                                        hoveredWorker === w._id ? "rotate(180deg)" : "rotate(0)",
                                                }}
                                            />
                                            <span className="font-bold text-xl" style={{ color: "#5a716b" }}>
                                                {w?.coin || 0}
                                            </span>
                                            <span className="text-sm" style={{ color: "#64748b" }}>
                                                coins
                                            </span>
                                        </div>

                                        {/* Sparkles for Top 3 */}
                                        {index < 3 && (
                                            <div className="mt-4 flex items-center gap-1">
                                                {[...Array(3 - index)].map((_, i) => (
                                                    <Sparkles
                                                        key={i}
                                                        className="w-3 h-3 animate-pulse"
                                                        style={{
                                                            color: rankInfo.color,
                                                            animationDelay: `${i * 0.2}s`,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Decorative Corner */}
                                    <div
                                        className="absolute bottom-0 left-0 w-16 h-16 transition-transform duration-500 rounded-tr-full"
                                        style={{
                                            background: `linear-gradient(45deg, ${rankInfo.bg}, transparent)`,
                                            transform: hoveredWorker === w._id ? "scale(1.2)" : "scale(1)",
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* CTA */}
                {!loading && worker.length > 0 && (
                    <div
                        className={`mt-20 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                        style={{ transitionDelay: "1200ms" }}
                    >
                        <div
                            className="max-w-2xl mx-auto p-8 rounded-2xl"
                            style={{ backgroundColor: "rgba(90, 113, 107, 0.05)" }}
                        >
                            <TrendingUp
                                className="w-12 h-12 mx-auto mb-4"
                                style={{ color: "#5a716b" }}
                            />
                            <h3 className="text-2xl font-bold mb-3" style={{ color: "#1e293b" }}>
                                Want to join the leaderboard?
                            </h3>
                            <p className="text-lg mb-6" style={{ color: "#64748b" }}>
                                Complete tasks consistently and earn your place among the best!
                            </p>
                            <button
                                className="group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: "#5a716b",
                                    color: "white",
                                    boxShadow: "0 10px 40px -10px rgba(90, 113, 107, 0.4)",
                                }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Earning Now
                                    <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </span>
                                <div
                                    className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                                    style={{ backgroundColor: "#4a5f59" }}
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Local animation */}
            <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.1);
          }
        }
      `}</style>
        </section>
    );
};

export default BestWorker;
