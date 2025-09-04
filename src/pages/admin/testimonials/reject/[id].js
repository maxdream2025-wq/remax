import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RejectTestimonial = () => {
  const router = useRouter();
  const { id } = router.query;
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/testimonials/`;

  useEffect(() => {
    if (id) {
      fetchTestimonial();
    }
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const response = await axios.get(`${API_URL}${id}/`);
      setTestimonial(response.data);
    } catch (err) {
      setError('Testimonial not found or already processed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    setError('');
    setMessage('');
    
    try {
      await axios.post(`${API_URL}${id}/reject/`, {
        admin_notes: adminNotes
      });
      setMessage('Testimonial rejected successfully! The user will be notified via email.');
      setTimeout(() => {
        router.push('/admin');
      }, 3000);
    } catch (err) {
      setError('Failed to reject testimonial. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleApprove = async () => {
    setActionLoading(true);
    setError('');
    setMessage('');
    
    try {
      await axios.post(`${API_URL}${id}/approve/`, {
        admin_notes: adminNotes
      });
      setMessage('Testimonial approved successfully! The user will be notified via email.');
      setTimeout(() => {
        router.push('/admin');
      }, 3000);
    } catch (err) {
      setError('Failed to approve testimonial. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #dc3545',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading testimonial...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error && !testimonial) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Error</h2>
          <p style={{ marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => router.push('/admin')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Go to Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: '#dc3545', 
          color: 'white', 
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Review Rejection</h1>
          <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
            Review ID: #{testimonial?.id}
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {message && (
            <div style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '15px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #c3e6cb'
            }}>
              {message}
            </div>
          )}

          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '15px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #f5c6cb'
            }}>
              {error}
            </div>
          )}

          {/* Review Details */}
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '30px'
          }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Review Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <strong>Name:</strong> {testimonial?.name}
              </div>
              <div>
                <strong>Email:</strong> {testimonial?.email || 'Not provided'}
              </div>
              <div>
                <strong>Rating:</strong> 
                <span style={{ color: '#FFD700', marginLeft: '5px' }}>
                  {'★'.repeat(testimonial?.rating || 0)}
                </span>
                <span style={{ marginLeft: '5px' }}>({testimonial?.rating}/5)</span>
              </div>
              <div>
                <strong>Status:</strong> 
                <span style={{
                  backgroundColor: testimonial?.approval_status === 'pending' ? '#ffc107' : 
                                  testimonial?.approval_status === 'approved' ? '#28a745' : '#dc3545',
                  color: testimonial?.approval_status === 'pending' ? '#000' : '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginLeft: '5px'
                }}>
                  {testimonial?.approval_status?.toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <strong>Review Text:</strong>
              <div style={{
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                marginTop: '10px',
                fontStyle: 'italic',
                borderLeft: '4px solid #dc3545'
              }}>
                "{testimonial?.text}"
              </div>
            </div>

            <div style={{ marginTop: '15px', fontSize: '14px', color: '#6c757d' }}>
              <strong>Submitted:</strong> {testimonial?.created_at ? new Date(testimonial.created_at).toLocaleString() : 'N/A'}
            </div>
          </div>

          {/* Admin Notes */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Rejection Reason (Optional):
            </label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                resize: 'vertical',
                fontSize: '14px'
              }}
              placeholder="Add reason for rejection (this will be kept private)..."
            />
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => router.push('/admin')}
              disabled={actionLoading}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: actionLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                opacity: actionLoading ? 0.6 : 1
              }}
            >
              Cancel
            </button>
            
            <button
              onClick={handleApprove}
              disabled={actionLoading || testimonial?.approval_status !== 'pending'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: (actionLoading || testimonial?.approval_status !== 'pending') ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                opacity: (actionLoading || testimonial?.approval_status !== 'pending') ? 0.6 : 1
              }}
            >
              {actionLoading ? 'Processing...' : 'Approve Instead'}
            </button>
            
            <button
              onClick={handleReject}
              disabled={actionLoading || testimonial?.approval_status !== 'pending'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: (actionLoading || testimonial?.approval_status !== 'pending') ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                opacity: (actionLoading || testimonial?.approval_status !== 'pending') ? 0.6 : 1
              }}
            >
              {actionLoading ? 'Processing...' : 'Reject Review'}
            </button>
          </div>

          {testimonial?.approval_status !== 'pending' && (
            <div style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              padding: '15px',
              borderRadius: '4px',
              marginTop: '20px',
              border: '1px solid #ffeaa7',
              textAlign: 'center'
            }}>
              This review has already been {testimonial?.approval_status}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RejectTestimonial;
