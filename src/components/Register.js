import { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import { addDoc } from 'firebase/firestore';

const Register = () => {
  const { setUsers, usersCollectionRef } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const permission = 'user';

  const handleRegister = async e => {
    e.preventDefault();

    const newUser = { email, password, name, surname, permission };

    if (password === confirmPassword) {
      await addDoc(usersCollectionRef, newUser);
      setUsers('updated');
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
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={e => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="surname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your surname"
            onChange={e => setSurname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your e-mail"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <ButtonComponent type="submit" className="w-100">
          Register
        </ButtonComponent>
      </Form>
    </>
  );
};

export default Register;
