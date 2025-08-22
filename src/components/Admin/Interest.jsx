import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Interest = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/inquiry/`)
      setInquiries(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching inquiries:', err)
      setError('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className='p-4'>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-4'>
        <div className="alert alert-danger" role="alert">
          {error}
          <button className="btn btn-outline-danger ms-3" onClick={fetchInquiries}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='p-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Property Inquiries</h2>
        <button className="btn btn-primary" onClick={fetchInquiries}>
          <i className="fas fa-sync-alt me-2"></i>
          Refresh
        </button>
      </div>

      {inquiries.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          No inquiries found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover text-dark">
            <thead className="table-dark">
              <tr>
                <th className="text-white">ID</th>
                <th className="text-white">Property Name</th>
                <th className="text-white">Category</th>
                <th className="text-white">Full Name</th>
                <th className="text-white">Email</th>
                <th className="text-white">Phone Number</th>
                <th className="text-white">Message</th>
                <th className="text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => {
                console.log('Inquiry data:', inquiry); // Debug log for each inquiry
                return (
                  <tr key={inquiry.id} className="text-dark">
                    <td className="text-dark">{inquiry.id}</td>
                    <td className="text-dark">
                      <strong>{inquiry.property.property_name || 'N/A'}</strong>
                    </td>


                    <td className="text-dark">
                      <span className="badge bg-primary">{inquiry.property.category?.title || 'N/A'}</span>
                    </td>
                    <td className="text-dark">
                      <strong>{inquiry.full_name}</strong>
                    </td>
                    <td className="text-dark">
                      <a href={`mailto:${inquiry.email}`} className="text-decoration-none text-dark">
                        {inquiry.email}
                      </a>
                    </td>
                    <td className="text-dark">
                      <a href={`tel:${inquiry.phone_number}`} className="text-decoration-none text-dark">
                        {inquiry.phone_number}
                      </a>
                    </td>
                    <td className="text-dark">
                      <div className="text-truncate text-dark" style={{ maxWidth: '200px' }} title={inquiry.message}>
                        {inquiry.message || 'No message'}
                      </div>
                    </td>
                    <td className="text-dark">
                      <small className="text-dark">
                        {formatDate(inquiry.created_at || inquiry.date)}
                      </small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3">
        <small className="text-muted">
          Total Inquiries: {inquiries.length}
        </small>
      </div>
    </div>
  )
}

export default Interest