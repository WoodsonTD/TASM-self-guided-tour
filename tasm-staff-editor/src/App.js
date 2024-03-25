import React from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import './components/exhibit_form.js';
import ExhibitForm from './components/exhibit_form.js';
import Nav from './components/nav.js';

function App() {
  return (
    <div className="App bg-TASM-bg">
      <Nav />
      <ExhibitForm />
    </div>
  );
}

export default App;
