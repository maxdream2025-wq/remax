import React, { useEffect, useState } from "react";
import axios from "axios";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});

  const API_URL = "http://127.0.0.1:8000/api/v1/testimonial/";

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(API_URL);
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const createTestimonial = async () => {
    try {
      setErrors({});
      const payload = {
        name,
        rating: Number(rating),
        text,
      };

      await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setName("");
      setRating(5);
      setText("");
      fetchTestimonials();
    } catch (err) {
      if (err?.response?.data) {
        setErrors(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif", gap: "40px" }}>
      {/* Form Section */}
      <div style={{ flex: "1", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <h2>Add Testimonial</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        {errors?.name && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "-6px" }}>
            {Array.isArray(errors.name) ? errors.name.join(", ") : String(errors.name)}
          </div>
        )}
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        {errors?.rating && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "-6px" }}>
            {Array.isArray(errors.rating) ? errors.rating.join(", ") : String(errors.rating)}
          </div>
        )}
        <textarea
          placeholder="Feedback"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        {errors?.text && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "-6px" }}>
            {Array.isArray(errors.text) ? errors.text.join(", ") : String(errors.text)}
          </div>
        )}
        <button
          onClick={createTestimonial}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0073aa",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add Testimonial
        </button>
      </div>

      {/* Table Section */}
      <div style={{ flex: "2" }}>
        <h2>Testimonials</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Rating</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Text</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{t.name}</td>
                <td style={{ padding: "10px" }}>{t.rating}</td>
                <td style={{ padding: "10px" }}>
                  <div
                    style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "360px" }}
                    title={t.text}
                  >
                    {t.text}
                  </div>
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Testimonial;