import { useState } from 'react';
import { useContext } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';

const Login = () => {
  const { users, setCurUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();

    const userFound = users.find(u => u.email === email && u.password === password);

    if (userFound) {
      setCurUser(userFound);
      // localStorage.setItem('curUser', userFound.id);
      navigate('/');
    } else {
      alert('Invalid login info!');
    }
  };

  return (
    <Container style={{ width: '300px', textAlign: 'center' }}>
      <h1>Welcome!</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" onChange={e => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} required />
        </Form.Group>
        <ButtonComponent type="submit" className="w-100 mb-2">
          Login
        </ButtonComponent>
      </Form>
      <div>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </Container>
  );
};

export default Login;
