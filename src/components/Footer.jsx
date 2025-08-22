import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="footer-padd paddingeneral">
        <div className="logo_footer">
          <img
            src="https://remax.ae/assets/img/brandlogo/remax_logo.svg"
            alt="Remax Logo"
          />
        </div>
        <div className="container-fluid">
          <div className="footer-content">
            <div className="footer-box">
              <div className="property_content_footer">
                <img
                  src="https://remax.ae/assets/img/brandlogo/footer-logo.png"
                  className="footer_logo_uae"
                  alt="Footer Logo UAE"
                />
              </div>
            </div>

            <div className="footer-box" id="about_remax_footer">
              <div className="property_content_footer">
                <div className="footer_heads">About RE/MAX</div>
                <ul className="p-0">
                  <li>
                    <Link href="/remax_global" className="text-decoration-none">RE/MAX Global</Link>
                  </li>
                  <li>
                    <Link href="/remax_uae" className="text-decoration-none">RE/MAX UAE</Link>
                  </li>
                  <li>
                    <Link href="/remax_dream" className="text-decoration-none">RE/MAX Dream</Link>
                  </li>
                  <li>
                    <Link href="/contactus" className="text-decoration-none">Contact Us</Link>
                  </li>
                  <li>
                    <a href="https://remax.ae/privacypolicy" target="_blank" rel="noopener noreferrer" className="text-decoration-none">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-box">
              <div className="property_content_footer">
                <div className="footer_heads">Build Career</div>
                <ul className="p-0">
                  <li className="hover_color">
                    <Link href="/build_career" className="text-decoration-none">Build Career with remax</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-box subscribefooter">
              <div className="footer_heads">Subscribe to Newsletter</div>
              <form action="#" method="post">
                <div className="form-row w-100 m-0">
                  <div className="form-group w-100">
                    <input
                      type="text"
                      placeholder="Enter your email here...."
                      name="email"
                    />
                    <button className="btn-secondary-radius w-100">
                      SUBSCRIBE NOW
                    </button>
                  </div>
                </div>
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
                    <a href="mailto:ahmad.nasr@remax.ae">
                      ahmad.nasr@remax.ae
                    </a>
                  </li>
                </ul>
              </div>

              <div className="social_flex property_content_footer">
                <div className="footer_heads" id="socials-head">
                  Socials
                </div>
                <ul class="social-icons ">
                        <li class="mb-0">
                            <a href="https://www.facebook.com/p/RE-MAX-UAE-100063581856702/" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.51 5.50411H17.39V2.32411C16.4798 2.22946 15.5652 2.18273 14.65 2.18411C11.93 2.18411 10.07 3.84411 10.07 6.88411V9.50411H7V13.0641H10.07V22.1841H13.75V13.0641H16.81L17.27 9.50411H13.75V7.23411C13.75 6.18411 14.03 5.50411 15.51 5.50411Z"
                                        fill="white" />
                                </svg>
                            </a>
                        </li>
                        <li class="mb-0">
                            <a href="https://www.instagram.com/remaxuae/" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M16 3.42676H8C5.23858 3.42676 3 5.66534 3 8.42676V16.4268C3 19.1882 5.23858 21.4268 8 21.4268H16C18.7614 21.4268 21 19.1882 21 16.4268V8.42676C21 5.66534 18.7614 3.42676 16 3.42676ZM19.25 16.4268C19.2445 18.2194 17.7926 19.6713 16 19.6768H8C6.20735 19.6713 4.75549 18.2194 4.75 16.4268V8.42676C4.75549 6.63411 6.20735 5.18225 8 5.17676H16C17.7926 5.18225 19.2445 6.63411 19.25 8.42676V16.4268ZM16.75 8.67676C17.3023 8.67676 17.75 8.22904 17.75 7.67676C17.75 7.12448 17.3023 6.67676 16.75 6.67676C16.1977 6.67676 15.75 7.12448 15.75 7.67676C15.75 8.22904 16.1977 8.67676 16.75 8.67676ZM12 7.92676C9.51472 7.92676 7.5 9.94148 7.5 12.4268C7.5 14.9121 9.51472 16.9268 12 16.9268C14.4853 16.9268 16.5 14.9121 16.5 12.4268C16.5027 11.2325 16.0294 10.0863 15.1849 9.24184C14.3404 8.39735 13.1943 7.9241 12 7.92676ZM9.25 12.4268C9.25 13.9456 10.4812 15.1768 12 15.1768C13.5188 15.1768 14.75 13.9456 14.75 12.4268C14.75 10.908 13.5188 9.67676 12 9.67676C10.4812 9.67676 9.25 10.908 9.25 12.4268Z"
                                        fill="white" />
                                </svg>
                            </a>
                        </li>
                        <li class="mb-0">
                            <a href="https://www.linkedin.com/company/re-max-uae/?originalSubdomain=ae"
                                target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.5994 21.7847V14.7527C21.5994 11.2967 20.8554 8.65674 16.8234 8.65674C14.8794 8.65674 13.5834 9.71274 13.0554 10.7207H13.0074V8.96874H9.19141V21.7847H13.1754V15.4247C13.1754 13.7447 13.4874 12.1367 15.5514 12.1367C17.5914 12.1367 17.6154 14.0327 17.6154 15.5207V21.7607H21.5994V21.7847Z"
                                        fill="white" />
                                    <path d="M2.71094 8.96924H6.69494V21.7852H2.71094V8.96924Z" fill="white" />
                                    <path
                                        d="M4.70244 2.58643C3.43044 2.58643 2.39844 3.61843 2.39844 4.89043C2.39844 6.16243 3.43044 7.21843 4.70244 7.21843C5.97444 7.21843 7.00644 6.16243 7.00644 4.89043C7.00644 3.61843 5.97444 2.58643 4.70244 2.58643Z"
                                        fill="white" />
                                </svg>
                            </a>
                        </li>
                        <li class="mb-0">
                            <a href="https://www.youtube.com/c/REMAXUAE/" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.5914 7.38709C21.4775 6.96449 21.2549 6.57909 20.9457 6.26926C20.6366 5.95942 20.2517 5.73595 19.8294 5.62109C18.2634 5.19109 11.9984 5.18409 11.9984 5.18409C11.9984 5.18409 5.73438 5.17709 4.16738 5.58809C3.7453 5.70824 3.3612 5.93487 3.05194 6.24622C2.74269 6.55758 2.51866 6.94321 2.40138 7.36609C1.98838 8.93209 1.98438 12.1801 1.98438 12.1801C1.98438 12.1801 1.98038 15.4441 2.39038 16.9941C2.62038 17.8511 3.29538 18.5281 4.15338 18.7591C5.73538 19.1891 11.9834 19.1961 11.9834 19.1961C11.9834 19.1961 18.2484 19.2031 19.8144 18.7931C20.2369 18.6784 20.6221 18.4555 20.932 18.1463C21.2419 17.8371 21.4658 17.4523 21.5814 17.0301C21.9954 15.4651 21.9984 12.2181 21.9984 12.2181C21.9984 12.2181 22.0184 8.95309 21.5914 7.38709ZM9.99438 15.1891L9.99938 9.18909L15.2064 12.1941L9.99438 15.1891Z"
                                        fill="white" />
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
              <p className="office-text fw-700">
                ©2025. All rights reserved.
              </p>
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
