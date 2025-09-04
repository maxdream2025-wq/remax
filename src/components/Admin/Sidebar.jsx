import React from "react";
import { Nav } from "react-bootstrap";
import useBadgeCounts from "../../hooks/useBadgeCounts";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const { badgeCounts } = useBadgeCounts();
  
  // Fallback badge counts in case of error
  const safeBadgeCounts = badgeCounts || {
    testimonials: 0,
    newsletter: 0,
    contact: 0,
    interest: 0
  };

  const Badge = ({ count }) => {
    if (count === 0) return null;
    return (
      <span style={{
        backgroundColor: '#dc3545',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '10px',
        fontWeight: 'bold',
        marginLeft: '8px',
        minWidth: '18px',
        textAlign: 'center'
      }}>
        {count}
      </span>
    );
  };

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
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <span>Manage Reviews</span>
          <Badge count={safeBadgeCounts.testimonials} />
        </Nav.Link>
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "interest" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("interest")}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <span>Property Interest</span>
          <Badge count={safeBadgeCounts.interest} />
        </Nav.Link>
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "newsletter" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("newsletter")}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <span>Newsletter</span>
          <Badge count={safeBadgeCounts.newsletter} />
        </Nav.Link>
        <Nav.Link
          className={`text-white mb-2 ${activeMenu === "contact" ? "bg-primary rounded" : ""}`}
          onClick={() => setActiveMenu("contact")}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <span>Contact Form</span>
          <Badge count={safeBadgeCounts.contact} />
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
