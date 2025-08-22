import React from "react";

const WhyRemax = () => {
  return (
    <>
      <section
        className="py-5 bg-light text-dark"
      >
        <div className="container">
          {/* Summary Paragraphs */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-12">
              <h1
                className="mb-4 text-center section-title"
                style={{ color: "#003366" }}
              >
                Why RE/MAX?
              </h1>
              <p className="text-center" style={{ textAlign: "justify" }}>
                For over <strong>50 years</strong>, RE/MAX has been a pioneer in
                revolutionizing the real estate industry, offering unparalleled
                expertise and a client-focused approach that sets us apart.
                Ensuring you receive dedicated service from passionate
                professionals. Trust is the foundation of every successful
                property journey. At RE/MAX, we combine decades of experience
                with cutting-edge technology to provide transparent, efficient,
                and personalized solutions tailored to your unique needs—
                whether you're buying, selling, or investing. Our global network
                connects you to the best opportunities worldwide, backed by a
                reputation for integrity and results. When you work with RE/MAX,
                you're not just engaging a real estate agency—you’re partnering
                with a team committed to turning your property dreams into
                reality with confidence and peace of mind. Choose RE/MAX for a
                trusted partnership, proven expertise, and a commitment to
                excellence at every step.
              </p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="row g-4 text-center mt-4">
            {/* Card 1: End-to-End Services */}
            <div className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm p-4"
                style={{
                  background: "linear-gradient(135deg, #003366, #1a4a89)",
                  borderRadius: "12px",
                }}
              >
                <h4
                  className="text-white fw-bold"
                  style={{ fontSize: "30px" }}
                >
                  End-to-End <br /> Solutions
                </h4>
                <p className="text-white mb-0">
                  From property search step to handover step and after-sales
                  support — we’re with you every step of the way.
                </p>
              </div>
            </div>

            {/* Card 2: Investment Advisory */}
            <div className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm p-4"
                style={{
                  background: "linear-gradient(135deg, #1E45AB, #4776e6)",
                  borderRadius: "12px",
                }}
              >
                <h4
                  className="text-white fw-bold"
                  style={{ fontSize: "30px" }}
                >
                  Smart Investment Solutions
                </h4>
                <p className="text-white mb-0">
                  We help you identify high-yield projects and create strategic
                  plans to maximize capital appreciation in Dubai’s growing
                  market.
                </p>
              </div>
            </div>

            {/* Card 3: People-Centered Culture */}
            <div className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm p-4"
                style={{
                  background: "linear-gradient(135deg, #B80F1D, #e94e77)",
                  borderRadius: "12px",
                }}
              >
                <h4
                  className="text-white fw-bold"
                  style={{ fontSize: "30px" }}
                >
                  Premium Property Management
                </h4>
                <p className="text-white mb-0">
                  Elevate your investment with expert care and oversight. From
                  tenant handling to seamless maintenance. We ensure your
                  property thrives — effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyRemax;
