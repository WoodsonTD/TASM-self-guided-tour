import { useState } from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import SignIn from './components/SignIn/SignIn.js';
import Editor from './components/Editor/Editor.js';
import SignUp from './components/SignUp/SignUp.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeForm, setActiveForm] = useState('signIn');

  const handleCloseSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleToggleForm = () => {
    setActiveForm(prevForm => prevForm === 'signIn' ? 'signUp' : 'signIn');
  };

  return (
    <div className="App bg-TASM-bg min-h-screen min-w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
      {isLoggedIn ? (
        <Editor />
      ) : activeForm === 'signUp' ? (
        <SignUp onClose={handleToggleForm} onSignInClick={handleToggleForm} />
      ) : (
        <SignIn onClose={handleCloseSignIn} onSignUpClick={handleToggleForm} />
      )}
    </div>
  );
}

export default App;
