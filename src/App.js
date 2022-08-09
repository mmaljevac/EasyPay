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
    console.log(users);
  }, []);

  useEffect(() => {
    const getCards = async () => {
      const cardsData = await getDocs(cardsCollectionRef);
      setCards(cardsData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getCards();
    console.log(cards);
  }, []);

  // const [users, setUsers] = useState([
  //   {
  //     id: '2YFRogIPr6wbtj2Xhwr8',
  //     email: 'admin@tvz.hr',
  //     password: 'admin123',
  //     name: 'Admin',
  //     surname: '',
  //     permission: 'admin',
  //   },
  //   {
  //     id: 'qVh0OTyHVLfN5RgYUl4b',
  //     email: 'mmaljevac@tvz.hr',
  //     password: 'matija123',
  //     name: 'Matija',
  //     surname: 'Maljevac',
  //     permission: 'user',
  //   },
  //   {
  //     id: 'RQxnDBQhcPCQxmhazXQb',
  //     email: 'pperic@tvz.hr',
  //     password: 'pero123',
  //     name: 'Pero',
  //     surname: 'Peric',
  //     permission: 'user',
  //   },
  // ]);

  // const [cards, setCards] = useState([
  //   {
  //     id: '7XDR3PrB5mzgvRIineI5',
  //     cardHolderId: 'qVh0OTyHVLfN5RgYUl4b',
  //     cardNumber: '1234 5678 9876 5432',
  //     expirationDate: '05/27',
  //     cvv: '123',
  //     balance: 1234.56,
  //   },
  // ]);

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
