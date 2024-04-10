import { useState } from 'react';
import Nav from './../NavBar/nav.js';
import ListViewComponents from './../ListViewComponents/ListViewComponents.js';
import ExhibitForm from './../EditorView/ExhibitForm.js';


export default function Editor() {
    const [entry, setEntry] = useState(null);

    return (
        <div className="App bg-TASM-bg min-h-screen min-w-screen bg-cover bg-left-bottom bg-no-repeat font-exo2">
            <Nav entry={entry} setEntry={setEntry} />
            {entry ?
                <ExhibitForm entry={entry}
                    setEntry={setEntry} />
                :
                <ListViewComponents entry={entry}
                    setEntry={setEntry} />}
        </div>
    );
}
