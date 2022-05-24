import './App.css';
import db from './firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const articoliRef = collection(db, 'articoli');

const getArticles = async () => {
  const data = await getDocs(articoliRef);
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

const postArticle = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  await addDoc(articoliRef, {
    titolo: formData.get('titolo'),
    testo: formData.get('testo'),
  });
};

const updateArticle = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const articolo = doc(db, 'articoli', formData.get('id'));

  const updates = {
    titolo: formData.get('titolo'),
    testo: formData.get('testo'),
  };

  await updateDoc(articolo, updates);
};

const removeArticle = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const articolo = doc(db, 'articoli', formData.get('id'));

  await deleteDoc(articolo);
};

const reg = (e) => {
  // e.preventDefault();
  // const formData = new FormData(e.target);
  // const auth = getAuth(app);
  // createUserWithEmailAndPassword(
  //   auth,
  //   formData.get('email'),
  //   formData.get('password')
  // );
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
          <input type="text" placeholder="id" name="id" />
          <button type="submit">Update article</button>
        </form>
        <form onSubmit={removeArticle}>
          <input type="text" placeholder="id" name="id" />
          <button type="submit">Remove article</button>
        </form>
      </header>
    </div>
  );
}

export default App;
