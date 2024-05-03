import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import ExhibitPage from './components/ExhibitPage/ExhibitPage';
import './App.css';

function App() {
  const defaultExhibitId = 'home';

  return (
    <Router>
      <div className="bg-gray min-h-screen ld-h-screen bg-h-screen font-exo2">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to={`/exhibit/${defaultExhibitId}`} />} />
          <Route path="/exhibit/:exhibitID" element={<ExhibitPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
