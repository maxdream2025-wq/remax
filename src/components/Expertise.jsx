import React from "react";
import BuildingBg from "../assets/building_bg.jpg";

const Expertise = () => {
  return (
    <section
      className="py-5"
      style={{
        backgroundImage: `url(${BuildingBg.src})`,
      }}
    >
      <div className="container" style={{ marginTop: "-10px" }}>
        <div className="text-center mb-5">
          <h1 className="section-title text-white">Our Areas of Expertise</h1>
          <p className="text-white">
            Remax Real Estate offers a streamlined process of finding the
            perfect properties in Dubai
          </p>
        </div>

        <div className="row g-4">
          {/* Off Plan Property Sale */}
          <div className="col-md-4 mb-4">
            <div
              className="card h-100 text-center shadow-sm p-4"
              style={{
                background: "linear-gradient(135deg, #003366, #1a4a89)",
              }}
            >
              <div className="mb-3">
                <i className="bi bi-house-door-fill fs-2 display-3 text-white"></i>
              </div>
              <h5 className="card-title text-white">Off Plan Property Sale</h5>
              <p className="card-text text-white">
                Our Property Sale and Off-Plan service offers expert guidance in
                buying and selling both ready and off-plan properties in Dubai.
                We provide market analysis, property valuations, and access to
                exclusive off-plan projects, ensuring you make informed
                decisions and secure the best deals, whether you're purchasing
                your dream home or a strategic investment.
              </p>
            </div>
          </div>

          {/* Investment Advisory */}
          <div className="col-md-4 mb-4">
            <div
              className="card h-100 text-center shadow-sm p-4"
              style={{
                background: "linear-gradient(135deg, #1E45AB, #4776e6)",
              }}
            >
              <div className="mb-3">
                <i className="bi bi-graph-up-arrow fs-1 display-3 text-white"></i>
              </div>
              <h5 className="card-title text-white">Investment Advisory</h5>
              <p className="card-text text-white">
                Whether you are looking for Return on Investment (ROI) or
                capital appreciation, we provide guidance tailored to your
                financial goals in Dubai's dynamic real estate market. We help
                you identify high-potential properties, conduct thorough market
                analyses, and develop strategic investment plans, ensuring you
                achieve optimal returns and long-term growth. Trust our seasoned
                advisors to turn your real estate investments into valuable
                assets.
              </p>
            </div>
          </div>

          {/* Property Management */}
          <div className="col-md-4 mb-4">
            <div
              className="card h-100 text-center shadow-sm p-4"
              style={{
                background: "linear-gradient(135deg, #B80F1D, #e94e77)",
              }}
            >
              <div className="mb-3">
                <i className="bi bi-gear-wide-connected fs-1 display-3 text-white"></i>
              </div>
              <h5 className="card-title text-white">Property Management</h5>
              <p className="card-text text-white">
                Our Property Management service offers to maximize the value and
                performance of your real estate investments in Dubai. We handle
                everything from tenant screening and lease management to
                maintenance and financial reporting, ensuring your property is
                well maintained and profitable while providing you with peace of
                mind. Trust us to manage your property with the utmost care and
                professionalism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
