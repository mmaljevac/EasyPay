import { useContext, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardItem from './CardItem';

const CardDetail = () => {
  const { curUser, cards, setCards } = useContext(AppContext);
  const { id } = useParams();
  const card = cards.find(c => c.id === Number(id));
  const [showPin, setShowPin] = useState(false);
  const navigate = useNavigate();

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      setCards(cards.filter(c => c.id !== Number(id)));
      navigate('/');
    }
  };

  const balanceFormatter = new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: 'HRK',
  });

  return curUser ? (
    <>
      <ButtonComponent onClick={() => navigate('/')} size="sm" className="mb-2" color="transparent">
        &lt; Back
      </ButtonComponent>
      <h1>{card.cardHolderName}'s card</h1>
      <CardItem card={card} hide={false} />
      <section className="mt-3">
        <div>
          <b>Card number: </b>
          {card.cardNumber}
        </div>
        <div>
          <b>Card holder: </b>
          {card.cardHolderName} {card.cardHolderSurname}
        </div>
        <div>
          <b>Expiration date: </b>
          {card.expirationDate}
        </div>
        <div>
          <b>CVV: </b>
          {card.cvv}
        </div>
        {showPin ? (
          <div id="pin">
            <b>PIN: </b>
            {card.pin}
          </div>
        ) : (
          <div id="pin">
            <b>PIN: </b>****
          </div>
        )}
        <ButtonComponent size="sm" onClick={() => setShowPin(!showPin)}>
          Toggle PIN
        </ButtonComponent>
        <div>
          <b>Balance: </b>
          {balanceFormatter.format(card.balance)}
        </div>
      </section>
      <ButtonComponent
        onClick={() => navigate(`/update/${id}`)}
        color={'blue'}
        className="mt-3 me-3"
      >
        Edit
      </ButtonComponent>
      <ButtonComponent onClick={() => handleDelete(id)} color={'red'} className="mt-3">
        Delete
      </ButtonComponent>
    </>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default CardDetail;
