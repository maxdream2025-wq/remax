import React, { useEffect, useState } from "react";
import axios from "axios";

const Property = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [image, setImage] = useState(null);

  const API_URL = "http://127.0.0.1:8000/api/v1/property-categories/";

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("property_category", propertyCategory);
      if (image) formData.append("image", image);

      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDescription("");
      setPropertyCategory("");
      setImage(null);

      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif", gap: "40px" }}>
      {/* Form Section */}
      <div style={{ flex: "1", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <h2>Add New Category</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        <input
          type="text"
          placeholder="Category"
          value={propertyCategory}
          onChange={(e) => setPropertyCategory(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: "10px 0" }}
        />
        <button
          onClick={createCategory}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0073aa",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div style={{ flex: "2" }}>
        <h2>Categories</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Description</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Category</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{cat.title}</td>
                <td style={{ padding: "10px" }}>{cat.description}</td>
                <td style={{ padding: "10px" }}>{cat.property_category}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => deleteCategory(cat.id)}
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

export default Property;
