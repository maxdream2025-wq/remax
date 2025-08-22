import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const isDreamPage = router.pathname === "/remax_dream";
  const isBuildCareer = router.pathname === "/build_career";
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsAboutOpen(false);
  };

  // Initialize Google Translate widget on the header
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Define the init function expected by the Google script
    window.googleTranslateElementInit = function googleTranslateElementInit() {
      if (window.google && window.google.translate) {
        /* eslint-disable no-new */
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ar,fr,it,es,de,ru,hi,tr,fa,zh-CN",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Inject the Google Translate script once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      // If already loaded, initialize immediately
      window.googleTranslateElementInit && window.googleTranslateElementInit();
    }
  }, []);

  const isActivePath = (path) => router.pathname === path;

  return (
    <>
      <header
        style={{
          zIndex: 1000,
          backgroundColor:
            router.pathname === "/" // Home page
              ? "transparent"
              : "#003366", // Other pages
          position: router.pathname === "/" ? "absolute" : "relative",
          left: 0,
          right: 0,
          width: "100%",
          transition: "background-color 0.3s ease",
        }}
      >
        <div className="subheader" style={{ marginTop: "5px" }}>
          <nav
            className={`navbar navbar-expand-lg ${
              isBuildCareer ? "navbar-dark" : "navbar-light"
            }`}
          >
            <div className="container-fluid">
              <div className="row custom_styles justify-content-between align-items-center w-100">
                {/* Logo */}
                <div className="col-auto">
                  <Link href="/" className="navbar-brand" onClick={closeMenus}>
                    <img
                      src="https://remax.ae/assets/img/brandlogo/remaxbrands.png"
                      className="logo_uae"
                      alt="RE/MAX Logo"
                    />
                  </Link>
                </div>

                {/* Navigation */}
                <div className="col">
                  <div className="responsivebar d-flex justify-content-end">
                    {/* Toggler Button */}
                    <button
                      className="navbar-toggler"
                      type="button"
                      aria-controls="navbarNav"
                      aria-expanded={isMobileOpen ? "true" : "false"}
                      aria-label="Toggle navigation"
                      onClick={() => setIsMobileOpen((prev) => !prev)}
                    >
                      <div
                        id="line-1"
                        className="mobile_nav_toggleBtn_line"
                      ></div>
                      <div
                        id="line-2"
                        className="mobile_nav_toggleBtn_line"
                      ></div>
                      <div
                        id="line-3"
                        className="mobile_nav_toggleBtn_line"
                      ></div>
                    </button>

                    {/* Navbar Links */}
                    <div
                      className={`collapse navbar-collapse ${
                        isMobileOpen ? "show" : ""
                      }`}
                      id="navbarNav"
                    >
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item doted_link">
                          <Link
                            id="nav-home"
                            className={`nav-link ${
                              isActivePath("/") ? "active" : ""
                            }`}
                            href="/"
                            onClick={closeMenus}
                          >
                            Home
                          </Link>
                        </li>
                        <li
                          className="nav-item doted_link"
                          id="find_properties"
                        >
                          <Link
                            id="nav-find-properties"
                            className={`nav-link ${
                              isActivePath("/findProperty") ? "active" : ""
                            }`}
                            href="/findProperty"
                            onClick={closeMenus}
                          >
                            Find properties
                          </Link>
                        </li>
                        <li
                          className="nav-item dropdown doted_link dropdowngeneral"
                          id="about_us"
                        >
                          <button
                            id="nav-about-us-dropdown"
                            className="nav-link dropdown-toggle btn btn-link p-0"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded={isAboutOpen ? "true" : "false"}
                            onClick={() => setIsAboutOpen((prev) => !prev)}
                          >
                            About Us
                          </button>
                          <div
                            className={`dropdown-menu dropdown-arrow ${
                              isAboutOpen ? "show" : ""
                            }`}
                          >
                            <Link
                              className={`dropdown-item ${
                                isActivePath("/remax_global") ? "active" : ""
                              }`}
                              href="/remax_global"
                              onClick={closeMenus}
                            >
                              RE/MAX Global
                            </Link>
                            <Link
                              className={`dropdown-item ${
                                isActivePath("/remax_uae") ? "active" : ""
                              }`}
                              href="/remax_uae"
                              onClick={closeMenus}
                            >
                              RE/MAX UAE
                            </Link>
                            <Link
                              className={`dropdown-item ${
                                isActivePath("/remax_dream") ? "active" : ""
                              }`}
                              href="/remax_dream"
                              onClick={closeMenus}
                            >
                              RE/MAX Dream
                            </Link>
                            <Link
                              className={`dropdown-item ${
                                isActivePath("/build_career") ? "active" : ""
                              }`}
                              href="/build_career"
                              onClick={closeMenus}
                            >
                              Build Career
                            </Link>
                          </div>
                        </li>
                        <li className="nav-item doted_link">
                          <Link
                            id="nav-contact-us"
                            className={`nav-link ${
                              isActivePath("/contactus") ? "active" : ""
                            }`}
                            href="/contactus"
                            onClick={closeMenus}
                          >
                            Contact Us
                          </Link>
                        </li>
                        <li className="nav-item d-block d-flex align-items-center gap-2">
                          <div id="google_translate_element"></div>
                          <select
                            id="customLangSwitcher"
                            className="custom-lang notranslate"
                            onChange={closeMenus}
                          >
                            <option value="">Select Language</option>
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="it">Italiano</option>
                            <option value="es">Español</option>
                            <option value="de">Deutsch</option>
                            <option value="ru">Русский</option>
                            <option value="hi">हिन्दी</option>
                            <option value="tr">Türkçe</option>
                            <option value="fa">فارسی</option>
                            <option value="zh-CN">中文</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
