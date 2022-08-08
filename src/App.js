import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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

function App() {
  const [curUser, setCurUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 0,
      username: 'Matija',
      password: 'fQoKGvoB',
    },
    {
      id: 1,
      username: 'Admin',
      password: 'admin123',
    },
  ]);

  const [cards, setCards] = useState([
    {
      id: 0,
      cardNumber: '1234 5678 9876 5432',
      expirationDate: '05/27',
      cardHolderName: 'Matija',
      cardHolderSurname: 'Maljevac',
      cvv: '123',
      pin: '0987',
      balance: 1234.56,
    },
    {
      id: 1,
      cardNumber: '5729 5726 1562 3408',
      expirationDate: '02/24',
      cardHolderName: 'Pero',
      cardHolderSurname: 'Peric',
      cvv: '261',
      pin: '2649',
      balance: 3953.85,
    },
    {
      id: 2,
      cardNumber: '3859 4726 5789 2958',
      expirationDate: '12/99',
      cardHolderName: 'Elon',
      cardHolderSurname: 'Musk',
      cvv: '835',
      pin: '3859',
      balance: 1000000000000,
    },
    {
      id: 3,
      cardNumber: '4937 4927 6274 4802',
      expirationDate: '06/22',
      cardHolderName: 'Ana',
      cardHolderSurname: 'Anic',
      cvv: '538',
      pin: '5972',
      balance: 7495.24,
    },
    {
      id: 4,
      cardNumber: '5729 7592 7264 9852',
      expirationDate: '03/22',
      cardHolderName: 'Ivo',
      cardHolderSurname: 'Ivic',
      cvv: '262',
      pin: '6295',
      balance: 125.37,
    },
  ]);

  return (
    <Router>
      <AppContext.Provider value={{ curUser, setCurUser, users, setUsers, cards, setCards }}>
        <Header />
        <Container className='content'>
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
