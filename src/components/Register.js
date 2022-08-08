import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';

const Register = () => {
  const { users, setUsers } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const permission = 'user';

    const id = Math.floor(Math.random() * 100000);
    const newUser = { id, email, password, name, surname, permission };

    if (password === confirmPassword) {
      setUsers([...users, newUser]);
      alert('User created!');
      navigate('/login');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={handleRegister}>
      <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" required />
        </Form.Group>
        <Form.Group className="my-3" controlId="surname">
          <Form.Label>Surname</Form.Label>
          <Form.Control type="text" placeholder="Enter your surname" required />
        </Form.Group>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your e-mail" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Repeat password" required />
        </Form.Group>
        <ButtonComponent type="submit" className="w-100">
          Register
        </ButtonComponent>
      </Form>
    </>
  );
};

export default Register;
