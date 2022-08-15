import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import CardItem from './CardItem';

const AllCards = () => {
  const { curUser, cards } = useContext(AppContext);

  return curUser ? (
    <Container className="d-flex flex-column align-items-center">
      {cards.length > 0 ? (
        <>
          <h1>Card List</h1>
          {cards.map(card => {
            return (
              <Link to={`/card/${card.id}`} key={card.id} className="card-list">
                <CardItem card={card} hide={true} />
              </Link>
            );
          })}
        </>
      ) : (
        <h1>No cards</h1>
      )}
    </Container>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default AllCards;
