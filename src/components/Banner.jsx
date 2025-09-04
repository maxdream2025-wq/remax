import React from "react";
import RemaxMap from "../assets/Remax_Real_Estate_Map.jpg";
import RemaxMap_2 from "../assets/slogan_img.jpg";
import MobileBanner from "../assets/img.jpg"; // Mobile background image

const Banner = () => {
  return (
    <>
      <section
        className="full-bg-section rm_banner"
        id="height_gal_z"
        style={{
          backgroundImage: "url(https://remax.ae/public/uploads/pages/page_top_banner_image8853982.3747261.webp)",
        }}
      >
        {/* Mobile Background Image */}
        <div 
          className="d-block d-md-none mobile-banner-bg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${MobileBanner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        ></div>

        <div id="header-placeholder"></div>

        {/* Agent banner image */}
        <div
          className="agent-img-section"
          style={{ minHeight: "100vh", width: "100%" }}
        >
          {/* Desktop Banner */}
          <div
            className="agent-banner d-none d-md-block"
            style={{
              marginTop: "80px",
              height: "90vh",
              backgroundImage: `url(${RemaxMap.src})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "white",
            }}
          ></div>
          
          {/* Mobile Banner */}
          <div
            className="agent-banner d-block d-md-none"
            style={{
              marginTop: "80px",
              height: "90vh",
              backgroundImage: `url(${MobileBanner.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "white",
            }}
          ></div>
        </div>
        {/* Banner image end */}

        {/* #1 sections */}
        <div className="one_agent_content container pt-5">
          {/* hero section */}
          <div className="row">
            {/* Content Below Image */}
            <div className="row mt-4">
              {/* Left Column: Content */}
              <div className="col-md-6">
                <div className="content-text">
                  <h3 className="fw-bold text-white text-start">
                    We Bring Your Dreams to Reality
                    <br />
                    Because Nobody Sells More Than RE/MAX.
                  </h3>
                  <p style={{ color: "white" }} className="text-start">
                    At Remax Real Estate, we bring your dreams to reality by
                    transforming your property aspirations into tangible
                    results. With a personalized approach and unmatched
                    experties, we guide you through every step of the journey,
                    ensuring that your vision of the perfect home or investment
                    becomes a reality in Dubai's vibrant real estate market.
                  </p>
                  <p style={{ color: "#fff" }} className="text-start">
                    What started as a simple idea on paper in{" "}
                    <span style={{ fontSize: "40px", fontWeight: "bolder" }}>
                      1973
                    </span>{" "}
                    quickly grew into a global real estate success. Founders
                    Dave and Gail Liniger launched RE/MAX with a bold concept —
                    let agents keep more of what they earn through a unique
                    commission model. This approach attracted top talent and
                    changed the real estate industry forever.
                  </p>
                  <p style={{ color: "#fff" }} className="text-start">
                    Backed by strong values, innovative technology, and a focus
                    on continuous learning, RE/MAX has grown into a worldwide
                    network of trusted professionals.
                  </p>
                  <p style={{ color: "#fff" }} className="text-start">
                    At our core, we aim to make a real difference — for our
                    agents, our partners, and our clients. We believe in
                    investing in people, helping them find the perfect property,
                    whether it's a dream home or a smart investment.
                  </p>
                  <p style={{ color: "#fff" }} className="text-start">
                    Wherever you are on your real estate journey, RE/MAX is here
                    to guide you.
                  </p>
                </div>
              </div>

              {/* Right Column: Slogan */}
              <div className="col-md-6 overflow-hidden rounded num-1 slogan-img">
                <img
                  src={RemaxMap_2.src}
                  alt="#1 Remax"
                  className="w-100 h-100 object-fit-cover zoomed-img rounded-4"
                />
              </div>
            </div>
          </div>
        </div>
        {/* end */}
      </section>
    </>
  );
};

export default Banner;
