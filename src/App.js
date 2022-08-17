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
import Users from './components/Users';
import AllCards from './components/AllCards';
import Account from './components/Account';

function App() {
  const usersCollectionRef = collection(db, 'users');
  const cardsCollectionRef = collection(db, 'cards');
  const [curUser, setCurUser] = useState(JSON.parse(sessionStorage.getItem('curUser')));
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);

  const getUsers = async () => {
    const usersData = await getDocs(usersCollectionRef);
    setUsers(usersData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const getCards = async () => {
    const cardsData = await getDocs(cardsCollectionRef);
    setCards(cardsData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  // TODO useEffect called twice
  useEffect(() => {
    getUsers();
    getCards();

    // TODO log out if user deleted
    // if (curUser && users && !users.includes(curUser)) {
    //   console.log('USER DELETED');
    //   console.log('curUser: ', curUser);
    //   console.log('users: ', users);
    //   setCurUser(null);
    //   sessionStorage.removeItem('curUser');
    // }
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
          getUsers,
          getCards,
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
                <Route path="/users" element={<Users />}></Route>
                <Route path="/cards" element={<AllCards />}></Route>
                <Route path="/account" element={<Account />}></Route>
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
