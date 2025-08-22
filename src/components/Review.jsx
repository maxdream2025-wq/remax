"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const ReviewSlider = ({ testimonials }) => {
  const items = Array.isArray(testimonials)
    ? testimonials
    : [];

  return (
    <section className="py-5" style={{ backgroundColor: "rgb(226, 226, 226)" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: "#003366" }}>What Our Clients Say</h1>
          <p className="text-muted">Trusted by hundreds of property seekers across Dubai</p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {items.length === 0 ? (
            <SwiperSlide>
              <div className="card shadow-sm p-4 h-100 text-center text-muted">
                No testimonials available.
              </div>
            </SwiperSlide>
          ) : items.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="card shadow-sm p-4 h-100">
                <p className="mb-3">"{t.text || t.message || t.review || ""}"</p>
                <div className="fw-bold">{t.name || t.author || t.user || "Anonymous"}</div>
                <div style={{ color: "#FFD700" }}>
                  {"★".repeat(Math.max(0, Math.min(5, Number(t.rating) || 0)))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSlider;
