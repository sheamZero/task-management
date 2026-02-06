import React, { useEffect, useState } from "react";
import { Briefcase, Calendar, DollarSign, ArrowRight, TrendingUp, Award, Clock, Star } from "lucide-react";
import axios from "axios";
import { Link } from "react-router";

const FeatureTask = () => {
  const [tasks, setTasks] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/feature-task`).then(({ data }) => {
      setTasks(data);
    });
  }, []);

  return (
    <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: '#5a716b',
              opacity: 0.05,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-all duration-1000 border ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            style={{
              backgroundColor: 'rgba(90, 113, 107, 0.1)',
              borderColor: 'rgba(90, 113, 107, 0.3)'
            }}
          >
            <Star className="w-4 h-4" style={{ color: '#5a716b' }} />
            <span className="text-sm font-semibold" style={{ color: '#5a716b' }}>Featured Opportunities</span>
          </div>

          <h2
            className={`text-5xl md:text-6xl font-bold mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            style={{
              color: '#1e293b',
              transitionDelay: '200ms'
            }}
          >
            Feature Tasks
          </h2>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            style={{
              color: '#64748b',
              transitionDelay: '400ms'
            }}
          >
            Choose a task, check the pay and deadline, and start earning!
          </p>
        </header>

        {/* Tasks Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {tasks.map((task, index) => (
            <div
              key={task._id}
              className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              style={{
                transitionDelay: `${600 + index * 100}ms`,
                boxShadow: hoveredCard === task._id
                  ? '0 25px 50px -12px rgba(90, 113, 107, 0.25)'
                  : '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={() => setHoveredCard(task._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={task.task_image}
                  alt={task.task_title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(30, 41, 59, 0.8), transparent)',
                    opacity: hoveredCard === task._id ? 1 : 0.7
                  }}
                />

                {/* Floating Icon */}
                {/* <div
                  className="absolute bottom-4 left-4 p-3 rounded-xl backdrop-blur-md transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transform: hoveredCard === task._id ? 'translateY(-5px)' : 'translateY(0)'
                  }}
                >
                  <Briefcase className="w-6 h-6" style={{ color: '#5a716b' }} />
                </div> */}
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 line-clamp-2 min-h-[56px]" style={{ color: '#1e293b' }}>
                  {task.task_title}
                </h3>

                {/* Info Grid */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(90, 113, 107, 0.1)' }}>
                        <DollarSign className="w-4 h-4" style={{ color: '#5a716b' }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <p className="font-bold" style={{ color: '#5a716b' }}>${task.totalPayable}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(90, 113, 107, 0.1)' }}>
                        <Calendar className="w-4 h-4" style={{ color: '#5a716b' }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Deadline</p>
                        <p className="font-semibold text-xs text-gray-700">{task.completion_date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to={`/taskDetails/${task._id}`} className="block">
                  <button
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    style={{
                      backgroundColor: hoveredCard === task._id ? '#5a716b' : 'rgba(90, 113, 107, 0.1)',
                      color: hoveredCard === task._id ? 'white' : '#5a716b'
                    }}
                  >
                    View Details
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === task._id ? 'translate-x-1' : ''
                        }`}
                    />
                  </button>
                </Link>
              </div>

              {/* Decorative Corner */}
              <div
                className="absolute top-0 right-0 w-20 h-20 transition-transform duration-500"
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, rgba(90, 113, 107, 0.1) 50%)',
                  transform: hoveredCard === task._id ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <Link to="/tasks">
            <button
              className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: '#5a716b',
                color: 'white',
                boxShadow: '0 10px 40px -10px rgba(90, 113, 107, 0.4)'
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                View All Tasks
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div
                className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{ backgroundColor: '#4a5f59' }}
              />
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '1200ms' }}
        >
          {[
            { icon: Briefcase, number: "1,000+", label: "Active Tasks" },
            { icon: Award, number: "$2.5M+", label: "Total Paid" },
            { icon: TrendingUp, number: "98%", label: "Success Rate" },
            { icon: Star, number: "50K+", label: "Happy Workers" }
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(90, 113, 107, 0.05)' }}
            >
              <div className="inline-flex p-4 rounded-full mb-3" style={{ backgroundColor: 'rgba(90, 113, 107, 0.1)' }}>
                <stat.icon className="w-6 h-6" style={{ color: '#5a716b' }} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: '#1e293b' }}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureTask;