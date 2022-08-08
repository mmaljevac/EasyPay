import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardItem from './CardItem';

const Home = () => {
  const { curUser, cards } = useContext(AppContext);
  const navigate = useNavigate();

  return curUser ? (
    <Container className="d-flex flex-column align-items-center">
      <h1>Card List</h1>
      {cards.map(card => {
        return (
          <Link to={`/card/${card.id}`} key={card.id} className="card-list">
            <CardItem card={card} hide={true} />
          </Link>
        );
      })}
      <ButtonComponent onClick={() => navigate('/create')} className="appear">
        + Add
      </ButtonComponent>
    </Container>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default Home;
