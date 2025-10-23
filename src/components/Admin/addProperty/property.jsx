import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://api.remaxdreamuae.com/api/v1"}/property/`;

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    property_name: "",
    property_sub_heading: "",
    property_desc: "",
    location: "",
    property_type: "",
    completion_date: "",
    payment_plan: "",
    starting_price: "",
    bedroom: [],
    bathroom: [],
    area: { min: "", max: "" },
    status: "",
    developer: "",
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [imageEditId, setImageEditId] = useState(null);
  const [developerEditId, setDeveloperEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [developerFormData, setDeveloperFormData] = useState({
    developer: "",
  });

  const fetchProperties = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data;
      const list = Array.isArray(data) ? data : (data?.results || []);
      setProperties(list);
    } catch (err) {
      console.error(err);
      setProperties([]);
    }
  };

  // Fetch categories when dropdown is clicked
  const handleCategoryDropdownClick = async () => {
    if (categories.length === 0 && !loadingCategories) {
      setLoadingCategories(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "https://api.remaxdreamuae.com/api/v1"}/property-categories/`
        );
        const data = res.data;
        const list = Array.isArray(data) ? data : (data?.results || []);
        setCategories(list);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    }
  };


  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "area_min") {
      setFormData({ ...formData, area: { ...formData.area, min: value } });
    } else if (name === "area_max") {
      setFormData({ ...formData, area: { ...formData.area, max: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    const arr = value.split(",").map((v) => v.trim());
    setFormData({ ...formData, [field]: arr });
  };

  const handleEdit = (property) => {
    setEditId(property.id);
    console.log("Editing property:", property); // Debug log
    console.log("Property area data:", property.area); // Debug area data
    setFormData({
      category_id: property.category?.id || property.category_id || "",
      property_name: property.property_name || "",
      property_sub_heading: property.property_sub_heading || "",
      property_desc: property.property_desc || "",
      location: property.location || "",
      property_type: property.property_type || "",
      completion_date: property.completion_date || "",
      payment_plan: property.payment_plan || "",
      starting_price: property.starting_price || "",
      bedroom: Array.isArray(property.bedroom)
        ? property.bedroom
        : (property.bedroom ? String(property.bedroom).split(',').map((v) => v.trim()).filter(Boolean) : []),
      bathroom: Array.isArray(property.bathroom)
        ? property.bathroom
        : (property.bathroom ? String(property.bathroom).split(',').map((v) => v.trim()).filter(Boolean) : []),
      area: property.area
        ? { min: property.area.min || "", max: property.area.max || "" }
        : { min: "", max: "" },
      status: property.status || "",
      developer: property.developer || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "area") {
          data.append("area", JSON.stringify(value)); // send as JSON string
        } else if (Array.isArray(value)) {
          // Backend expects CharField CSV; join arrays
          data.append(key, value.join(','));
        } else {
          data.append(key, value);
        }
      });

      if (editId) {
        await axios.put(`${API_URL}${editId}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({
        category_id: "",
        property_name: "",
        property_sub_heading: "",
        property_desc: "",
        location: "",
        property_type: "",
        completion_date: "",
        payment_plan: "",
        starting_price: "",
        bedroom: [],
        bathroom: [],
        area: { min: "", max: "" },
        status: "",
        developer: "",
      });
      setEditId(null);
      fetchProperties();
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const openImageEditor = (id) => {
    setImageEditId(id);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeveloperEditor = (property) => {
    setDeveloperEditId(property.id);
    setDeveloperFormData({
      developer: property.developer || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitImageUpdate = async (e) => {
    e.preventDefault();
    if (!imageEditId || !imageFile) return;
    
    try {
      const data = new FormData();
      data.append("property_gallery", imageFile);
      
      await axios.patch(`${API_URL}${imageEditId}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Show success message
      alert("Property image updated successfully!");
      
      // Reset form and refresh
      setImageEditId(null);
      setImageFile(null);
      fetchProperties();
    } catch (err) {
      console.error("Error updating image:", err);
      if (err.response?.data) {
        alert(`Error updating image: ${JSON.stringify(err.response.data)}`);
      } else {
        alert("Error updating image. Please try again.");
      }
    }
  };

  const submitDeveloperUpdate = async (e) => {
    e.preventDefault();
    if (!developerEditId) return;
    
    try {
      const data = new FormData();
      data.append("developer", developerFormData.developer);
      
      await axios.patch(`${API_URL}${developerEditId}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Show success message
      alert("Property developer updated successfully!");
      
      // Reset form and refresh
      setDeveloperEditId(null);
      setDeveloperFormData({
        developer: "",
      });
      fetchProperties();
    } catch (err) {
      console.error("Error updating developer:", err);
      if (err.response?.data) {
        alert(`Error updating developer: ${JSON.stringify(err.response.data)}`);
      } else {
        alert("Error updating developer. Please try again.");
      }
    }
  };

  return (
    <div className="container py-5" style={{ fontFamily: 'Arial, sans-serif' }}>
      <style jsx>{`
        .table th {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        .table td {
          vertical-align: middle;
        }
        .btn-group .btn {
          margin-right: 5px;
        }
        .btn-group .btn:last-child {
          margin-right: 0;
        }
        .badge {
          font-size: 0.75rem;
          padding: 0.35em 0.65em;
        }
        .property-image {
          transition: transform 0.2s ease;
        }
        .property-image:hover {
          transform: scale(1.05);
        }
      `}</style>
      <h3 className="mb-4 text-primary">{editId ? "Edit Property" : "Add Property"}</h3>
      {imageEditId && (
        <div className="bg-white p-4 rounded shadow mb-5">
          <h5 className="mb-3">Update Property Image (ID: {imageEditId})</h5>
          
          {/* Current Image Display */}
          {(() => {
            const currentProperty = properties.find(p => p.id === imageEditId);
            return currentProperty?.property_gallery && currentProperty.property_gallery !== 'null' && currentProperty.property_gallery.trim() !== '' ? (
              <div className="mb-3">
                <label className="form-label">Current Image:</label>
                <div className="text-center">
                  <img 
                    src={`https://res.cloudinary.com/dkjpnznbf/${currentProperty.property_gallery}`}
                    alt="Current property image"
                    style={{ 
                      maxWidth: "300px", 
                      maxHeight: "200px", 
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "2px solid #ddd"
                    }}
                    onError={(e) => {
                      console.error("Failed to load current image:", currentProperty.property_gallery);
                      e.target.src = "/assets/building_bg.jpg";
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-3">
                <label className="form-label">Current Image:</label>
                <div className="text-center">
                  <div 
                    style={{ 
                      width: "300px", 
                      height: "200px", 
                      backgroundColor: "#f8f9fa",
                      border: "2px dashed #ddd",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6c757d"
                    }}
                  >
                    No Image Currently Set
                  </div>
                </div>
              </div>
            );
          })()}
          
          <form onSubmit={submitImageUpdate}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Choose New Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required
                />
                <small className="text-muted">Select a new image file to upload</small>
              </div>
              <div className="col-md-6">
                <label className="form-label">Image Preview</label>
                {imageFile && (
                  <div className="text-center">
                    <img 
                      src={URL.createObjectURL(imageFile)}
                      alt="New image preview"
                      style={{ 
                        maxWidth: "100%", 
                        maxHeight: "150px", 
                        objectFit: "cover",
                        borderRadius: "4px",
                        border: "1px solid #ddd"
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark">
                <i className="fas fa-save me-2"></i>Update Image
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => { 
                  setImageEditId(null); 
                  setImageFile(null); 
                }}
              >
                <i className="fas fa-times me-2"></i>Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {developerEditId && (
        <div className="bg-white p-4 rounded shadow mb-5">
          <h5 className="mb-3">Edit Developer (ID: {developerEditId})</h5>
          
          <form onSubmit={submitDeveloperUpdate}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Developer Name</label>
                <input
                  type="text"
                  name="developer"
                  placeholder="Enter developer name"
                  value={developerFormData.developer}
                  onChange={(e) => setDeveloperFormData({...developerFormData, developer: e.target.value})}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark">
                <i className="fas fa-save me-2"></i>Update Developer
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => { 
                  setDeveloperEditId(null); 
                  setDeveloperFormData({
                    developer: "",
                  });
                }}
              >
                <i className="fas fa-times me-2"></i>Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Show error messages */}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          <ul className="mb-0">
            {Object.entries(errors).map(([field, msgs]) =>
              (Array.isArray(msgs) ? msgs : [msgs]).map((msg, idx) => (
                <li key={field + idx}>
                  <strong>{field.replace("_", " ")}:</strong> {msg}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-5"
      >
        {/* Row 1 */}
        <div className="row mb-3">
          <div className="col-md-3">
            <select
              name="category_id"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: Number(e.target.value) })
              }
              onClick={handleCategoryDropdownClick}
              className="form-control"
              required
            >
              <option value="">Select Category</option>
              {loadingCategories && <option disabled>Loading...</option>}
              {!loadingCategories && categories.length === 0 && (
                <option disabled>No data found</option>
              )}
              {!loadingCategories &&
                categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.property_category || cat.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-3" style={{ position: 'relative', zIndex: 1000 }}>
            <select
              name="property_type"
              value={formData.property_type || ""}
              onChange={handleChange}
              className="form-control"
              style={{ position: 'relative', zIndex: 1000 }}
              required
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Town House">Town House</option>
              <option value="Studio">Studio</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Office">Office</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Retail">Retail</option>
              {/* Show current value if it doesn't match any option */}
              {formData.property_type && 
               !["Apartment", "Villa", "Town House", "Studio", "Penthouse", "Duplex", "Office", "Warehouse", "Retail"].includes(formData.property_type) && (
                <option value={formData.property_type}>{formData.property_type}</option>
              )}
            </select>
            {/* Debug info - remove this after testing */}
            {editId && formData.property_type && (
              <small className="text-muted d-block mt-1">
                Current: "{formData.property_type}"
              </small>
            )}
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="completion_date"
              placeholder="Completion Date"
              value={formData.completion_date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="payment_plan"
              placeholder="Payment Plan"
              value={formData.payment_plan}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="text"
              name="property_name"
              placeholder="Property Name"
              value={formData.property_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="property_sub_heading"
              placeholder="Sub Heading"
              value={formData.property_sub_heading}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="developer"
              placeholder="Developer (optional)"
              value={formData.developer}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        {/* Row 3 */}
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Bedrooms (comma separated)"
              value={formData.bedroom.join(",")}
              onChange={(e) => handleArrayChange(e, "bedroom")}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Bathrooms (comma separated)"
              value={formData.bathroom.join(",")}
              onChange={(e) => handleArrayChange(e, "bathroom")}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="area_min"
              placeholder="Area Min"
              value={formData.area.min}
              onChange={handleChange}
              className="form-control"
            />
            {/* Debug info - remove this after testing */}
            {editId && (
              <small className="text-muted d-block mt-1">
                Min: "{formData.area.min}"
              </small>
            )}
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="area_max"
              placeholder="Area Max"
              value={formData.area.max}
              onChange={handleChange}
              className="form-control"
            />
            {/* Debug info - remove this after testing */}
            {editId && (
              <small className="text-muted d-block mt-1">
                Max: "{formData.area.max}"
              </small>
            )}
          </div>
        </div>
        {/* Row 4 */}
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="number"
              name="starting_price"
              placeholder="Starting Price"
              value={formData.starting_price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        {/* Description */}
        <div className="row mb-3">
          <div className="col-12">
            <textarea
              name="property_desc"
              placeholder="Property Description"
              value={formData.property_desc}
              onChange={handleChange}
              className="form-control"
              rows={3}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark px-4 py-2">
          {editId ? "Update Property" : "Add Property"}
        </button>
      </form>

      <h2 className="mb-3 text-primary">Property List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Property Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Starting Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(properties) && properties.length > 0 ? (
              properties.map((property) => (
                <tr key={property.id}>
                  <td>
                    {property.property_gallery && property.property_gallery !== 'null' && property.property_gallery.trim() !== '' ? (
                      <img 
                        src={`https://res.cloudinary.com/dkjpnznbf/${property.property_gallery}`}
                        alt={property.property_name}
                        className="property-image"
                        style={{ 
                          width: "80px", 
                          height: "60px", 
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "1px solid #ddd"
                        }}
                        onError={(e) => {
                          console.error("Failed to load image:", property.property_gallery);
                          e.target.src = "/assets/building_bg.jpg";
                        }}
                      />
                    ) : (
                      <div 
                        style={{ 
                          width: "80px", 
                          height: "60px", 
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6c757d",
                          fontSize: "12px"
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{property.property_name}</strong>
                    {property.property_sub_heading && (
                      <div className="text-muted small">{property.property_sub_heading}</div>
                    )}
                  </td>
                  <td>{property.category?.property_category || property.category?.title || "N/A"}</td>
                  <td>{property.location}</td>
                  <td>
                    <span className={`badge ${property.status === 'Available' ? 'bg-success' : 'bg-warning'}`}>
                      {property.status}
                    </span>
                  </td>
                  <td>
                    {property.starting_price && (
                      <span className="text-primary fw-bold">
                        AED {parseInt(property.starting_price)}
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        onClick={() => handleEdit(property)}
                        className="btn btn-warning btn-sm"
                        title="Edit Property"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        onClick={() => openImageEditor(property.id)}
                        className="btn btn-info btn-sm"
                        title="Edit Image"
                      >
                        <i className="fas fa-image"></i> Image
                      </button>
                      <button
                        onClick={() => openDeveloperEditor(property)}
                        className="btn btn-success btn-sm"
                        title="Edit Developer"
                      >
                        <i className="fas fa-building"></i> Dev
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="btn btn-danger btn-sm"
                        title="Delete Property"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">No properties found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Property;
