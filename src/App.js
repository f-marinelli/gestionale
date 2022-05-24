import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APY_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const dbRef = ref(getDatabase(app));

const getArticles = () => {
  get(child(dbRef, `articoli`)).then((snapshot) => {
    console.log(snapshot.val());
  });
};

const postArticle = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  set(ref(db, `articoli/${formData.get('titolo')}`), {
    titolo: formData.get('titolo'),
    testo: formData.get('testo'),
  });
};

const updateArticle = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const updates = {};
  updates[`/articoli/${formData.get('titolo')}/testo`] = formData.get('testo');

  update(ref(db), updates);
};

const removeArticle = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  remove(child(dbRef, `articoli/${formData.get('titolo')}`));
};

const reg = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const auth = getAuth(app);
  createUserWithEmailAndPassword(
    auth,
    formData.get('email'),
    formData.get('password')
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={reg}>
          <input name="email" id="email" placeholder="email" type="email" />
          <input
            name="password"
            id="password"
            placeholder="password"
            type="password"
          />
          <button type="submit">Registrati</button>
        </form>
        <button type="button" onClick={getArticles}>
          Get articles
        </button>
        <form onSubmit={postArticle}>
          <input type="text" placeholder="titolo" name="titolo" />
          <input type="text" placeholder="testo" name="testo" />
          <button type="submit">Post article</button>
        </form>
        <form onSubmit={updateArticle}>
          <input type="text" placeholder="titolo" name="titolo" />
          <input type="text" placeholder="testo" name="testo" />
          <button type="submit">Update article</button>
        </form>
        <form onSubmit={removeArticle}>
          <input type="text" placeholder="titolo" name="titolo" />
          <button type="submit">Remove article</button>
        </form>
      </header>
    </div>
  );
}

export default App;
