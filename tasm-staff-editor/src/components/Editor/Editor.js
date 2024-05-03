import { useState } from 'react';
import Nav from './../NavBar/nav.js';
import ListViewComponents from './../ListViewComponents/ListViewComponents.js';
import ExhibitForm from './../EditorView/ExhibitForm.js';
import SignUp from '../SignUp/SignUp';


export default function Editor() {
  const [entry, setEntry] = useState(null);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  return (
    <div className="App bg-TASM-bg min-h-screen min-w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
      <Nav entry={entry} setEntry={setEntry} setIsSignUpVisible={setIsSignUpVisible} />
      {entry ?
        <ExhibitForm entry={entry}
          setEntry={setEntry} />
        :
        <ListViewComponents entry={entry}
          setEntry={setEntry} />
      }
      {isSignUpVisible && (
        <SignUp onClose={() => setIsSignUpVisible(false)} />
      )}
    </div>
  );
}
