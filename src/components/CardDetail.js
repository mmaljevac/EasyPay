import { useContext } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardItem from './CardItem';
import { db } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import phone from '../img/phone.png';
import { useState } from 'react';

const CardDetail = () => {
  const { users, curUser, cards, getCards } = useContext(AppContext);
  const { id } = useParams();
  const card = cards.find(c => c.id === id);
  const cardHolder = users.find(u => u.id === card.cardHolderId);
  const navigate = useNavigate();

  const [payText, setPayText] = useState('Pay €10');
  const [payDisabled, setPayDisabled] = useState(false);

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

  const handlePay = async price => {
    let expired = false;
    const today = new Date();
    const todayTime = today.getTime();
    const cardExDate = new Date(
      `20${card.expirationDate.substr(3, 5)}-${card.expirationDate.substr(0, 2)}-01`
    );
    const cardExTime = cardExDate.getTime();

    if (cardExTime < todayTime) {
      expired = true;
    }

    if (!expired) {
      if (card.balance >= 10) {
        setPayDisabled(true);
        const cardDoc = doc(db, 'cards', id);
        await updateDoc(cardDoc, { balance: card.balance - price });
        getCards();

        setPayText('Paid!');
        setTimeout(() => {
          setPayText('Pay €10');
          setPayDisabled(false);
        }, 2000);
      } else {
        alert('Insufficient funds!');
      }
    } else {
      alert('Card expired!');
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
                <b>Bank account: </b>
                {card.iban}
              </div>
              <div>
                <b>Card type: </b>
                {card.cardType}
              </div>
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
            <p>Open EasyPay on your phone in portrait mode to use the pay function!</p>
          </div>

          <div className="mobile">
            <div className="pay appear">
              <Link to={`/update/${id}`} className="card-list">
                <CardItem card={card} hide={true} className="cardPay" />
              </Link>
              <img src={phone} alt="phone_icon" className="mt-1" />
              <div className="mt-1 hold">Hold near reader</div>
              <ButtonComponent
                onClick={() => handlePay(10)}
                className="mt-3"
                disabled={payDisabled}
              >
                {payText}
              </ButtonComponent>
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
