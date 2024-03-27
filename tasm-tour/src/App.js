import React from 'react';
import Header from './components/Header/Header';
import ExhibitPage from './components/ExhibitPage/ExhibitPage';
import './App.css';
import ExhibitTitle from './components/ExhibitTitle/ExhibitTitle';
import ModelView from './components/AFrame/ModelView';
import ButtonPanel from './components/ButtonPanel/ButtonPanel';

function App() {
  return (
    <div className="bg-gray h-screen">
    <Header />
    <ExhibitTitle title="Welcome to the TASM Tour" />
    <ModelView modelID="voyager" sky='black'/>
    <p> Content Text will be here!</p>
    <ButtonPanel />
    {/* <ExhibitPage /> */}
    </div>
  );
}

export default App;
