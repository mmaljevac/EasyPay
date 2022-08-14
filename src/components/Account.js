import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import { Navigate, useNavigate } from 'react-router-dom';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Account = () => {
  const { curUser, setCurUser, getUsers, cards, getCards } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(curUser.email);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(curUser.name);
  const [surname, setSurname] = useState(curUser.surname);

  const handleUpdate = async e => {
    e.preventDefault();

    // TODO hash password
    const updatedUser = { email, password, name, surname };

    if (password === confirmPassword) {
      const userDoc = doc(db, 'users', curUser.id);
      await updateDoc(userDoc, updatedUser);
      getUsers();

      alert('User info updated, please log in again!');
      navigate(`/login`);
    } else {
      alert('Passwords do not match!');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account and all your cards?')) {
      await cards.filter(c => c.cardHolderId === curUser.id && deleteDoc(doc(db, 'cards', c.id)));
      await deleteDoc(doc(db, 'users', curUser.id));
      getUsers();
      getCards();

      setCurUser(null);
      sessionStorage.removeItem('curUser');

      alert('Account deleted');
      navigate('/login');
    }
  };

  return curUser ? (
    <>
      <h1>Update account info</h1>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={name}
            placeholder="Update your name"
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
            defaultValue={surname}
            placeholder="Update your surname"
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
            defaultValue={email}
            placeholder="Update your e-mail"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Update password"
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
        <ButtonComponent type="submit">Update</ButtonComponent>
      </Form>
      <hr />
      <ButtonComponent onClick={handleDelete} color="red">
        Delete account
      </ButtonComponent>
    </>
  ) : (
    <Navigate to={{ pathname: '/' }} />
  );
};

export default Account;
