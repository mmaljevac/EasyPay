import { useContext } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardItem from './CardItem';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import phone from '../img/phone.png';

const CardDetail = () => {
  const { users, curUser, cards, getCards } = useContext(AppContext);
  const { id } = useParams();
  const card = cards.find(c => c.id === id);
  const cardHolder = users.find(u => u.id === card.cardHolderId);
  const navigate = useNavigate();

  const handleBack = () => {
    if (card.cardHolderId === curUser.id) {
      navigate('/');
    } else {
      navigate('/cards');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const cardDoc = doc(db, 'cards', id);
      await deleteDoc(cardDoc);
      getCards();
      navigate('/');
    }
  };

  const balanceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  });

  return curUser ? (
    <>
      <ButtonComponent onClick={handleBack} size="sm" className="mb-2" color="transparent">
        &lt; Back
      </ButtonComponent>
      {cardHolder ? (
        <>
          <h1>{cardHolder.name}'s card</h1>
          <div className="desktop appear">
            <CardItem card={card} hide={false} />
            <section className="mt-3">
              <div>
                <b>Card number: </b>
                {card.cardNumber}
              </div>
              <div>
                <b>Card holder: </b>
                {cardHolder.name} {cardHolder.surname}
              </div>
              <div>
                <b>Expiration date: </b>
                {card.expirationDate}
              </div>
              <div>
                <b>CVV: </b>
                {card.cvv}
              </div>
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
            <ButtonComponent onClick={handleDelete} color={'red'} className="mt-3">
              Delete
            </ButtonComponent>
            <hr />
            <p>Open EasyPay on your phone to use the pay function!</p>
          </div>

          <div className="mobile">
            <div className="pay appear">
              <Link to={`/update/${id}`} className="card-list">
                <CardItem card={card} hide={true} className="cardPay" />
              </Link>
              <img src={phone} alt="phone_icon" className="mt-2" />
              <div className="mt-1 hold">Hold near reader</div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  ) : (
    <Navigate to={{ pathname: '/' }} />
  );
};

export default CardDetail;
