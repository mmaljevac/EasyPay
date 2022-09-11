import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import logo from '../img/logo.png';

const Header = () => {
  const { curUser, setCurUser, getUsers } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurUser(null);
    sessionStorage.removeItem('curUser');
    getUsers();
    navigate('/login');
  };

  return (
    <Navbar collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="logo" />
            <div style={{ fontWeight: 'bold' }}>EasyPay</div>
          </Link>
        </Navbar.Brand>
        {curUser ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="me-auto" />
              <Nav.Link disabled>Hello, {curUser.name}!</Nav.Link>
              {curUser.permission === 'admin' && (
                <>
                  <Nav.Link onClick={() => navigate('/users')} className="text-danger">
                    Users
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate('/cards')} className="text-danger">
                    All cards
                  </Nav.Link>
                </>
              )}
              <Nav.Link onClick={() => navigate('/account')} className="text-dark">
                Account
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-dark">
                Logout
              </Nav.Link>
            </Navbar.Collapse>
          </>
        ) : (
          <Nav.Link onClick={handleLogout} className="text-dark">
            Login
          </Nav.Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
