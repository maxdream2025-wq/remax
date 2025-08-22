import DynamicBanner from "@/components/DynamicBanner";
import React from "react";

const PropertyDetails = ({ property }) => {
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
      <DynamicBanner />
      <div className="container py-5">
        {property.map((prop) => (
          <div className="card mb-4 shadow-sm" key={prop.id}>
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
                  data-bs-toggle="modal"
                  data-bs-target="#interestModal"
                  data-project={prop.property_name}
                >
                  REGISTER INTEREST
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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

    return {
      props: {
        property: data || [],
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
