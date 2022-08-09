import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//TODO env variables
const firebaseConfig = {
  apiKey: "AIzaSyDh8nTzHeNJTL8XnKKM2pWJBCqG9cmHBRk",
  authDomain: "card-app-2.firebaseapp.com",
  projectId: "card-app-2",
  storageBucket: "card-app-2.appspot.com",
  messagingSenderId: "687461060880",
  appId: "1:687461060880:web:96be27238cbcf65b525595"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
