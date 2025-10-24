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
  const [isClient, setIsClient] = useState(false);

  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsAboutOpen(false);
  };

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Only run on client side
    if (typeof window === 'undefined') return;

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
            className={`navbar navbar-expand-lg ${isBuildCareer ? "navbar-dark" : "navbar-light"
              }`}
          >
            <div className="container-fluid">
              <div className="row custom_styles justify-content-between align-items-center w-100">
                {/* Logo */}
                <div className="col-auto">
                  <Link href="/" className="navbar-brand" onClick={closeMenus} style={{ display: 'inline-block' }}>
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
                    {/* Toggler Button - Mobile Only */}
                    <button
                      className="navbar-toggler d-block d-lg-none"
                      type="button"
                      aria-controls="navbarNav"
                      aria-expanded={isMobileOpen ? "true" : "false"}
                      aria-label="Toggle navigation"
                      onClick={() => setIsMobileOpen((prev) => !prev)}
                      style={{
                        backgroundColor: "#dc3545",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "2px",
                          backgroundColor: "white",
                          borderRadius: "1px",
                          transition: "all 0.3s ease",
                          marginBottom: "4px"
                        }}
                      ></div>
                      <div
                        style={{
                          width: "20px",
                          height: "2px",
                          backgroundColor: "white",
                          borderRadius: "1px",
                          transition: "all 0.3s ease",
                          marginBottom: "4px"
                        }}
                      ></div>
                      <div
                        style={{
                          width: "20px",
                          height: "2px",
                          backgroundColor: "white",
                          borderRadius: "1px",
                          transition: "all 0.3s ease"
                        }}
                      ></div>
                    </button>

                    {/* Mobile Menu Overlay */}
                    {isClient && isMobileOpen && (
                      <div
                        className="mobile-menu-overlay"
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100vh",
                          backgroundColor: "#003366",
                          zIndex: 9999,
                          padding: "20px",
                          overflowY: "auto"
                        }}
                      >
                        {/* Logo and Close Button */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <Link
                            href="/"
                            onClick={closeMenus}
                            style={{
                              textDecoration: "none",
                              display: "inline-block"
                            }}
                          >
                            <div style={{ width: "120px" }}>
                              <Logo />
                            </div>
                          </Link>
                          <button
                            onClick={closeMenus}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#dc3545",
                              border: "none",
                              color: "white",
                              fontSize: "20px",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            ×
                          </button>
                        </div>

                        {/* Menu Items */}
                        <div className="mobile-menu-items">
                          <div className="menu-item">
                            <Link
                              href="/"
                              onClick={closeMenus}
                              style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "18px",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "15px 0",
                                borderBottom: "1px solid rgba(255,255,255,0.1)"
                              }}
                            >
                              Home
                            </Link>
                          </div>

                          <div className="menu-item">
                            <Link
                              href="/findProperty"
                              onClick={closeMenus}
                              style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "18px",
                                fontWeight: "500",
                                display: "block",
                                padding: "15px 0",
                                borderBottom: "1px solid rgba(255,255,255,0.1)"
                              }}
                            >
                              Find properties
                            </Link>
                          </div>

                          <div className="menu-item">
                            <Link
                              href="/build_career"
                              onClick={closeMenus}
                              style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "18px",
                                fontWeight: "500",
                                display: "block",
                                padding: "15px 0",
                                borderBottom: "1px solid rgba(255,255,255,0.1)"
                              }}
                            >
                              Build Career
                            </Link>
                          </div>


                          <div className="menu-item">
                            <button
                              onClick={() => setIsAboutOpen((prev) => !prev)}
                              style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "18px",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "15px 0",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                backgroundColor: "transparent",
                                border: "none",
                                width: "100%",
                                textAlign: "left"
                              }}
                            >
                              About Us
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                style={{
                                  transform: isAboutOpen ? "rotate(90deg)" : "rotate(0deg)",
                                  transition: "transform 0.2s ease"
                                }}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            </button>
                            {isAboutOpen && (
                              <div style={{
                                paddingLeft: "20px",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                margin: "0 -20px",
                                padding: "10px 20px"
                              }}>
                                <Link
                                  href="/remax_global"
                                  onClick={closeMenus}
                                  style={{
                                    color: "rgba(255,255,255,0.9)",
                                    textDecoration: "none",
                                    fontSize: "16px",
                                    display: "block",
                                    padding: "12px 0",
                                    borderBottom: "1px solid rgba(255,255,255,0.1)"
                                  }}
                                >
                                  RE/MAX Global
                                </Link>
                                <Link
                                  href="/remax_uae"
                                  onClick={closeMenus}
                                  style={{
                                    color: "rgba(255,255,255,0.9)",
                                    textDecoration: "none",
                                    fontSize: "16px",
                                    display: "block",
                                    padding: "12px 0",
                                    borderBottom: "1px solid rgba(255,255,255,0.1)"
                                  }}
                                >
                                  RE/MAX UAE
                                </Link>
                                <Link
                                  href="/remax_dream"
                                  onClick={closeMenus}
                                  style={{
                                    color: "rgba(255,255,255,0.9)",
                                    textDecoration: "none",
                                    fontSize: "16px",
                                    display: "block",
                                    padding: "12px 0"
                                  }}
                                >
                                  RE/MAX Dream
                                </Link>

                              </div>
                            )}
                          </div>

                          {/* Border under About Us */}
                          <div style={{
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                            margin: "10px 0"
                          }}></div>

                          <div className="menu-item">
                            <Link
                              href="/contactus"
                              onClick={closeMenus}
                              style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "18px",
                                fontWeight: "500",
                                display: "block",
                                padding: "15px 0",
                                borderBottom: "1px solid rgba(255,255,255,0.1)"
                              }}
                            >
                              Contact Us
                            </Link>
                          </div>

                          {/* Language Selector */}
                          <div className="menu-item" style={{ marginTop: "20px" }}>
                            <div style={{
                              color: "white",
                              fontSize: "16px",
                              fontWeight: "500",
                              marginBottom: "10px"
                            }}>
                              Select Language
                            </div>
                            <div
                              id="google_translate_element_mobile"
                              style={{ display: "block", marginBottom: "10px" }}
                            ></div>
                            <select
                              id="language-selector-mobile"
                              onChange={(e) => {
                                const lang = e.target.value;
                                const selectField = document.querySelector(".goog-te-combo");
                                if (lang && selectField) {
                                  selectField.value = lang;
                                  selectField.dispatchEvent(new Event("change"));
                                }
                                closeMenus(); // Close mobile menu after language selection
                              }}
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid rgba(255,255,255,0.3)",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                color: "white",
                                fontSize: "14px"
                              }}
                            >
                              <option value="" style={{ color: "#333" }}>Select Language</option>
                              <option value="en" style={{ color: "#333" }}>English</option>
                              <option value="fr" style={{ color: "#333" }}>Français</option>
                              <option value="it" style={{ color: "#333" }}>Italiano</option>
                              <option value="es" style={{ color: "#333" }}>Español</option>
                              <option value="de" style={{ color: "#333" }}>Deutsch</option>
                              <option value="ru" style={{ color: "#333" }}>Русский</option>
                              <option value="hi" style={{ color: "#333" }}>हिन्दी</option>
                              <option value="tr" style={{ color: "#333" }}>Türkçe</option>
                              <option value="fa" style={{ color: "#333" }}>فارسی</option>
                              <option value="zh-CN" style={{ color: "#333" }}>中文</option>
                            </select>
                          </div>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Link href="/">
                              <img width={250} src="/assets/fav.png" alt="Call Icon" />
                            </Link>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* Desktop Navbar Links */}
                    <div
                      className={`collapse navbar-collapse d-none d-lg-block ${isMobileOpen ? "show" : ""
                        }`}
                      id="navbarNav"
                    >
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item doted_link">
                          <Link
                            id="nav-home"
                            className={`nav-link font-bold ${isActivePath("/") ? "active" : ""
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
                            className={`nav-link font-bold ${isActivePath("/findProperty") ? "active" : ""
                              }`}
                            href="/findProperty"
                            onClick={closeMenus}
                          >
                            Find properties
                          </Link>
                        </li>
                        <li className="nav-item doted_link">
                          <Link
                            className={`nav-link font-bold ${isActivePath("/build_career") ? "active" : ""
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
                                className={`bi bi-chevron-down transition ${isAboutOpen ? "rotate-180" : ""
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
                            className={`dropdown-menu dropdown-arrow ${isAboutOpen ? "show" : ""
                              }`}
                            aria-labelledby="nav-about-us-dropdown"
                            style={{ left: "-45px", top: "36px" }}
                          >
                            <Link
                              className={`dropdown-item ${isActivePath("/remax_global") ? "active" : ""
                                }`}
                              href="/remax_global"
                              onClick={closeMenus}
                            >
                              RE/MAX Global
                            </Link>
                            <Link
                              className={`dropdown-item ${isActivePath("/remax_uae") ? "active" : ""
                                }`}
                              href="/remax_uae"
                              onClick={closeMenus}
                            >
                              RE/MAX UAE
                            </Link>
                            <Link
                              className={`dropdown-item ${isActivePath("/remax_dream") ? "active" : ""
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
                            className={`nav-link ${isActivePath("/contactus") ? "active" : ""
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
