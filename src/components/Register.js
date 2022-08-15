import { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import { addDoc } from 'firebase/firestore';

const Register = () => {
  const { users, usersCollectionRef, getUsers } = useContext(AppContext);
  const navigate = useNavigate();

  const [btnText, setBtnText] = useState('Register');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const bcrypt = require('bcryptjs');

  const handleRegister = async e => {
    e.preventDefault();

    if (password === confirmPassword) {
      if (!users.map(u => u.email).includes(email)) {
        setBtnDisabled(true);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword, name, surname, permission: 'user' };
        await addDoc(usersCollectionRef, newUser);
        getUsers();

        setBtnText('✓ User created');
        setTimeout(() => {
          navigate(`/login`);
        }, '1000');
      } else {
        alert('Email address already taken!');
      }
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
            onChange={e =>
              setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
            }
            required
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="surname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your surname"
            onChange={e =>
              setSurname(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
            }
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
            minLength="6"
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
        <ButtonComponent type="submit" disabled={btnDisabled}>
          {btnText}
        </ButtonComponent>
      </Form>
    </>
  );
};

export default Register;
