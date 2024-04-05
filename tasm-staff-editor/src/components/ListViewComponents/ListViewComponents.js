import { db } from '../../firebase.js'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import ListViewItem from './ListViewItem.js';
import Button from '../ButtonPanel/Button.js';

export default function ListViewComponent({ entry, setEntry }) {

  const [exhibitData, setExhibitData] = useState([]);
  // let exhibitData = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = await getDocs(collection(db, 'exhibits'));
        setExhibitData(q.docs);
      } catch (error) {
        console.error("ERROR:"+error);
      }
    }
    fetchData();
  }, [entry]);

  const handleAddExhibit = async () => {
    const docRef = await addDoc(collection(db, 'exhibits'), {});
      console.log('Exhibit data saved to Firestore');
      setEntry(docRef.id);
  }

  return (
    <div>
      <h1 className='text-2xl text-white text-center'>Exhibit List</h1>
      <Button
        label="Add New Exhibit"
        onClick={() => handleAddExhibit()}
        icon={null}
        className="btn rounded-md py-0.5 px-3 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
      />
      <table className='mx-auto text-left rounded-md bg-lightBlue bg-opacity-20 border-collapse'>
        <thead>
          <tr>
            <th>Exhibit Name</th>
            <th>Exhibit ID</th>
            <th>EDIT</th>
            {/* <th>HIDE</th> */}
            <th>ORDER</th>
            <th>Move Up</th>
            <th>Move Down</th>
            <th>Delete Exhibit Page</th>
          </tr>
        </thead>
        <tbody>
          {exhibitData.map((exhibit) => <ListViewItem exhibit={exhibit} setEntry={setEntry} />)}
        </tbody>
      </table>
    </div>
  );
};
