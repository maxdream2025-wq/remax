import React, { useEffect, useState } from "react";
import axios from "axios";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://api.remaxdreamuae.com/api/v1"}/testimonial/`;
  const ADMIN_API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://api.remaxdreamuae.com/api/v1"}/admin/testimonials/`;

  const toArray = (data) => (Array.isArray(data) ? data : (data?.results || []));

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(ADMIN_API_URL);
      setTestimonials(toArray(res.data));
    } catch (err) {
      console.error(err);
      setTestimonials([]);
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

  const handleApprovalAction = (testimonial, action) => {
    setSelectedTestimonial(testimonial);
    setAdminNotes(testimonial.admin_notes || "");
    setShowApprovalModal(true);
  };

  const approveTestimonial = async () => {
    if (!selectedTestimonial) return;
    
    setLoading(true);
    try {
      await axios.post(`${ADMIN_API_URL}${selectedTestimonial.id}/approve/`, {
        admin_notes: adminNotes
      });
      setShowApprovalModal(false);
      setSelectedTestimonial(null);
      setAdminNotes("");
      fetchTestimonials();
      alert("Testimonial approved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to approve testimonial");
    } finally {
      setLoading(false);
    }
  };

  const rejectTestimonial = async () => {
    if (!selectedTestimonial) return;
    
    setLoading(true);
    try {
      await axios.post(`${ADMIN_API_URL}${selectedTestimonial.id}/reject/`, {
        admin_notes: adminNotes
      });
      setShowApprovalModal(false);
      setSelectedTestimonial(null);
      setAdminNotes("");
      fetchTestimonials();
      alert("Testimonial rejected successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to reject testimonial");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: { bg: '#ffc107', text: '#000' },
      approved: { bg: '#28a745', text: '#fff' },
      rejected: { bg: '#dc3545', text: '#fff' }
    };
    
    const color = statusColors[status] || statusColors.pending;
    
    return (
      <span 
        style={{ 
          backgroundColor: color.bg, 
          color: color.text, 
          padding: '4px 8px', 
          borderRadius: '4px', 
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        {status.toUpperCase()}
      </span>
    );
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
        <h2>Testimonials Management</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + '#ccc' }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Email</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Rating</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Status</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Text</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(testimonials) && testimonials.length > 0 ? (
              testimonials.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{t.name}</td>
                  <td style={{ padding: "10px" }}>{t.email || 'N/A'}</td>
                  <td style={{ padding: "10px" }}>
                    <span style={{ color: "#FFD700" }}>
                      {"★".repeat(t.rating)}
                    </span>
                    <span style={{ marginLeft: "5px" }}>({t.rating})</span>
                  </td>
                  <td style={{ padding: "10px" }}>{getStatusBadge(t.approval_status)}</td>
                  <td style={{ padding: "10px" }}>
                    <div
                      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}
                      title={t.text}
                    >
                      {t.text}
                    </div>
                  </td>
                  <td style={{ padding: "10px", fontSize: "12px" }}>
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                      {t.approval_status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprovalAction(t, 'approve')}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: "#28a745",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "12px",
                              borderRadius: "3px"
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApprovalAction(t, 'reject')}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: "#dc3545",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "12px",
                              borderRadius: "3px"
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteTestimonial(t.id)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#6c757d",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                          borderRadius: "3px"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: "20px", textAlign: "center", color: "#6c757d" }}>
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && selectedTestimonial && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto"
            }}
          >
            <h3>Review Details</h3>
            <div style={{ marginBottom: "15px" }}>
              <p><strong>Name:</strong> {selectedTestimonial.name}</p>
              <p><strong>Email:</strong> {selectedTestimonial.email || 'Not provided'}</p>
              <p><strong>Rating:</strong> {"★".repeat(selectedTestimonial.rating)} ({selectedTestimonial.rating}/5)</p>
              <p><strong>Review:</strong></p>
              <div style={{ 
                backgroundColor: "#f5f5f5", 
                padding: "10px", 
                borderRadius: "4px",
                borderLeft: "4px solid #007bff"
              }}>
                "{selectedTestimonial.text}"
              </div>
            </div>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                <strong>Admin Notes (optional):</strong>
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows="3"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  resize: "vertical"
                }}
                placeholder="Add notes about this review..."
              />
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedTestimonial(null);
                  setAdminNotes("");
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={rejectTestimonial}
                disabled={loading}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? "Processing..." : "Reject Review"}
              </button>
              <button
                onClick={approveTestimonial}
                disabled={loading}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? "Processing..." : "Approve Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;