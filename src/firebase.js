import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDh8nTzHeNJTL8XnKKM2pWJBCqG9cmHBRk",
  authDomain: "card-app-2.firebaseapp.com",
  projectId: "card-app-2",
  storageBucket: "card-app-2.appspot.com",
  messagingSenderId: "687461060880",
  appId: "1:687461060880:web:96be27238cbcf65b525595"
};

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
} = process.env;

// const firebaseConfig = {
//   apiKey: REACT_APP_API_KEY,
//   authDomain: REACT_APP_AUTH_DOMAIN,
//   projectId: REACT_APP_PROJECT_ID,
//   storageBucket: REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
//   appId: REACT_APP_APP_ID,
// };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
