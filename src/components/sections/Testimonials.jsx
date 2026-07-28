import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { reviews } from "../../data/reviews";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Testimonials = () => {
  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
          >
            <Star size={12} className="fill-primary" /> Guest Experiences
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Voices of <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-300">Cafe Ridge</span>
          </motion.h2 >
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Don't just take our word for it. Hear from our community of food enthusiasts and lifestyle connoisseurs.
          </motion.p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="testimonial-swiper !pb-20"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id} className="max-w-[450px]">
              <motion.div
                whileHover={{ y: -10 }}
                className="relative group h-full"
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/20 to-transparent rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-[#050b1a]/80 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] h-full flex flex-col justify-between overflow-hidden shadow-2xl">
                  
                  {/* Decorative Quote Icon */}
                  <Quote className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" size={80} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex gap-1 text-primary">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                        {review.category || "Review"}
                      </span>
                    </div>

                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-light italic">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-5 relative z-10 pt-6 border-t border-white/5">
                    <div className="relative">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20 group-hover:border-primary transition-colors duration-500" 
                      />
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5 border-2 border-[#020617]">
                          <CheckCircle2 size={12} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-serif text-lg group-hover:text-primary transition-colors">{review.name}</h4>
                      <div className="flex flex-col">
                        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">{review.role}</span>
                        {review.social && (
                          <span className="text-primary/60 text-[10px] font-medium mt-0.5">{review.social}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Swiper Bullets */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #4f46e5 !important;
          opacity: 0.3;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          background: #6366f1 !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;