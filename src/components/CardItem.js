import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const CardItem = ({ card, hide, hideAll, className }) => {
  const { users, curUser } = useContext(AppContext);
  const cardHolder = users.find(u => u.id === card.cardHolderId);
  const cardNumberHidden = '**** ' + card.cardNumber.substr(15, 19);

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

  const balanceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <>
      <div
        className={`card-item ${expiring === true && 'expiring'} ${
          expired && 'expired'
        } appear ${className}`}
      >
        {hide ? (
          <div>
            {hideAll && card.cardHolderId !== curUser.id ? (
              '**** **** **** ****'
            ) : (
              <>
                {cardNumberHidden}
                <aside>{balanceFormatter.format(card.balance)}</aside>
              </>
            )}
          </div>
        ) : (
          <div>{card.cardNumber}</div>
        )}
        {!hideAll || card.cardHolderId === curUser.id ? (
          <div>
            {card.expirationDate}
            {expiring && ' (expiring soon)'}
            {expired && ' (expired)'}
          </div>
        ) : (
          <div></div>
        )}
        <div>
          {cardHolder.name} {cardHolder.surname}
        </div>
      </div>
    </>
  );
};

export default CardItem;
