import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Topbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand>Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Profile</Nav.Link>
            <Nav.Link href="#">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
