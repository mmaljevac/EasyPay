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

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [name, setName] = useState(curUser.name);
  const [surname, setSurname] = useState(curUser.surname);
  const bcrypt = require('bcryptjs');

  const handleUpdateInfo = async e => {
    e.preventDefault();

    const updatedUser = { name: name, surname: surname };
    const userDoc = doc(db, 'users', curUser.id);
    await updateDoc(userDoc, updatedUser);
    getUsers();

    alert('User info updated, please log in again!');
    setCurUser(null);
    sessionStorage.removeItem('curUser');
    navigate(`/login`);
  };

  const handleChangePassword = async e => {
    e.preventDefault();

    const validOldPassword = await bcrypt.compare(oldPassword, curUser.password);

    if (validOldPassword) {
      if (oldPassword !== newPassword) {
        if (newPassword === confirmNewPassword) {
          const hashedNewPassword = await bcrypt.hash(newPassword, 10);
          const updatedUser = { password: hashedNewPassword };

          const userDoc = doc(db, 'users', curUser.id);
          await updateDoc(userDoc, updatedUser);
          getUsers();

          alert('Password updated, please log in again!');
          setCurUser(null);
          sessionStorage.removeItem('curUser');
          navigate(`/login`);
        } else {
          alert('New and confirmed passwords do not match!');
        }
      } else {
        alert("New password can't be the same as the old one!");
      }
    } else {
      alert('Wrong current password entered!');
    }
  };
// brisanje kartica
// brisanje korisničkog računa
  const handleDeleteAcc = async () => {
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
      <h1>Update info</h1>
      <Form onSubmit={handleUpdateInfo}>
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
        <ButtonComponent type="submit">Update</ButtonComponent>
      </Form>
      <hr />
      <h1>Change password</h1>
      <Form onSubmit={handleChangePassword}>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Old password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter old password"
            minLength="6"
            onChange={e => setOldPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            minLength="6"
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm new password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat new password"
            onChange={e => setConfirmNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <ButtonComponent type="submit">Change</ButtonComponent>
      </Form>
      <hr />
      <h1>Delete account</h1>
      <ButtonComponent onClick={handleDeleteAcc} color="red">
        Deactivate
      </ButtonComponent>
    </>
  ) : (
    <Navigate to={{ pathname: '/' }} />
  );
};

export default Account;
