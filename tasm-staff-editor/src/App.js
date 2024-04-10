import { useState } from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import SignIn from './components/SignIn/SignIn.js';
import Editor from './components/Editor/Editor.js';
import SignUp from './components/SignUp/SignUp.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleCloseSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleToggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="App bg-TASM-bg min-h-screen min-w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
      {isLoggedIn ? (
        <Editor />
      ) : (
        <>
          {showSignUp ? (
            <SignUp onClose={handleToggleSignUp} />
          ) : (
            <SignIn onClose={handleCloseSignIn} onSignUpClick={handleToggleSignUp} />
          )}
          </>
      )}
    </div>
  );
}

export default App;
