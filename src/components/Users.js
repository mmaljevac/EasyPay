import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';
import { AppContext } from '../contexts/AppContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const { curUser, users, cards, getUsers, getCards } = useContext(AppContext);

  useEffect(() => {
    users.sort((a, b) => a.surname < b.surname);
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await cards.filter(c => c.cardHolderId === id && deleteDoc(doc(db, 'cards', c.id)));
      await deleteDoc(doc(db, 'users', id));
      getUsers();
      getCards();
    }
  };

  return curUser && curUser.permission === 'admin' ? (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Permission</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.permission}</td>
                <td>
                  {user.id !== curUser.id && (
                    <ButtonComponent onClick={() => handleDelete(user.id, user.name)} color={'red'}>
                      Delete
                    </ButtonComponent>
                  )}
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
