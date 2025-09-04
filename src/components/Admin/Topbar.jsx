import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Topbar = ({ logout }) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand>
          <strong>ReMax Admin Panel</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              onClick={handleLogout}
              style={{ cursor: 'pointer', color: '#dc3545' }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
