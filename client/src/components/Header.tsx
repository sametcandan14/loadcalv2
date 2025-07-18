import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className=" safety-yellow-back">
        <Container className="d-flex justify-content-between ">
          <div className="d-flex align-items-center">
            <Navbar.Brand>
              <Nav.Link as={Link} to="/">
                <img className="logo-img" src="loadcal_logo.png" alt="" />
              </Nav.Link>
            </Navbar.Brand>
          </div>
          <div>
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
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
