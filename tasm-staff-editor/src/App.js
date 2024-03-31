import React from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import ExhibitForm from './components/ExhibitForm/ExhibitForm.js';
import Nav from './components/nav.js';

function App() {
  return (
    <div className="App bg-TASM-bg h-screen w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
      <Nav />
      <ExhibitForm />
    </div>
  );
}

export default App;
