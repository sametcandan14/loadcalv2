import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className=" safety-yellow-back">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              <img className="logo-img" src="loadcal_logo.png" alt="" />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/containers">
                Containers
              </Nav.Link>
              <Nav.Link as={Link} to="/boxes">
                Boxes
              </Nav.Link>
              <Nav.Link as={Link} to="/plans">
                Plans
              </Nav.Link>
              <Nav.Link as={Link} to="/calculate">
                Calculate
              </Nav.Link>

              <NavDropdown title="User Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
