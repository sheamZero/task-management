import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
    {
        name: "Samantha Lee",
        role: "Product Designer",
        quote: "This platform has completely changed the way I learn and grow. The intuitive interface and quality content make every session worthwhile.",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
    },
    {
        name: "John Doe",
        role: "Software Engineer",
        quote: "Outstanding experience with helpful support team, truly made learning easy. I've gained skills I never thought possible.",
        photo: "https://randomuser.me/api/portraits/men/46.jpg",
        rating: 5,
    },
    {
        name: "Emily Johnson",
        role: "Marketing Manager",
        quote: "I highly recommend this platform for anyone wanting to level up skills. The community and resources are exceptional.",
        photo: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 5,
    },
    {
        name: "Michael Smith",
        role: "UX Researcher",
        quote: "Great UI and tons of valuable content, absolutely a perfect platform. Every feature is thoughtfully designed.",
        photo: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 5,
    },
    {
        name: "Rachel Adams",
        role: "Content Strategist",
        quote: "One of the best learning platforms I have ever used regularly. The progress tracking keeps me motivated daily.",
        photo: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 5,
    },
    {
        name: "Chris Evans",
        role: "Data Analyst",
        quote: "Very smooth experience here, I will definitely use it again soon. The analytics dashboard is incredibly insightful.",
        photo: "https://randomuser.me/api/portraits/men/31.jpg",
        rating: 5,
    },
];

const Testimonial = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8faf9 0%, #e8f0ed 100%)' }}>
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10" style={{ background: '#5a716b' }}></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10" style={{ background: '#5a716b' }}></div>

            <div className="container mx-auto relative z-10" data-aos="fade-up">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: '#5a716b' }}>TESTIMONIALS</p>
                    <h2 className="text-5xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
                    <div className="w-24 h-1.5 mx-auto rounded-full" style={{ background: '#5a716b' }}></div>
                </div>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Pagination, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    initialSlide={0}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    pagination={{
                        clickable: true,
                        bulletActiveClass: 'swiper-pagination-bullet-active-custom'
                    }}
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    loop={true}
                    className="testimonial-swiper"
                    style={{ paddingBottom: '60px' }}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index} style={{ width: '380px', height: 'auto' }}>
                            <div className="relative bg-white rounded-3xl p-8 shadow-lg mx-4 transition-all duration-500 hover:shadow-2xl" style={{ border: '1px solid #e5e7e6' }}>
                                {/* Quote Icon */}
                                <div className="absolute -top-4 left-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: '#5a716b' }}>
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                {/* Profile Section */}
                                <div className="flex items-center mb-6 mt-4">
                                    <div className="relative">
                                        <img
                                            src={testimonial.photo}
                                            alt={testimonial.name}
                                            className="w-16 h-16 rounded-full object-cover ring-4 ring-opacity-20"
                                            style={{ ringColor: '#5a716b' }}
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow" style={{ background: '#5a716b' }}>
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
                                        <p className="text-sm" style={{ color: '#5a716b' }}>{testimonial.role}</p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <p className="text-gray-600 leading-relaxed mb-6 italic">
                                    "{testimonial.quote}"
                                </p>

                                {/* Rating */}
                                <div className="flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" style={{ color: '#5a716b' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 rounded-tl-full" style={{ background: '#5a716b' }}></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style>{`
                .testimonial-swiper .swiper-pagination-bullet {
                    background: #5a716b;
                    opacity: 0.3;
                    width: 10px;
                    height: 10px;
                    transition: all 0.3s ease;
                }
                .testimonial-swiper .swiper-pagination-bullet-active-custom {
                    opacity: 1;
                    width: 30px;
                    border-radius: 5px;
                }
                .testimonial-swiper .swiper-slide {
                    transition: all 0.3s ease;
                }
                .testimonial-swiper .swiper-slide-active {
                    transform: scale(1.05);
                }
            `}</style>
        </section>
    );
};

export default Testimonial;