import React, { useState } from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import ExhibitForm from './components/ExhibitForm/ExhibitForm.js';
import Nav from './components/nav.js';
import SignIn from './components/SignIn/SignIn.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCloseSignIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App bg-TASM-bg h-screen w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
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
