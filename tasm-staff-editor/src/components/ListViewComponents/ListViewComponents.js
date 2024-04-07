import { db } from '../../firebase.js';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
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
        console.error("ERROR:" + error);
      }
    };
    fetchData();
  }, [entry]);

  const handleAddExhibit = async () => {
    const docRef = await addDoc(collection(db, 'exhibits'), {});
    console.log('Exhibit data saved to Firestore');
    setEntry(docRef.id);
  };

  const handleOrderChange = async (event, exhibit) => {
    const newOrder = parseInt(event.target.value);
    if (newOrder === exhibit.data().order) {
      return;
    }
    const fb_doc = doc(db, 'exhibits', exhibit.id);
    //check if another exhibit has this order number
    //if so, swap the order numbers
    const querySnapshot = await getDocs(collection(db, 'exhibits'));
    querySnapshot.forEach((doc) => {
      if (doc.data().order === newOrder && doc.id !== exhibit.id) {
        //swap order numbers
        updateDoc(fb_doc, { order: newOrder });
        updateDoc(doc.ref, { order: exhibit.data().order });
      }
    });
    updateDoc(fb_doc, { order: newOrder });
  };

  function sortExhibits(a, b) {
    if (a.data().order != null && b.data().order != null) {
      if (parseInt(a.data().order) < parseInt(b.data().order)) {
        console.log(a.data().order + " < " + b.data().order);
        return -1;
      } else {
        return 1;
      }
    }
    if (a.data().order != null && b.data().order == null) {
      return -1;
    }
    if (b.data().order != null && a.data().order == null) {
      return 1;
    }
    return 0;
  }
  console.log(exhibitData);
  console.log(exhibitData.sort(sortExhibits));
  return (
    <div>
      <h1 className='text-2xl text-white text-center mb-4'>Exhibit List</h1>
      <div className="overflow-x-auto">
        <table className='listView mx-auto md:text-left rounded-md bg-lightBlue border-collapse bg-opacity-20 text-gray'>
          <thead>
            <tr>
              <th >Exhibit Name</th>
              <th>Exhibit ID</th>
              <th className=''>EDIT</th>
              {/* <th>HIDE</th> */}
              <th className="hidden md:table-cell">ORDER</th>
              <th>Move Up</th>
              <th>Move Down</th>
              <th className="hidden md:table-cell">Delete Exhibit Page</th>
            </tr>
          </thead>
          <tbody className="">
            {exhibitData.sort(sortExhibits).map((exhibit) => { return (<ListViewItem exhibit={exhibit} setEntry={setEntry} handleOrderChange={handleOrderChange} order={exhibit.data().order} />); })}
          </tbody>
        </table>
        <div className='flex justify-center mt-6'>
          <Button
            label="Add New Exhibit"
            onClick={() => handleAddExhibit()}
            icon={null}
            className="btn rounded-full pl-3 pr-4 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)] mb-10"
          />
        </div>
      </div>
    </div>
  );
};
