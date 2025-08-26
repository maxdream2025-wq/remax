import React, { useState } from "react";
import InterestModal from "./InterestModal";

const SearchResult = ({
  properties = [],
  searchError = null,
  searchParams = {},
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  if (!searchParams.location) {
    return null;
  }

  const handleRegisterInterest = (propertyId) => {
    setSelectedPropertyId(propertyId);
    // Show the modal (Bootstrap)
    const modal = new window.bootstrap.Modal(document.getElementById('interestModal'));
    modal.show();
  };

  return (
    <>
      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="mb-4">Search Results</h3>

              {searchError ? (
                <div className="alert alert-danger" role="alert">
                  {searchError}
                </div>
              ) : properties.length > 0 ? (
                <div className="row">
                  {properties.map((prop, index) => (
                    <div key={prop.id || index} className="col-12 mb-4">
                      <div className="card mb-4 shadow-sm">
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              src={prop.property_gallery}
                              className="img-fluid h-100 w-100 object-fit-cover"
                              alt={prop.property_name}
                            />
                          </div>
                          <div className="col-md-8 p-4">
                            <h3>{prop.property_name}</h3>
                            <h5 className="text-muted mb-2">
                              {prop.property_sub_heading}
                            </h5>
                            <p>{prop.property_desc}</p>

                            <ul className="list-group list-group-flush mb-3">
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-12">
                                    <strong>Location:</strong>{" "}
                                    {prop.location_search || prop.location}
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-6">
                                    <strong>Property Type:</strong>{" "}
                                    {prop.property_type}
                                  </div>
                                  <div className="col-6">
                                    <strong>Bedrooms:</strong>{" "}
                                    {Array.isArray(prop.bedroom)
                                      ? prop.bedroom.join(", ")
                                      : prop.bedroom}
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-6">
                                    <strong>Completion Date:</strong>{" "}
                                    {prop.completion_date}
                                  </div>
                                  <div className="col-6">
                                    <strong>Bathrooms:</strong>{" "}
                                    {Array.isArray(prop.bathroom)
                                      ? prop.bathroom.join(", ")
                                      : prop.bathroom}
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-6">
                                    <strong>Payment Plan:</strong>{" "}
                                    {prop.payment_plan}
                                  </div>
                                  <div className="col-6">
                                    <strong>Area:</strong> {prop.area?.min_sqft}{" "}
                                    - {prop.area?.max_sqft} sqft
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-6">
                                    <strong>Starting Price:</strong> AED{" "}
                                    {parseFloat(
                                      prop.starting_price
                                    ).toLocaleString()}
                                  </div>
                                  <div className="col-6">
                                    <strong>Status:</strong> {prop.status}
                                  </div>
                                </div>
                              </li>
                            </ul>

                            <button
                              className="btn btn-dark"
                              onClick={() => handleRegisterInterest(prop.id)}
                            >
                              REGISTER INTEREST
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info" role="alert">
                  No properties found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <InterestModal propertyId={selectedPropertyId} />
    </>
  );
};

export default SearchResult;
