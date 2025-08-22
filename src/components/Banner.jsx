import React from "react";
import RemaxMap from "../assets/Remax_Real_Estate_Map.jpg";
import RemaxMap_2 from "../assets/slogan_img.jpg";

const Banner = () => {
  return (
    <>
      <section
        className="full-bg-section rm_banner"
        id="height_gal_z"
        style={{
          backgroundImage:
            "url(https://remax.ae/public/uploads/pages/page_top_banner_image8853982.3747261.webp)",
        }}
      >
        {/* <svg
          className="outlined_borders"
          width="1920"
          height="1026"
          viewBox="0 0 1920 1026"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect opacity="0.1" x="100" width="1" height="1026" fill="white" />
          <rect opacity="0.1" x="529.75" width="1" height="1026" fill="white" />
          <rect opacity="0.1" x="959.5" width="1" height="1026" fill="white" />
          <rect
            opacity="0.1"
            x="1389.25"
            width="1"
            height="1026"
            fill="white"
          />
          <rect opacity="0.1" x="1819" width="1" height="1026" fill="white" />
        </svg> */}

        <div id="header-placeholder"></div>

        {/* Agent banner image */}
        <div
          className="agent-img-section"
          style={{ minHeight: "100vh", width: "100%" }}
        >
          <div
            className="agent-banner"
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
