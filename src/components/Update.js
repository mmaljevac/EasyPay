import { useContext, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardForm from './CardForm';

const Update = () => {
  const { id } = useParams();
  const { curUser, cards, setCards } = useContext(AppContext);
  const card = cards.find(c => c.id === Number(id));

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

  const handleUpdate = e => {
    e.preventDefault();

    let newCards = cards.map(c => {
      if (c.id === Number(id)) {
        return {
          id: Number(id),
          cardHolderId: card.cardHolderId,
          cardNumber: document.getElementById('cardNumber').value,
          expirationDate: document.getElementById('expirationDate').value,
          cvv: document.getElementById('cvv').value,
          balance: document.getElementById('balance').value,
        };
      } else return c;
    });

    setCards(newCards);

    const button = document.getElementsByClassName('submit')[0];
    button.innerHTML = '✓ Done';
    button.setAttribute('disabled', true);

    setTimeout(() => {
      navigate(`/card/${id}`);
    }, 1000);
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