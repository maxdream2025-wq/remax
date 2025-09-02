import React, { useEffect, useState } from "react";
import axios from "axios";

const Property = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [image, setImage] = useState(null);
  const [developer, setDeveloper] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/property-categories/`;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      const sortedCategories = sortCategories(res.data);
      setCategories(sortedCategories);
    } catch (err) {
      console.error(err);
    }
  };

  // Sort categories: selected ones first, then by creation date
  const sortCategories = (categoriesData) => {
    return categoriesData.sort((a, b) => {
      // First, sort by selection status (selected categories first)
      const aSelected = selectedCategories.includes(a.id);
      const bSelected = selectedCategories.includes(b.id);
      
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      
      // If both have same selection status, sort by creation date (newest first)
      return new Date(b.created_at || b.id) - new Date(a.created_at || a.id);
    });
  };

  // Toggle category selection
  const toggleCategorySelection = (categoryId) => {
    setSelectedCategories(prev => {
      const newSelected = prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
      
      // Limit to 8 selected categories
      if (newSelected.length > 8) {
        newSelected.pop(); // Remove the last one
      }
      
      return newSelected;
    });
  };

  // Update selected categories in backend (you'll need to implement this endpoint)
  const updateSelectedCategories = async () => {
    try {
      // Assuming you have an endpoint to update selected categories
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/update-selected-categories/`, {
        selected_ids: selectedCategories
      });
    } catch (err) {
      console.error("Error updating selected categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Re-sort categories when selectedCategories changes
  useEffect(() => {
    if (categories.length > 0) {
      const sortedCategories = sortCategories([...categories]);
      setCategories(sortedCategories);
    }
  }, [selectedCategories]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPropertyCategory("");
    setImage(null);
    setDeveloper(false);
    setEditMode(false);
    setEditId(null);
    setCurrentImage(null);
  };

  const createCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("property_category", propertyCategory);
      if (image) formData.append("image", image);
      formData.append("developer", developer);

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      
      // Add new category to selected if we have less than 8
      if (selectedCategories.length < 8) {
        setSelectedCategories(prev => [...prev, response.data.id]);
      }
      
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("property_category", propertyCategory);
      if (image) formData.append("image", image);
      formData.append("developer", developer);

      await axios.put(`${API_URL}${editId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      
      // Maintain the order by re-fetching and re-sorting
      await fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const editCategory = (cat) => {
    setEditMode(true);
    setEditId(cat.id);
    setTitle(cat.title);
    setDescription(cat.description);
    setPropertyCategory(cat.property_category);
    setDeveloper(cat.developer);
    setImage(null);
    setCurrentImage(cat.image);
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      
      // Remove from selected categories if it was selected
      setSelectedCategories(prev => prev.filter(catId => catId !== id));
      
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    if (editMode) {
      updateCategory();
    } else {
      createCategory();
    }
  };


  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif", gap: "40px" }}>
      {/* Form Section */}
      <div style={{ flex: "1", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <h2>{editMode ? "Edit Category" : "Add New Category"}</h2>
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
                src={`https://res.cloudinary.com/dkjpnznbf/${currentImage}`}
                alt="Current category" 
                style={{ 
                  maxWidth: "200px", 
                  maxHeight: "150px", 
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }} 
                onError={(e) => {
                  console.error("Failed to load image:", currentImage);
                  e.target.style.display = "none";
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

        {/* Developer Checkbox */}
        <div style={{ margin: "10px 0" }}>
          <label>
            <input
              type="checkbox"
              checked={developer}
              onChange={(e) => setDeveloper(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Developer
          </label>
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
            {editMode ? "Update Category" : "Add Category"}
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

        {/* Selected Categories Info */}
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#495057" }}>Selected Categories ({selectedCategories.length}/8)</h4>
          <p style={{ margin: "0", fontSize: "14px", color: "#6c757d" }}>
            Selected categories will appear at the top of the list. Click on categories to select/deselect them.
          </p>
        </div>
      </div>

      {/* Categories Table */}
      <div style={{ flex: "2" }}>
        <h2>Categories</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Select</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Image</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Description</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Category</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Developer</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr 
                key={cat.id} 
                style={{ 
                  borderBottom: "1px solid #eee",
                  backgroundColor: selectedCategories.includes(cat.id) ? "#e8f5e8" : "transparent"
                }}
              >
                <td style={{ padding: "10px" }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategorySelection(cat.id)}
                    style={{ transform: "scale(1.2)" }}
                  />
                </td>
                <td style={{ padding: "10px" }}>
                  {cat.image && (
                    <img 
                      src={`https://res.cloudinary.com/dkjpnznbf/${cat.image}`}
                      alt={cat.title} 
                      style={{ 
                        width: "60px", 
                        height: "40px", 
                        objectFit: "cover",
                        borderRadius: "4px"
                      }} 
                      onError={(e) => {
                        console.error("Failed to load image:", cat.image);
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                </td>
                <td style={{ padding: "10px" }}>{cat.title}</td>
                <td style={{ padding: "10px" }}>{cat.description}</td>
                <td style={{ padding: "10px" }}>{cat.property_category}</td>
                <td style={{ padding: "10px" }}>{cat.developer ? "Yes" : "No"}</td>
                <td style={{ padding: "10px" }}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => editCategory(cat)}
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
                      onClick={() => deleteCategory(cat.id)}
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

export default Property;
