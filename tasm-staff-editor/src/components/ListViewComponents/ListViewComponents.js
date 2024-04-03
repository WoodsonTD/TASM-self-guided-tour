import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import ListViewItem from './ListViewItem.js';

export default function ListViewComponents({ entry, setEntry }) {

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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Exhibit Name</th>
            <th>Exhibit ID</th>
            <th>EDIT</th>
            <th>HIDE</th>
            <th>ORDER</th>
            <th>Move Up</th>
            <th>Move Down</th>
            <th>Delete Exhibit Page</th>
          </tr>
        </thead>
        <tbody>
          {exhibitData.map((exhibit) => <ListViewItem exhibit={exhibit} />)}
        </tbody>
      </table>
    </div>
  );
};
