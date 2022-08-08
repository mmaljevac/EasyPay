import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardForm from './CardForm';

const Create = () => {
  const { curUser, cards, setCards } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCreate = e => {
    e.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const cardHolderName = document.getElementById('cardHolderName').value;
    const cardHolderSurname = document.getElementById('cardHolderSurname').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvv = document.getElementById('cvv').value;
    const balance = document.getElementById('balance').value;

    let pin = '';
    for (let i = 0; i < 4; i++) {
      pin += Math.floor(Math.random() * 10);
    }
    const id = Math.floor(Math.random() * 100000);

    const newCard = {
      id,
      cardNumber,
      cardHolderName,
      cardHolderSurname,
      expirationDate,
      cvv,
      balance,
      pin,
    };

    setCards([...cards, newCard]);
    alert('New card added! Your PIN is ' + pin + '.');
    navigate('/');
  };

  return curUser ? (
    <>
      <ButtonComponent onClick={() => navigate('/')} size="sm" className="mb-2" color="transparent">
        &lt; Back
      </ButtonComponent>
      <h1>Add a new card</h1>
      <CardForm handle={handleCreate} submitText="Add" />
    </>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default Create;
