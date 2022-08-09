import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardItem from './CardItem';

const Home = () => {
  const { curUser, cards } = useContext(AppContext);
  const navigate = useNavigate();

  let cardsFiltered = '';

  if (curUser && curUser.permission === 'admin') {
  cardsFiltered = cards;
  } else if (curUser) {
    cardsFiltered = cards.filter(c => c.cardHolderId === curUser.id);
  }

  return curUser ? (
    <Container className="d-flex flex-column align-items-center">
      {cardsFiltered.length > 0 ? <h1>Card List</h1> : <h1>Add a card!</h1>}
      {cardsFiltered.map(card => {
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

  // return (
  //   <Container className="d-flex flex-column align-items-center">
  //     {cardsFiltered.length > 0 ? <h1>Card List</h1> : <h1>Add a card!</h1>}
  //     {cardsFiltered.map(card => {
  //       return (
  //         <Link to={`/card/${card.id}`} key={card.id} className="card-list">
  //           <CardItem card={card} hide={true} />
  //         </Link>
  //       );
  //     })}
  //     <ButtonComponent onClick={() => navigate('/create')} className="appear">
  //       + Add
  //     </ButtonComponent>
  //   </Container>
  // );
};

export default Home;
