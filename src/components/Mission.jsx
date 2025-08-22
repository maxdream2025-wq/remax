import React from "react";
import OurMission from "../assets/our_mission.avif";
import OurVision from "../assets/our_vision.jpg";
import OurValue from "../assets/our_value.jpeg";

const MissionVisionValues = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="section-title fw-bold" style={{ color: "#003366" }}>
            Mission, Vision & Values
          </h1>
          <p className="text-muted">Driving success with purpose and integrity</p>
        </div>

        {/* Mission */}
        <div className="row align-items-center mb-4">
          <div className="col-md-12">
            <div className="card shadow-sm rounded overflow-hidden">
              <div className="row g-0 align-items-center">
                <div className="col-md-5">
                  <img
                    src={OurMission.src}
                    alt="Our Mission"
                    className="img-fluid rounded-start"
                  />
                </div>
                <div className="col-md-7 p-4">
                  <h4 className="fw-bold text-dark">Our Mission</h4>
                  <p className="text-muted mb-0">
                    With full dedication, we invest in the industry's top knowledge and tools to help
                    our Real Estate Professionals and Clients turn their ambitions into reality. We lead
                    to change their lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="row align-items-center mb-4">
          <div className="col-md-12">
            <div className="card shadow-sm rounded overflow-hidden">
              <div className="row g-0 align-items-center flex-md-row-reverse">
                <div className="col-md-5">
                  <img
                    src={OurVision.src}
                    alt="Our Vision"
                    className="img-fluid rounded-end"
                  />
                </div>
                <div className="col-md-7 p-5">
                  <h4 className="fw-bold text-dark">Our Vision</h4>
                  <p className="text-muted mb-0">
                    Our vision is to be the most trusted real estate brand in UAE built on leading a
                    legacy of success. With continuous growth we excel for changing the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="row align-items-center mb-4">
          <div className="col-md-12">
            <div className="card shadow-sm rounded overflow-hidden">
              <div className="row g-0 align-items-center">
                <div className="col-md-5">
                  <img
                    src={OurValue.src}
                    alt="Our Values"
                    className="img-fluid rounded-start"
                  />
                </div>
                <div className="col-md-7 p-4">
                  <h4 className="fw-bold text-dark">Our Values</h4>
                  <p className="text-muted mb-0">
                    With VIRTUE at our core we hold ourselves ACCOUNTABLE to change people's lives. With
                    our LEADERSHIP, success is inevitable. We are UNITED in our efforts to deliver an
                    EXPERIENCE that lasts a lifetime, constantly SERVING our winners to reach beyond
                    their limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionVisionValues;
