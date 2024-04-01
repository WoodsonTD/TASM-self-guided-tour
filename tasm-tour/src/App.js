import React from 'react';
import Header from './components/Header/Header';
import ExhibitPage from './components/ExhibitPage/ExhibitPage';
import './App.css';
import ExhibitTitle from './components/ExhibitTitle/ExhibitTitle';
import ModelView from './components/AFrame/ModelView';
import ButtonPanel from './components/ButtonPanel/ButtonPanel';

function App() {
  return (
    <div className="bg-gray bg-h-screen font-exo2">
      <Header />
      <ExhibitTitle title="Rockwell Ranger" />
      <ModelView modelID="voyager" sky='black'/>
      <p>Amidst the vast expanse of azure, where the horizon meets the heavens, lies the realm of flight where dreams take wing. In this realm of soaring aspirations, the Loral ISPLUM emerges as a beacon of innovation and excellence. Its sleek design, crafted with precision and passion, embodies the spirit of adventure that defines the aviation industry.

  As the sun kisses the fuselage, casting a golden hue upon its surface, the Loral ISPLUM prepares to embark on its journey. With engines roaring to life, it gracefully ascends into the boundless sky, defying gravity with effortless grace.

  Within its luxurious cabin, passengers are enveloped in comfort and sophistication. From plush seating to state-of-the-art entertainment systems, every detail is meticulously curated to ensure a seamless travel experience. As the aircraft cruises at cruising altitude, travelers gaze out of the panoramic windows, marveling at the world below.

  Meanwhile, in the cockpit, skilled pilots navigate the skies with ex</p>
      <ButtonPanel />
      {/* <ExhibitPage /> */}
    </div>
  );
}

export default App;
