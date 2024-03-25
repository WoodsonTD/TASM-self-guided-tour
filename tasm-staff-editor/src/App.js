import React from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import './components/exhibit_form.js';
import ExhibitForm from './components/exhibit_form.js';

function App() {
  return (
    <div className="App">
      <h1 className="text-6xl text-red-500">TASM Self-Guided Tour</h1>
      <ExhibitForm />
    </div>
  );
}

export default App;
