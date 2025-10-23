import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SearchForm = ({ categories = [], properties = [], searchError = null, searchParams = {} }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    location: searchParams.location || '',
    minPrice: searchParams.minPrice || '',
    maxPrice: searchParams.maxPrice || '',
    propertyType: searchParams.propertyType || '',
    bedroom: searchParams.bedroom || '',
    bathroom: searchParams.bathroom || '',
    userType: searchParams.userType || '',
    completionStatus: searchParams.completionStatus || '',
    areaMin: searchParams.areaMin || '',
    areaMax: searchParams.areaMax || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle router events to manage loading state
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    // Navigate to the same page with search parameters
    router.push(`/findProperty?${queryParams.toString()}`);
  };

  return (
    <section className="full-bg-section rm_banner" id="height_gal_z"
      style={{ backgroundImage: "url(/assets/PropertyTowers.jpg)" }}>
      
      {/* Slogan */}
      <div className="inner_form_ui_data listings_main_" style={{ marginTop: "10vh" }}>
        <h3 id="find-your-property" style={{ fontSize: "30px !important" }}>
          Find your perfect property in UAE with RE/MAX!
        </h3>
      </div>

      {/* Search Form */}
      <div className="container search-form-box">
        <div className="glass-form">
          <form id="search-form" onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Location */}
              <div className="col-12">
                <label htmlFor="location" className="form-label text-white">Location</label>
                <select 
                  id="location" 
                  className="form-select" 
                  style={{ padding: "5px !important" }}
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                >
                  <option value="">Select Location</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.title || category.property_category}>
                      {category.title || category.property_category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Dropdowns */}
              <div className="col-md-6 col-sm-12">
                <label className="form-label text-white">Min Price (AED)</label>
                <select 
                  id="min-price" 
                  className="form-select"
                  value={formData.minPrice}
                  onChange={(e) => handleInputChange('minPrice', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1M</option>
                  <option value="2">2M</option>
                  <option value="3">3M</option>
                  <option value="4">4M</option>
                  <option value="5">5M</option>
                  <option value="6">6M</option>
                  <option value="7">7M</option>
                  <option value="8">8M</option>
                  <option value="9">9M</option>
                  <option value="10">10M+</option>
                </select>
              </div>
              <div className="col-md-6 col-sm-12">
                <label className="form-label text-white">Max Price (AED)</label>
                <select 
                  id="max-price" 
                  className="form-select"
                  value={formData.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1M</option>
                  <option value="2">2M</option>
                  <option value="3">3M</option>
                  <option value="4">4M</option>
                  <option value="5">5M</option>
                  <option value="6">6M</option>
                  <option value="7">7M</option>
                  <option value="8">8M</option>
                  <option value="9">9M</option>
                  <option value="10">10M+</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="col-md-6 col-sm-12">
                <label htmlFor="property_type" className="form-label text-white">Property Type</label>
                <select 
                  id="property_type" 
                  className="form-select"
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Studio">Studio</option>
                  <option value="Office">Office</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="col-md-3 col-sm-6">
                <label className="form-label text-white">Bedrooms</label>
                <select 
                  id="bedroom" 
                  className="form-select"
                  value={formData.bedroom}
                  onChange={(e) => handleInputChange('bedroom', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div className="col-md-3 col-sm-6">
                <label className="form-label text-white">Bathrooms</label>
                <select 
                  id="bathroom" 
                  className="form-select"
                  value={formData.bathroom}
                  onChange={(e) => handleInputChange('bathroom', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>

              {/* User Type */}
              <div className="col-md-6">
                <label className="form-label text-white">User Type</label>
                <select 
                  id="user_type" 
                  className="form-select"
                  value={formData.userType}
                  onChange={(e) => handleInputChange('userType', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Investor">Investor</option>
                  <option value="End User">End User</option>
                </select>
              </div>

              {/* Completion Status */}
              <div className="col-md-6">
                <label className="form-label text-white">Completion Status</label>
                <select 
                  id="completion_status" 
                  className="form-select"
                  value={formData.completionStatus}
                  onChange={(e) => handleInputChange('completionStatus', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="Offplan">Off plan</option>
                  <option value="Ready">Ready</option>
                </select>
              </div>

              {/* Area */}
              <div className="col-md-6 col-sm-12">
                <label className="form-label text-white">Min Area (sqft)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="area_min"
                  value={formData.areaMin}
                  onChange={(e) => handleInputChange('areaMin', e.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <label className="form-label text-white">Max Area (sqft)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="area_max"
                  value={formData.areaMax}
                  onChange={(e) => handleInputChange('areaMax', e.target.value)}
                />
              </div>

              {/* Search Button */}
              <div className="col-12 d-flex justify-content-center mt-4">
                <button 
                  type="submit" 
                  className="btnsearch" 
                  disabled={isLoading}
                  style={{ 
                    position: 'relative',
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? (
                    <>
                      <span 
                        className="spinner-border spinner-border-sm me-2" 
                        role="status" 
                        aria-hidden="true"
                        style={{ width: '1rem', height: '1rem' }}
                      ></span>
                      Searching...
                    </>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;