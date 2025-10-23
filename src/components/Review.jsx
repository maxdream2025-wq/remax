"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://api.remaxdreamuae.com/api/v1"}/testimonial/`;

const ReviewSlider = ({ testimonials }) => {
  const items = Array.isArray(testimonials) ? testimonials : [];
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "5",
    review: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setErrors({});
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        name: form.name,
        email: form.email,
        rating: form.rating,
        text: form.review,
      });

      if (response.status === 201 || response.status === 200) {
        setStatus("success");
        setForm({ name: "", email: "", rating: "5", review: "" });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data); // Django REST validation errors
      } else {
        setStatus("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5" style={{ backgroundColor: "rgb(226, 226, 226)" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: "#003366" }}>
            What Our Clients Say
          </h1>
          <p className="text-muted">
            Trusted by hundreds of property seekers across Dubai
          </p>
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          >
            Write a review
          </span>
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
          ) : (
            items.map((t, index) => (
              <SwiperSlide key={index}>
                <div className="card shadow-sm p-4 h-100">
                  <p className="mb-3">
                    "{t.text || t.message || t.review || t.content || ""}"
                  </p>
                  <div className="fw-bold">
                    {t.name || t.author || t.user || "Anonymous"}
                  </div>
                  <div style={{ color: "#FFD700" }}>
                    {"★".repeat(
                      Math.max(0, Math.min(5, Number(t.rating) || 0))
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Write a Review</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  >X</button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && (
                      <small className="text-danger">{errors.name[0]}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email (optional)</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email[0]}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select
                      name="rating"
                      className="form-select"
                      value={form.rating}
                      onChange={handleChange}
                      required
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    {errors.rating && (
                      <small className="text-danger">{errors.rating[0]}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Review</label>
                    <textarea
                      name="review"
                      className="form-control"
                      rows={3}
                      value={form.review}
                      onChange={handleChange}
                      required
                    />
                    {errors.text && (
                      <small className="text-danger">{errors.text[0]}</small>
                    )}
                  </div>

                  {status === "success" && (
                    <div className="text-success mb-2">
                      ✅ Review submitted successfully! Your review will be reviewed by our team and published once approved.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="text-danger mb-2">
                      ❌ Failed to submit review.
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSlider;
