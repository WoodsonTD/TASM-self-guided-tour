import { useState } from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import SignIn from './components/SignIn/SignIn.js';
import Editor from './components/Editor/Editor.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCloseSignIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App bg-TASM-bg min-h-screen min-w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
      {isLoggedIn ? (
        <Editor />
      ) : (
        <SignIn onClose={handleCloseSignIn} />
  )}
    </div>
  );
}

export default App;
