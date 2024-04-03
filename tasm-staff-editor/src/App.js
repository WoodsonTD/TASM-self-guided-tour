import React from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import ExhibitForm from './components/EditorView/ExhibitForm.js';
import Nav from './components/NavBar/nav.js';

function App() {
  return (
    <div className="App bg-TASM-bg min-h-screen min-w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
      <Nav />
      <ExhibitForm />
    </div>
  );
}

export default App;
