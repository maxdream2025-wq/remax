import React, { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSlug, setEditSlug] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  
  const getTodayYMD = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  };
  const [date, setDate] = useState(getTodayYMD());
  const [image, setImage] = useState(null);
  const [feature, setFeature] = useState(false);
  const [order, setOrder] = useState(0);

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

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setDate(getTodayYMD());
    setImage(null);
    setFeature(false);
    setOrder(0);
    setEditMode(false);
    setEditSlug(null);
    setCurrentImage(null);
    setErrors({});
  };

  const createNews = async () => {
    try {
      setErrors({});
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      const ensuredDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : getTodayYMD();
      formData.append("date", ensuredDate);
      if (image) formData.append("image", image);
      formData.append("feature", feature);
      formData.append("order", order);

      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      fetchNews();
    } catch (err) {
      if (err?.response?.data) {
        setErrors(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  const updateNews = async () => {
    try {
      setErrors({});
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      const ensuredDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : getTodayYMD();
      formData.append("date", ensuredDate);
      if (image) formData.append("image", image);
      formData.append("feature", feature);
      formData.append("order", order);

      await axios.put(`${API_URL}${editSlug}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      fetchNews();
    } catch (err) {
      if (err?.response?.data) {
        setErrors(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  const editNews = (news) => {
    setEditMode(true);
    setEditSlug(news.slug);
    setTitle(news.title);
    setDesc(news.desc);
    setDate(news.date);
    setFeature(news.feature);
    setOrder(news.order);
    setImage(null);
    setCurrentImage(news.image);
    setErrors({});
  };

  const deleteNews = async (slug) => {
    try {
      await axios.delete(`${API_URL}${slug}/`);
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    if (editMode) {
      updateNews();
    } else {
      createNews();
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif", gap: "40px" }}>
      {/* Form Section */}
      <div style={{ flex: "1", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <h2>{editMode ? "Edit News" : "Add News"}</h2>
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
        <div style={{ margin: "10px 0" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Description:
          </label>
          <Editor
            apiKey="no-api-key"
            value={desc}
            onEditorChange={(content) => setDesc(content)}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>
        {errors?.desc && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "-6px" }}>
            {Array.isArray(errors.desc) ? errors.desc.join(", ") : String(errors.desc)}
          </div>
        )}
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        
        {/* Image Section */}
        <div style={{ margin: "10px 0" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Image:
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            style={{ margin: "10px 0" }}
          />
          
          {/* Current Image Display */}
          {currentImage && !image && (
            <div style={{ margin: "10px 0" }}>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>Current Image:</p>
              <img 
                src={currentImage ? `https://res.cloudinary.com/dkjpnznbf/${currentImage}` : "/assets/building_bg.jpg"}
                alt="Current news image" 
                style={{ 
                  maxWidth: "200px", 
                  maxHeight: "150px", 
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }} 
                onError={(e) => {
                  console.error("Failed to load image:", currentImage);
                  e.target.src = "/assets/building_bg.jpg";
                }}
              />
            </div>
          )}
          
          {/* New Image Preview */}
          {image && (
            <div style={{ margin: "10px 0" }}>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>New Image Preview:</p>
              <img 
                src={URL.createObjectURL(image)} 
                alt="New image preview" 
                style={{ 
                  maxWidth: "200px", 
                  maxHeight: "150px", 
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }} 
              />
            </div>
          )}
        </div>
        
        {errors?.image && (
          <div style={{ color: "#b00020", fontSize: "12px", marginTop: "-6px" }}>
            {Array.isArray(errors.image) ? errors.image.join(", ") : String(errors.image)}
          </div>
        )}
        
        {/* Feature Checkbox */}
        <div style={{ margin: "10px 0" }}>
          <label>
            <input
              type="checkbox"
              checked={feature}
              onChange={(e) => setFeature(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Feature this news
          </label>
        </div>

        {/* Order Field */}
        <div style={{ margin: "10px 0" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Order:
          </label>
          <input
            type="number"
            placeholder="Order (lower numbers appear first)"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
            style={{ width: "100%", padding: "8px", margin: "10px 0" }}
          />
          <small style={{ color: "#666", fontSize: "12px" }}>
            Lower numbers appear first. Set to 1 for highest priority, 2 for second, etc.
          </small>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor: editMode ? "#28a745" : "#0073aa",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            {editMode ? "Update News" : "Add News"}
          </button>
          
          {editMode && (
            <button
              onClick={resetForm}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
          )}
        </div>

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
              <th style={{ textAlign: "left", padding: "10px" }}>Image</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Title</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Description</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Featured</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Order</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>
                  {item.image ? (
                    <img 
                      src={`https://res.cloudinary.com/dkjpnznbf/${item.image}`}
                      alt={item.title} 
                      style={{ 
                        width: "60px", 
                        height: "40px", 
                        objectFit: "cover",
                        borderRadius: "4px"
                      }} 
                      onError={(e) => {
                        // Hide broken images
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
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
                  {item.feature ? "Yes" : "No"}
                </td>
                <td style={{ padding: "10px" }}>{item.order}</td>
                <td style={{ padding: "10px" }}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => editNews(item)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ffc107",
                        color: "#000",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "3px",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNews(item.slug)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "3px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
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