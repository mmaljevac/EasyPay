import { Form } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

const CardForm = ({ handle, submitText }) => {
  const formatCardNumber = e => {
    if ([4, 9, 14].includes(e.target.value.length) && e.key !== 'Backspace' && e.key !== ' ') {
      e.target.value += ' ';
    }
  };

  const formatDateInput = e => {
    if (e.target.value.length === 2 && e.key !== 'Backspace' && e.key !== '/') {
      e.target.value += '/';
    }
  };

  return (
    <>
      <Form onSubmit={handle}>
        <Form.Group className="mb-3" controlId="cardNumber">
          <Form.Label>Card Number</Form.Label> <br />
          <Form.Control
            type="text"
            placeholder="ex. 1111 2222 3333 4444"
            onKeyDown={formatCardNumber}
            minLength={19}
            maxLength={19}
            required
          />
          <Form.Text className="text-muted">
            You don't have to input spaces, it will format automatically.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="expirationDate">
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="ex. 05/22"
            onKeyDown={formatDateInput}
            minLength={5}
            maxLength={5}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="text" placeholder="ex. 123" required minLength={3} maxLength={3} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="balance">
          <Form.Label>Balance</Form.Label>
          <Form.Control type="number" step="any" placeholder="ex. 1234.56" required />
        </Form.Group>
        <ButtonComponent type="submit" className="submit">
          {submitText}
        </ButtonComponent>
      </Form>
    </>
  );
};

export default CardForm;
