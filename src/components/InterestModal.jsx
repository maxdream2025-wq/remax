import React, { useState } from 'react';
import axios from 'axios';

const InterestModal = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get the property ID from the button's data attribute
      const modal = document.getElementById('interestModal');
      let propertyId = null;
      
      // Try multiple ways to get the property ID
      const button = modal.querySelector('[data-bs-target="#interestModal"]');
      if (button) {
        propertyId = button.getAttribute('data-project');
      }
      
      // If not found, try to get from any button that opened the modal
      if (!propertyId) {
        const triggerButton = document.querySelector('[data-bs-target="#interestModal"][data-project]');
        if (triggerButton) {
          propertyId = triggerButton.getAttribute('data-project');
        }
      }
      
      // API endpoint for inquiry
      const response = await axios.post('http://127.0.0.1:8000/api/v1/inquiry/', {
        property_id: propertyId || '',
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        message: formData.message
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          message: ''
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          const modalInstance = bootstrap.Modal.getInstance(document.getElementById('interestModal'));
          if (modalInstance) {
            modalInstance.hide();
          }
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting interest:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Modal */}
      <div className="modal fade" id="interestModal" tabIndex="-1" aria-labelledby="interestModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="interestModalLabel">Register Your Interest</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {submitStatus === 'success' ? (
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    Message submitted successfully! We'll contact you soon.
                  </div>
                ) : submitStatus === 'error' ? (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    Sorry, there was an error submitting your interest. Please try again.
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us more about your requirements..."
                      ></textarea>
                    </div>
                  </>
                )}
              </div>
              
              <div className="modal-footer">
                {!submitStatus && (
                  <>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        'Submit Interest'
                      )}
                    </button>
                  </>
                )}
                {submitStatus === 'success' && (
                  <button type="button" className="btn btn-success" data-bs-dismiss="modal">
                    Close
                  </button>
                )}
                {submitStatus === 'error' && (
                  <>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-dark"
                      onClick={() => setSubmitStatus(null)}
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterestModal;
