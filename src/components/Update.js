import { useContext, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardForm from './CardForm';
import { updateDoc, doc } from 'firebase/firestore';
import {db} from '../firebase'

const Update = () => {
  const { id } = useParams();
  const { curUser, cards, setUpdated } = useContext(AppContext);
  const card = cards.find(c => c.id === id);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      curUser &&
      card.cardNumber &&
      card.expirationDate &&
      card.cvv &&
      card.balance
    ) {
      document.getElementById('cardNumber').value = card.cardNumber;
      document.getElementById('expirationDate').value = card.expirationDate;
      document.getElementById('cvv').value = card.cvv;
      document.getElementById('balance').value = card.balance;
    }
  }, [
    curUser,
    card.cardNumber,
    card.expirationDate,
    card.cvv,
    card.balance,
  ]);

  const handleUpdate = async e => {
    e.preventDefault();

    // let newCards = cards.map(c => {
    //   if (c.id === id) {
    //     return {
    //       id: id,
    //       cardHolderId: card.cardHolderId,
    //       cardNumber: document.getElementById('cardNumber').value,
    //       expirationDate: document.getElementById('expirationDate').value,
    //       cvv: document.getElementById('cvv').value,
    //       balance: document.getElementById('balance').value,
    //     };
    //   } else return c;
    // });

    // setCards(newCards);

    const updatedCardFields = {
      cardNumber: document.getElementById('cardNumber').value,
      expirationDate: document.getElementById('expirationDate').value,
      cvv: document.getElementById('cvv').value,
      balance: Number(document.getElementById('balance').value),
    }

    const cardDoc = doc(db, 'cards', id);
    await updateDoc(cardDoc, updatedCardFields);
    setUpdated(Math.random());

    // const button = document.getElementsByClassName('submit')[0];
    // button.innerHTML = '✓ Done';
    // button.setAttribute('disabled', true);

    navigate(`/card/${id}`);
  };

  return curUser ? (
    <>
      <ButtonComponent
        onClick={() => navigate(`/card/${id}`)}
        size="sm"
        className="mb-2"
        color="transparent"
      >
        &lt; Back
      </ButtonComponent>
      <h1>Edit card details</h1>
      <CardForm handle={handleUpdate} submitText="Update" />
    </>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default Update;
