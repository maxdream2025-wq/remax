import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <Nav className="flex-column">
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "dashboard" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("dashboard")}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "Add-Category" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("Add-Category")}
        >
          Add Category
        </Nav.Link>
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "add-property" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("add-property")}
        >
          Add Property
        </Nav.Link>
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "Add-News" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("Add-News")}
        >
          Add News
        </Nav.Link>
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "testimonial" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("testimonial")}
        >
          Add Testimonial
        </Nav.Link>
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "interest" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("interest")}
        >
          Property Interest
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
