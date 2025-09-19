import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

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

  useEffect(() => {
    // Load Google Translate script
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        try {
          if (window.google && window.google.translate && window.google.translate.TranslateElement) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,fr,it,es,de,ru,hi,tr,fa,zh-CN",
                autoDisplay: false,
              },
              "google_translate_element"
            );
          }
        } catch (error) {
          console.warn("Google Translate not available:", error);
        }
      };
      const addScript = document.createElement("script");
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);
    }

    // Language selector event listener
    const selector = document.getElementById("language-selector");
    if (selector) {
      selector.addEventListener("change", function () {
        const lang = this.value;
        const selectField = document.querySelector(".goog-te-combo");
        if (lang && selectField) {
          selectField.value = lang;
          selectField.dispatchEvent(new Event("change"));
        }
      });
    }

    const handleRouteChange = () => {
      try {
        if (window.googleTranslateElementInit && window.google && window.google.translate) {
          window.googleTranslateElementInit();
        }
      } catch (error) {
        console.warn("Google Translate initialization failed:", error);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const isActivePath = (path) => router.pathname === path;

  return (
    <>
      <header
        style={{
          zIndex: 1000,
          backgroundColor:
            router.pathname === "/" ? "transparent" : "#003366",
          position: router.pathname === "/" ? "absolute" : "relative",
          left: 0,
          right: 0,
          width: "100%",
          transition: "background-color 0.3s ease",
        }}
      >
        <div className="subheader" style={{ marginTop: "14px" }}>
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
                    {/* <img
                      src="https://remax.ae/assets/img/brandlogo/remaxbrands.png"
                      className="logo_uae"
                      alt="RE/MAX Logo"
                    /> */}
                    <Logo />
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
                      style={{
                        display: isMobileOpen ? "block" : "none"
                      }}
                    >
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item doted_link">
                          <Link
                            id="nav-home"
                            className={`nav-link font-bold ${
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
                            className={`nav-link font-bold ${
                              isActivePath("/findProperty") ? "active" : ""
                            }`}
                            href="/findProperty"
                            onClick={closeMenus}
                          >
                            Find properties
                          </Link>
                        </li>
                        <li className="nav-item doted_link">
                          <Link
                            className={`nav-link font-bold ${
                              isActivePath("/build_career") ? "active" : ""
                            }`}
                            href="/build_career"
                            onClick={closeMenus}
                          >
                            Build Career
                          </Link>
                        </li>
                        <li
                          className="nav-item dropdown doted_link dropdowngeneral"
                          id="about_us"
                        >
                          <button
                            id="nav-about-us-dropdown"
                            className="nav-link text-white dropdown-toggle btn btn-link p-0 d-flex align-items-center"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded={isAboutOpen ? "true" : "false"}
                            onClick={() => setIsAboutOpen((prev) => !prev)}
                          >
                            About Us
                            <span className="ms-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className={`bi bi-chevron-down transition ${
                                  isAboutOpen ? "rotate-180" : ""
                                }`}
                                viewBox="0 0 16 16"
                                style={{ transition: "transform 0.2s" }}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            </span>
                          </button>
                          <div
                            className={`dropdown-menu dropdown-arrow ${
                              isAboutOpen ? "show" : ""
                            }`}
                            aria-labelledby="nav-about-us-dropdown"
                            style={{ left: "-45px", top: "36px" }}
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
                          <div
                            id="google_translate_element"
                            style={{ display: "block" }}
                          ></div>
                          <select id="language-selector">
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
