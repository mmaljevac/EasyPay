import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardForm from './CardForm';
import { addDoc } from 'firebase/firestore';

const Create = () => {
  const { curUser, cardsCollectionRef, getCards } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCreate = async e => {
    e.preventDefault();

    const cardHolderId = curUser.id;
    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvv = document.getElementById('cvv').value;
    const balance = Number(document.getElementById('balance').value);

    const newCard = {
      cardHolderId,
      cardNumber,
      expirationDate,
      cvv,
      balance,
    };

    await addDoc(cardsCollectionRef, newCard);
    getCards();

    const button = document.getElementsByClassName('submit')[0];
    button.innerHTML = '✓ Done';
    button.setAttribute('disabled', true);

    setTimeout(() => {
      navigate('/');
    }, '1000');
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
    <Navigate to={{ pathname: '/' }} />
  );
};

export default Create;
