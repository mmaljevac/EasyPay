import { useContext, useEffect, useState, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Form } from 'react-bootstrap';

const Update = () => {
  const { id } = useParams();
  const { curUser, cards, getCards } = useContext(AppContext);
  const card = cards.find(c => c.id === id);
  const navigate = useNavigate();

  const cardNumberRef = useRef();
  const expirationDateRef = useRef();
  const cvvRef = useRef();
  const balanceRef = useRef();

  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [balance, setBalance] = useState('');
  const [btnText, setBtnText] = useState('Update');
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (card.cardNumber && card.expirationDate && card.cvv && card.balance) {
      setCardNumber(card.cardNumber);
      setExpirationDate(card.expirationDate);
      setCvv(card.cvv);
      setBalance(card.balance);
    }
  }, [card.cardNumber, card.expirationDate, card.cvv, card.balance]);

  const formatCardNumber = e => {
    if ([4, 9, 14].includes(e.target.value.length) && e.key !== 'Backspace' && e.key !== ' ') {
      e.target.value += ' ';
    }
    setCardNumber(e.target.value);
  };

  const formatDateInput = e => {
    if (e.target.value.length === 2 && e.key !== 'Backspace' && e.key !== '/') {
      e.target.value += '/';
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let errors = false;
    setBtnDisabled(true);
    const month = Number(expirationDate.substring(0, 2));

    if (!/^[0-9 ]{19}$/.test(cardNumber)) {
      errors = true;
      alert('Card number can contain numbers only!');
      cardNumberRef.current.focus();
    } else if (!/[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/.test(cardNumber)) {
      errors = true;
      alert('Card number should be formatted "XXXX XXXX XXXX XXXX"!');
      cardNumberRef.current.focus();
    } else if (!/^[0-9/]{5}$/.test(expirationDate)) {
      errors = true;
      alert('Expiration date should contain numbers only!');
      expirationDateRef.current.focus();
    } else if (!/[0-9][0-9]\/[0-9][0-9]/.test(expirationDate)) {
      errors = true;
      alert('Expiration date format should be MM/YY!');
      expirationDateRef.current.focus();
    } else if (month > 12 || month < 1) {
      errors = true;
      alert(`Expiration month can't be ${month}!`);
      expirationDateRef.current.focus();
    } else if (!/^[0-9]{3}$/.test(cvv)) {
      errors = true;
      alert(`CVV should contain numbers only!`);
      cvvRef.current.focus();
    }

    if (errors === false) {
      const updatedCardFields = {
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv,
        balance: Number(balance),
      };

      const cardDoc = doc(db, 'cards', id);
      await updateDoc(cardDoc, updatedCardFields);
      getCards();

      setBtnText('✓ Done');
      setTimeout(() => {
        navigate(`/card/${id}`);
      }, '1000');
    } else {
      setBtnText('Update');
      setBtnDisabled(false);
    }
  };

  return curUser && card ? (
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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="cardNumber">
          <Form.Label>Card Number</Form.Label> <br />
          <Form.Control
            type="text"
            ref={cardNumberRef}
            defaultValue={cardNumber}
            placeholder="ex. 1111 2222 3333 4444"
            minLength={19}
            maxLength={19}
            onKeyDown={formatCardNumber}
            onChange={e => setCardNumber(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            You don't have to input spaces, it will format automatically.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="expirationDate">
          <Form.Label>Expiration Date (MM/YY)</Form.Label>
          <Form.Control
            type="text"
            ref={expirationDateRef}
            defaultValue={expirationDate}
            placeholder="ex. 05/22"
            minLength={5}
            maxLength={5}
            onKeyDown={formatDateInput}
            onChange={e => setExpirationDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="text"
            ref={cvvRef}
            defaultValue={cvv}
            placeholder="ex. 123"
            minLength={3}
            maxLength={3}
            onChange={e => setCvv(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="balance">
          <Form.Label>Balance</Form.Label>
          <Form.Control
            type="number"
            ref={balanceRef}
            defaultValue={balance}
            step="any"
            placeholder="ex. 1234.56"
            onChange={e => setBalance(e.target.value)}
            required
          />
        </Form.Group>
        <ButtonComponent type="submit" disabled={btnDisabled}>
          {btnText}
        </ButtonComponent>
      </Form>
    </>
  ) : (
    <Navigate to={{ pathname: '/' }} />
  );
};

export default Update;
