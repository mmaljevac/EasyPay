import { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';
import { AppContext } from '../contexts/AppContext';
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Users = () => {
  const { curUser, users, cards, getUsers, getCards } = useContext(AppContext);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleDelete = async user => {
    if (window.confirm(`Are you sure you want to delete ${user.name} ${user.surname} and their cards?`)) {
      await cards.filter(c => c.cardHolderId === user.id && deleteDoc(doc(db, 'cards', c.id)));
      await deleteDoc(doc(db, 'users', user.id));
      getUsers();
      getCards();
    }
  };

  const handleAdmin = async user => {
    setBtnDisabled(true);
    let newPermission = 'user';
    if (user.permission === 'user') {
      newPermission = 'admin';
    }
    const updatedUser = { ...user, permission: newPermission };

    const userDoc = doc(db, 'users', user.id);
    await updateDoc(userDoc, updatedUser);
    getUsers();
    setBtnDisabled(false);
  };

  return curUser && curUser.permission === 'admin' ? (
    <>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name} {user.surname}<br />({user.email})</td>
                <td>
                  <ButtonComponent
                    onClick={() => handleAdmin(user)}
                    disabled={(user.id === curUser.id || btnDisabled) && true}
                    color={'transparent'}
                    size={'sm'}
                  >
                    {user.permission === 'admin' ? 'Admin' : 'User'}
                  </ButtonComponent>
                </td>
                <td>
                  <ButtonComponent
                    onClick={() => handleDelete(user)}
                    disabled={user.id === curUser.id && true}
                    color={'red'}
                    size={'sm'}
                  >
                    Delete
                  </ButtonComponent>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  ) : (
    <>
      <h1>Access denied!</h1>
      <Link to="/">Back to homepage</Link>
    </>
  );
};

export default Users;
