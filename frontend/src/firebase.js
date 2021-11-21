import firebase from "firebase";

const {
  REACT_APP_APIKEY,
  REACT_APP_APPID,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
} = process.env;

let firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
