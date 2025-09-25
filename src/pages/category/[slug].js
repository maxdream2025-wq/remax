import DynamicBanner from "@/components/DynamicBanner";
import InterestModal from "@/components/InterestModal";
import MetaData from "@/components/MetaData";
import React, { useState } from "react";

const PropertyDetails = ({ property }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  
  // Debug: Log property data to see image paths
  console.log("Property data received:", property);
  if (property && property.length > 0) {
    console.log("First property image path:", property[0]?.property_gallery);
    console.log("Constructed Cloudinary URL:", property[0]?.property_gallery ? `https://res.cloudinary.com/dkjpnznbf/${property[0]?.property_gallery}` : "No image");
  }

  const handleRegisterClick = (propertyId) => {
    setSelectedPropertyId(propertyId);
    const modal = new window.bootstrap.Modal(document.getElementById("interestModal"));
    modal.show();
  };

  if (!property || property.length === 0) {
    return (
      <>
        <DynamicBanner />
        <div className="container py-5 text-center">
          <h1>No Property Found</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <MetaData
        title={property[0]?.property_name || "Property Details | RE/MAX UAE"}
        description={property[0]?.property_desc || "Find property details at RE/MAX UAE."}
        image={property[0]?.property_gallery ? `https://res.cloudinary.com/dkjpnznbf/${property[0]?.property_gallery}` : "https://remax.ae/assets/img/brandlogo/remax_logo.svg"}
        url={`https://remax.ae/category/${property[0]?.slug || ""}`}
      />
      <DynamicBanner />
     <div className="bg-white">
     <div className="container py-5">
        {property.map((prop) => (
          <div className="card mb-4 shadow-sm" key={prop.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={prop.property_gallery ? `https://res.cloudinary.com/dkjpnznbf/${prop.property_gallery}` : "/assets/building_bg.jpg"}
                  className="img-fluid w-100 object-fit-cover"
                  style={{ height: "100%" }}
                  alt={prop.property_name}
                  onError={(e) => {
                    console.error("Failed to load image:", prop.property_gallery);
                    e.target.src = "/assets/building_bg.jpg";
                  }}
                />
              </div>
              <div className="col-md-8 p-4">
                <h3>{prop.property_name}</h3>
                <h5 className="text-muted mb-2">{prop.property_sub_heading}</h5>
                <p>{prop.property_desc}</p>

                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-12">
                        <strong>Location:</strong> {prop.location}
                      </div>
                    </div>
                  </li>
                  {prop.developer && String(prop.developer).trim() !== "" && (
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-12">
                          <strong>Developer:</strong> {prop.developer}
                        </div>
                      </div>
                    </li>
                  )}
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-6">
                        <strong>Property Type:</strong> {prop.property_type}
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
                        <strong>Completion Date:</strong> {prop.completion_date}
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
                        <strong>Payment Plan:</strong> {prop.payment_plan}
                      </div>
                      <div className="col-6">
                        <strong>Area:</strong> {prop.area.min} - {prop.area.max} sqft
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-6">
                        <strong>Starting Price:</strong> AED {prop.starting_price} M
                      </div>
                      <div className="col-6">
                        <strong>Status:</strong> {prop.status}
                      </div>
                    </div>
                  </li>
                </ul>

                <button
                  className="btn btn-dark"
                  onClick={() => handleRegisterClick(prop.id)}
                >
                  REGISTER INTEREST
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
     </div>
      {/* Render modal once, pass selected property id */}
      <InterestModal propertyId={selectedPropertyId} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/${slug}/properties`
    );
    const data = await res.json();

    const results = Array.isArray(data) ? data : (data?.results || []);

    return {
      props: {
        property: results,
      },
    };
  } catch (error) {
    return {
      props: {
        property: [],
      },
    };
  }
}

export default PropertyDetails;
