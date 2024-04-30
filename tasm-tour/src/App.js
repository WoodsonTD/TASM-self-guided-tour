import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import ExhibitPage from './components/ExhibitPage/ExhibitPage';
import './App.css';

function App() {
  const [exhibitID, setExhibitID] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('exhibitID') || 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const newExhibitID = searchParams.get('exhibitID') || 'home';
      setExhibitID(newExhibitID);
    };

    // Listen for changes in the navigation history
    window.addEventListener('popstate', handleLocationChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <div className="bg-gray min-h-screen ld-h-screen bg-h-screen font-exo2">
      <Header exhibitID={exhibitID} setExhibitID={setExhibitID} />
      <ExhibitPage exhibitID={exhibitID} setExhibitID={setExhibitID} />
    </div>
  );
}

export default App;
