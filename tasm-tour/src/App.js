import { useState } from 'react';
import Header from './components/Header/Header';
import ExhibitPage from './components/ExhibitPage/ExhibitPage';
import './App.css';


function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const [exhibitID, setExhibitID] = useState(searchParams.get('exhibitID') || 'test');

  console.log(exhibitID);
  return (
    <div className="bg-gray ld-h-screen bg-h-screen font-exo2">
      <Header exhibitID={exhibitID} setExhibitID={setExhibitID} />
      <ExhibitPage exhibitID={exhibitID} />
    </div>
  );
}

export default App;
