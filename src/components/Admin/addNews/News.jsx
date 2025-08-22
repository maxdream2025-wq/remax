import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});
  const getTodayYMD = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  };
  const [date, setDate] = useState(getTodayYMD());
  const [image, setImage] = useState(null);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/news/`;

  const fetchNews = async () => {
    try {
      const res = await axios.get(API_URL);
      setNewsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const createNews = async () => {
    try {
      setErrors({});
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      const ensuredDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : getTodayYMD();
      formData.append("date", ensuredDate);
      if (image) formData.append("image", image);

      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDesc("");
      setDate(getTodayYMD());
      setImage(null);

      fetchNews();
    } catch (err) {
      if (err?.response?.data) {
        setErrors(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif", gap: "40px" }}>
      {/* Form Section */}
      <div style={{ flex: "1", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <h2>Add News</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        {errors?.title && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "-6px" }}>
            {Array.isArray(errors.title) ? errors.title.join(", ") : String(errors.title)}
          </div>
        )}
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows="4"
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        {errors?.desc && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "-6px" }}>
            {Array.isArray(errors.desc) ? errors.desc.join(", ") : String(errors.desc)}
          </div>
        )}
        <input
          type="date"
          placeholder="Date"
          value={date}
          readOnly
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: "10px 0" }}
        />
        {errors?.image && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "-6px" }}>
            {Array.isArray(errors.image) ? errors.image.join(", ") : String(errors.image)}
          </div>
        )}
        <button
          onClick={createNews}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0073aa",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add News
        </button>
        {errors?.non_field_errors && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "10px" }}>
            {Array.isArray(errors.non_field_errors)
              ? errors.non_field_errors.join(", ")
              : String(errors.non_field_errors)}
          </div>
        )}
      </div>

      {/* News Table */}
      <div style={{ flex: "2" }}>
        <h2>News</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Title</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Description</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Image</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{item.title}</td>
                <td style={{ padding: "10px" }}>
                  <div
                    style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "300px" }}
                    title={item.desc}
                  >
                    {item.desc}
                  </div>
                </td>
                <td style={{ padding: "10px" }}>{item.date}</td>
                <td style={{ padding: "10px" }}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} style={{ width: "60px", height: "40px", objectFit: "cover" }} />
                  ) : (
                    "—"
                  )}
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => deleteNews(item.id)}
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

export default News;