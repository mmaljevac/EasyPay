import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import CardDetail from './components/CardDetail';
import Create from './components/Create';
import Update from './components/Update';
import NotFound from './components/NotFound';
import { AppContext } from './contexts/AppContext';
import Register from './components/Register';
import Footer from './components/Footer';
import { Col, Row } from 'react-bootstrap';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [curUser, setCurUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const usersCollectionRef = collection(db, 'users');
  const cardsCollectionRef = collection(db, 'cards');

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await getDocs(usersCollectionRef);
      setUsers(usersData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();

    const getCards = async () => {
      const cardsData = await getDocs(cardsCollectionRef);
      setCards(cardsData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getCards();

    // setCurUser(users.find(u => u.id === localStorage.getItem('curUser')));

    console.log(users);
    console.log(cards);
  }, []);

  return (
    <Router>
      <AppContext.Provider
        value={{
          curUser,
          setCurUser,
          users,
          setUsers,
          cards,
          setCards,
          usersCollectionRef,
          cardsCollectionRef,
        }}
      >
        <Header />
        <Container className="content">
          <Row className="justify-content-md-center">
            <Col xs={12} md={4}>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/card/:id" element={<CardDetail />}></Route>
                <Route path="/create" element={<Create />}></Route>
                <Route path="/update/:id" element={<Update />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </AppContext.Provider>
    </Router>
  );
}

export default App;
