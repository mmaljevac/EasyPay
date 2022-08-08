import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const CardItem = ({ card, hide }) => {
  const { users } = useContext(AppContext);
  const cardHolder = users.find(u => u.id === card.cardHolderId);
  const cardNumberHidden = '**** **** **** ' + card.cardNumber.substr(15, 19);

  let expiring = false;
  let expired = false;
  const today = new Date();
  const todayTime = today.getTime();
  const cardExDate = new Date(
    `20${card.expirationDate.substr(3, 5)}-${card.expirationDate.substr(0, 2)}-01`
  );
  const cardExTime = cardExDate.getTime();
  const oneMonthTime = 30 * 24 * 60 * 60 * 1000;

  if (cardExTime - todayTime < oneMonthTime) expiring = true;
  if (cardExTime < todayTime) {
    expired = true;
    expiring = false;
  }

  return (
    <>
      <div
        className={`appear ${expiring === true ? 'expiring' : 'card-item'} ${expired && 'expired'}`}
      >
        {hide ? <div>{cardNumberHidden}</div> : <div>{card.cardNumber}</div>}
        <div>
          {card.expirationDate}
          {expiring && ' (expiring soon)'}
          {expired && ' (expired)'}
        </div>
        <div>
          {cardHolder.name} {cardHolder.surname}
        </div>
      </div>
    </>
  );
};

export default CardItem;
