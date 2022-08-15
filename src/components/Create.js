import { useState, useContext, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import { addDoc } from 'firebase/firestore';
import { Form } from 'react-bootstrap';

const Create = () => {
  const { curUser, cardsCollectionRef, getCards } = useContext(AppContext);
  const navigate = useNavigate();

  const cardNumRef = useRef();
  const expDateRef = useRef();
  const cvvRef = useRef();
  const balanceRef = useRef();

  const cardHolderId = curUser.id;
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [balance, setBalance] = useState('');
  
  const [btnText, setBtnText] = useState('Add');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const formatCardNumber = e => {
    if ([4, 9, 14].includes(e.target.value.length) && e.key !== 'Backspace' && e.key !== ' ') {
      e.target.value += ' ';
    }
    setCardNumber(e.target.value);
  };

  const unfocusCardNumber = () => {
    if (/^[0-9]{16}$/.test(cardNumber)) {
      const pasted = `${cardNumber.substring(0, 4)} ${cardNumber.substring(4, 8)} ${cardNumber.substring(8, 12)} ${cardNumber.substring(12, 16)}`
      cardNumRef.current.value = pasted;
      setCardNumber(pasted);
    }
  }

  const formatDateInput = e => {
    if (e.target.value.length === 2 && !e.target.value.includes('/') && e.key !== 'Backspace' && e.key !== '/') {
      e.target.value += '/';
    }
  };

  const unfocusExpDate = () => {
    if (/^[1-9]\/[0-9][0-9]$/.test(expirationDate)) {
      expDateRef.current.value = '0' + expirationDate;
      setExpirationDate('0' + expirationDate);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    let errors = false;
    setBtnDisabled(true);
    const month = Number(expirationDate.substring(0, 2));

    if (!/^[0-9 ]+$/.test(cardNumber)) {
      errors = true;
      alert('Card number can contain numbers only!');
      cardNumRef.current.focus();
    } else if (!/[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/.test(cardNumber)) {
      errors = true;
      alert('Card number should be formatted "XXXX XXXX XXXX XXXX"!');
      cardNumRef.current.focus();
    } else if (!/^[0-9/]+$/.test(expirationDate)) {
      errors = true;
      alert('Expiration date should contain numbers only!');
      expDateRef.current.focus();
    } else if (!/[0-9][0-9]\/[0-9][0-9]/.test(expirationDate)) {
      errors = true;
      alert('Expiration date format should be MM/YY!');
      expDateRef.current.focus();
    } else if (month > 12 || month < 1) {
      errors = true;
      alert(`Expiration month can't be ${month}!`);
      expDateRef.current.focus();
    } else if (!/^[0-9]+$/.test(cvv)) {
      errors = true;
      alert(`CVV should contain numbers only!`);
      cvvRef.current.focus();
    }

    if (errors === false) {
      const newCard = {
        cardHolderId,
        cardNumber,
        expirationDate,
        cvv,
        balance,
      };

      await addDoc(cardsCollectionRef, newCard);
      getCards();

      setBtnText('✓ Done');
      setTimeout(() => {
        navigate('/');
      }, '1000');
    } else {
      setBtnText('Add');
      setBtnDisabled(false);
    }
  };

  return curUser ? (
    <>
      <ButtonComponent onClick={() => navigate('/')} size="sm" className="mb-2" color="transparent">
        &lt; Back
      </ButtonComponent>
      <h1>Add a new card</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="cardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            ref={cardNumRef}
            placeholder="ex. 1111 2222 3333 4444"
            maxLength={19}
            onKeyDown={formatCardNumber}
            onChange={e => setCardNumber(e.target.value)}
            onBlur={unfocusCardNumber}
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
            ref={expDateRef}
            placeholder="ex. 05/22"
            maxLength={5}
            onKeyDown={formatDateInput}
            onChange={e => setExpirationDate(e.target.value)}
            onBlur={unfocusExpDate}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="text"
            ref={cvvRef}
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
            step="any"
            max="1000000000"
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

export default Create;
