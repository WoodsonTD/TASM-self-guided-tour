import { useState } from 'react';
import './App.css';
import './assets/images/tasm-favicon.png';
import ExhibitForm from './components/EditorView/ExhibitForm.js';
import Nav from './components/NavBar/nav.js';
import ListViewComponents from './components/ListViewComponents/ListViewComponents.js';

function App() {
  const [entry, setEntry] = useState(null);
  return (
    <div className="App bg-TASM-bg min-h-screen min-w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
      <Nav />
      {entry ?
        <ExhibitForm entry={entry}
          setEntry={setEntry} />
        :
        <ListViewComponents entry={entry}
          setEntry={setEntry} />}
    </div>
  );
}

export default App;
