import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import logo from '../img/logo.png';

const Header = () => {
  const { curUser, setCurUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurUser(null);
    navigate('/login');
  };

  return (
    <Navbar collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="logo" />
            <div style={{ fontWeight: 'bold' }}>Card App</div>
          </Link>
        </Navbar.Brand>
        {curUser && (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="me-auto" />
              <Nav.Link disabled>Hello, {curUser}!</Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-dark">
                Logout
              </Nav.Link>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
