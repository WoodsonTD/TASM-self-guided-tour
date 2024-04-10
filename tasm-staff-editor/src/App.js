import { useState } from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import ExhibitForm from './components/ExhibitForm/ExhibitForm.js';
import Nav from './components/nav.js';
import SignIn from './components/SignIn/SignIn.js';
import ListViewComponents from './components/ListViewComponents/ListViewComponents.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCloseSignIn = () => {
    setIsLoggedIn(true);
  };

  const [entry, setEntry] = useState(null);
  return (
    <div className="App bg-TASM-bg min-h-screen min-w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
      <Nav />
      {isLoggedIn ? (
        <ExhibitForm />
      ) : (
        <SignIn onClose={handleCloseSignIn} />
  )}
    </div>
  );
}

export default App;
