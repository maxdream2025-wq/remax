import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/property/`;

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
    location_search: "",
    property_type: "",
    completion_date: "",
    payment_plan: "",
    starting_price: "",
    property_type_search: [],
    user_type: [],
    bedroom: [],
    bathroom: [],
    area: { min: "", max: "" },
    status: "",
    property_gallery: null,
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(API_URL);
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch categories when dropdown is clicked
  const handleCategoryDropdownClick = async () => {
    if (categories.length === 0 && !loadingCategories) {
      setLoadingCategories(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/property-categories/`
        );
        setCategories(res.data);
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
    setFormData({
      category_id: property.category?.id || property.category_id || "",
      property_name: property.property_name || "",
      property_sub_heading: property.property_sub_heading || "",
      property_desc: property.property_desc || "",
      location: property.location || "",
      location_search: property.location_search || "",
      property_type: property.property_type || "",
      completion_date: property.completion_date || "",
      payment_plan: property.payment_plan || "",
      starting_price: property.starting_price || "",
      property_type_search: property.property_type_search || [],
      user_type: property.user_type || [],
      bedroom: Array.isArray(property.bedroom) ? property.bedroom : [],
      bathroom: Array.isArray(property.bathroom) ? property.bathroom : [],
      area: property.area
        ? { min: property.area.min_sqft || "", max: property.area.max_sqft || "" }
        : { min: "", max: "" },
      status: property.status || "",
      property_gallery: null, // File input can't be pre-filled
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
          value.forEach((v) => data.append(key, v));
        } else if (key === "property_gallery" && value) {
          data.append(key, value);
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
        location_search: "",
        property_type: "",
        completion_date: "",
        payment_plan: "",
        starting_price: "",
        property_type_search: [],
        user_type: [],
        bedroom: [],
        bathroom: [],
        area: { min: "", max: "" },
        status: "",
        property_gallery: null,
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

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-primary">{editId ? "Edit Property" : "Add Property"}</h3>
      {/* Show error messages */}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          <ul className="mb-0">
            {Object.entries(errors).map(([field, msgs]) =>
              msgs.map((msg, idx) => (
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
          <div className="col-md-3">
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Town House">Town House</option>
              <option value="Studio">Studio</option>
            </select>
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
              name="location_search"
              placeholder="Location Search"
              value={formData.location_search}
              onChange={handleChange}
              className="form-control"
              required
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
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Property Type Search (comma separated)"
              value={formData.property_type_search.join(",")}
              onChange={(e) => handleArrayChange(e, "property_type_search")}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="User Type (comma separated)"
              value={formData.user_type.join(",")}
              onChange={(e) => handleArrayChange(e, "user_type")}
              className="form-control"
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
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="file"
              name="property_gallery"
              accept="image/*"
              onChange={e => setFormData({ ...formData, property_gallery: e.target.files[0] })}
              className="form-control"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark px-4 py-2">
          {editId ? "Update Property" : "Add Property"}
        </button>
      </form>

      <h2 className="mb-3 text-primary">Property List</h2>
      <ul className="list-group mb-5">
        {properties.map((property) => (
          <li
            key={property.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{property.property_name}</strong> -{" "}
              <span className="text-muted">{property.status}</span>
            </span>
            <div>
              <button
                onClick={() => handleEdit(property)}
                className="btn btn-warning btn-sm me-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(property.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Property;
