import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Logo from "./Logo";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // success or error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/`, {
        email,
      });
      setStatus("success");
      setEmail("");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.email &&
        error.response.data.email[0] ===
          "newsletter with this email already exists."
      ) {
        setStatus("exists");
      } else {
        setStatus("error");
      }
    }
  };

  return (
    <>
      <footer className="footer-padd paddingeneral">
        {/* <div className="logo_footer">
          <img
            src="https://remax.ae/assets/img/brandlogo/remax_logo.svg"
            alt="Remax Logo"
          />
        </div> */}
        <div className="container-fluid pt-5">
          <div className="footer-content">
            <div className="footer-box">
              <div className="property_content_footer">
                {/* <img
                  src="https://remax.ae/assets/img/brandlogo/footer-logo.png"
                  className="footer_logo_uae"
                  alt="Footer Logo UAE"
                /> */}
                <Logo />
              </div>
            </div>

            <div className="footer-box" id="about_remax_footer">
              <div className="property_content_footer">
                <div className="footer_heads">About RE/MAX</div>
                <ul className="p-0">
                  <li>
                    <Link href="/remax_global" className="text-decoration-none">
                      RE/MAX Global
                    </Link>
                  </li>
                  <li>
                    <Link href="/remax_uae" className="text-decoration-none">
                      RE/MAX UAE
                    </Link>
                  </li>
                  <li>
                    <Link href="/remax_dream" className="text-decoration-none">
                      RE/MAX Dream
                    </Link>
                  </li>
                  <li>
                    <Link href="/contactus" className="text-decoration-none">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://remax.ae/privacypolicy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-box">
              <div className="property_content_footer">
                <div className="footer_heads">Build Career</div>
                <ul className="p-0">
                  <li className="hover_color">
                    <Link href="/build_career" className="text-decoration-none">
                      Build Career with remax
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-box subscribefooter">
              <div className="footer_heads">Subscribe to Newsletter</div>
              <form onSubmit={handleSubscribe}>
                <div className="form-row w-100 m-0">
                  <div className="form-group w-100">
                    <input
                      type="email"
                      placeholder="Enter your email here...."
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      className="btn-secondary-radius w-100"
                      type="submit"
                    >
                      SUBSCRIBE NOW
                    </button>
                  </div>
                </div>
                {status === "success" && (
                  <div className="text-success mt-2">
                    Subscribed successfully!
                  </div>
                )}
                {status === "error" && (
                  <div className="text-danger mt-2">
                    Subscription failed. Try again.
                  </div>
                )}
                {status === "exists" && (
                  <div className="text-warning mt-2">
                    This email is already subscribed.
                  </div>
                )}
              </form>
            </div>

            <div className="footer-box socials_cols">
              <div className="property_content_footer contact_actions">
                <div className="footer_heads" id="contact-Us">
                  Contact Us
                </div>
                <ul className="p-0">
                  <li>
                    <span>
                      <img
                        src="https://remax.ae/assets/img/icons/call.svg"
                        alt="Call Icon"
                      />
                    </span>
                    <a href="tel:+971585850067">+971 58 585 0067</a>
                  </li>
                  <li>
                    <span>
                      <img
                        src="https://remax.ae/assets/img/icons/sms_light.svg"
                        alt="Email Icon"
                      />
                    </span>
                    <a href="mailto:ahmad.nasr@remax.ae">ahmad.nasr@remax.ae</a>
                  </li>
                </ul>
              </div>

              <div className="social_flex property_content_footer">
                <div className="footer_heads" id="socials-head">
                  Socials
                </div>
                <ul className="social-icons ">
                  <li className="mb-0">
                    <a
                      href="https://www.facebook.com/RemaxDreamUAE"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.51 5.50411H17.39V2.32411C16.4798 2.22946 15.5652 2.18273 14.65 2.18411C11.93 2.18411 10.07 3.84411 10.07 6.88411V9.50411H7V13.0641H10.07V22.1841H13.75V13.0641H16.81L17.27 9.50411H13.75V7.23411C13.75 6.18411 14.03 5.50411 15.51 5.50411Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="mb-0">
                    <a
                      href="https://www.instagram.com/remax_dream_uae/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 3.42676H8C5.23858 3.42676 3 5.66534 3 8.42676V16.4268C3 19.1882 5.23858 21.4268 8 21.4268H16C18.7614 21.4268 21 19.1882 21 16.4268V8.42676C21 5.66534 18.7614 3.42676 16 3.42676ZM19.25 16.4268C19.2445 18.2194 17.7926 19.6713 16 19.6768H8C6.20735 19.6713 4.75549 18.2194 4.75 16.4268V8.42676C4.75549 6.63411 6.20735 5.18225 8 5.17676H16C17.7926 5.18225 19.2445 6.63411 19.25 8.42676V16.4268ZM16.75 8.67676C17.3023 8.67676 17.75 8.22904 17.75 7.67676C17.75 7.12448 17.3023 6.67676 16.75 6.67676C16.1977 6.67676 15.75 7.12448 15.75 7.67676C15.75 8.22904 16.1977 8.67676 16.75 8.67676ZM12 7.92676C9.51472 7.92676 7.5 9.94148 7.5 12.4268C7.5 14.9121 9.51472 16.9268 12 16.9268C14.4853 16.9268 16.5 14.9121 16.5 12.4268C16.5027 11.2325 16.0294 10.0863 15.1849 9.24184C14.3404 8.39735 13.1943 7.9241 12 7.92676ZM9.25 12.4268C9.25 13.9456 10.4812 15.1768 12 15.1768C13.5188 15.1768 14.75 13.9456 14.75 12.4268C14.75 10.908 13.5188 9.67676 12 9.67676C10.4812 9.67676 9.25 10.908 9.25 12.4268Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="mb-0">
                    <a
                      href="https://www.linkedin.com/company/remaxdreamuae"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.5994 21.7847V14.7527C21.5994 11.2967 20.8554 8.65674 16.8234 8.65674C14.8794 8.65674 13.5834 9.71274 13.0554 10.7207H13.0074V8.96874H9.19141V21.7847H13.1754V15.4247C13.1754 13.7447 13.4874 12.1367 15.5514 12.1367C17.5914 12.1367 17.6154 14.0327 17.6154 15.5207V21.7607H21.5994V21.7847Z"
                          fill="white"
                        />
                        <path
                          d="M2.71094 8.96924H6.69494V21.7852H2.71094V8.96924Z"
                          fill="white"
                        />
                        <path
                          d="M4.70244 2.58643C3.43044 2.58643 2.39844 3.61843 2.39844 4.89043C2.39844 6.16243 3.43044 7.21843 4.70244 7.21843C5.97444 7.21843 7.00644 6.16243 7.00644 4.89043C7.00644 3.61843 5.97444 2.58643 4.70244 2.58643Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="mb-0">
                    <a
                      href="https://www.tiktok.com/@remax_dream_uae"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* TikTok Icon */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.04c0-.57.46-1.04 1.04-1.04h2.43c.57 0 1.04.46 1.04 1.04 0 2.43 1.97 4.4 4.4 4.4.57 0 1.04.46 1.04 1.04v2.43c0 .57-.46 1.04-1.04 1.04-1.58 0-3.05-.45-4.3-1.24v6.93c0 3.6-2.92 6.52-6.52 6.52s-6.52-2.92-6.52-6.52c0-3.6 2.92-6.52 6.52-6.52.57 0 1.04.46 1.04 1.04v2.43c0 .57-.46 1.04-1.04 1.04-1.11 0-2.01.9-2.01 2.01s.9 2.01 2.01 2.01 2.01-.9 2.01-2.01V2.04z" />
                      </svg>
                    </a>
                  </li>

                  <li className="mb-0">
                    <a
                      href="https://www.snapchat.com/add/remaxdreamuae"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* Snapchat Icon */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2c2.21 0 4 1.79 4 4v.53c0 .53.22 1.04.61 1.39.39.36.92.55 1.46.51.54-.04 1.06.19 1.39.6.34.42.47.97.36 1.5-.11.54-.43 1.02-.9 1.3l-.89.53c.06.36.06.72.01 1.09.74.25 1.44.56 2.1.94.47.27.77.79.77 1.35 0 .72-.58 1.3-1.3 1.3-.18 0-.36-.04-.52-.12-.73-.36-1.49-.66-2.28-.89-.17 1.8-1.6 3.22-3.42 3.22h-2.02c-1.82 0-3.25-1.42-3.42-3.22-.79.23-1.55.53-2.28.89-.16.08-.34.12-.52.12-.72 0-1.3-.58-1.3-1.3 0-.56.3-1.08.77-1.35.66-.38 1.36-.69 2.1-.94-.05-.37-.05-.73.01-1.09l-.89-.53c-.47-.28-.79-.76-.9-1.3-.11-.53.02-1.08.36-1.5.33-.41.85-.64 1.39-.6.54.04 1.07-.15 1.46-.51.39-.35.61-.86.61-1.39V6c0-2.21 1.79-4 4-4z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border_footer"></div>
          <div className="row all_rights">
            <div id="allRights-Reserved" className="col-12 col-sm-6">
              <p className="office-text fw-700">©2025. All rights reserved.</p>
              <p className="office-text">
                Each office independently owned and operated.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
