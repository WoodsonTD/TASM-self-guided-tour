import { db } from '../../firebase.js';
import { collection, getDocs, addDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import ListViewItem from './ListViewItem.js';
import Button from '../ButtonPanel/Button.js';
import { writeBatch } from 'firebase/firestore';
import { PlusIcon } from '@heroicons/react/24/outline';


/**
 * 
 * @param {*} entry Value of the current exhibit being edited
 * @param {*} setEntry Function to set the entry in the parent component, used to open the edit form 
 * @returns ListViewComponent, a list of all exhibits in the database
 */
export default function ListViewComponent({ entry, setEntry }) {
  const [exhibitData, setExhibitData] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'exhibits'));
      let sortedData = querySnapshot.docs
        .map(doc => ({ id: doc.id, order: doc.data().order, ...doc.data() }))
        .sort((a, b) => a.order - b.order);

      validateOrder(sortedData);
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entry]);

  const moveUp = async (exhibitId) => {
    const index = exhibitData.findIndex(exhibit => exhibit.id === exhibitId);
    if (index > 0) {
      // Swap order with the previous item
      const prevOrder = exhibitData[index - 1].order;
      doOrderChange(exhibitData[index], prevOrder);
    }
  };


  const moveDown = async (exhibitId) => {
    const index = exhibitData.findIndex(exhibit => exhibit.id === exhibitId);
    if (index < exhibitData.length - 1) {
      // Swap order with the next item
      const nextOrder = exhibitData[index + 1].order;
      doOrderChange(exhibitData[index], nextOrder);
    }
  };


  const handleAddExhibit = async () => {
    const docRef = await addDoc(collection(db, 'exhibits'), {});
    console.log('Exhibit data saved to Firestore');
    setEntry(docRef.id);
  };


  const handleOrderChange = async (event, movedExhibit) => {
    // Parse the new order number from the event target value
    const newOrder = parseInt(event.target.value);
    doOrderChange(movedExhibit, newOrder);
  };


  const doOrderChange = async (movedExhibit, newOrder) => {
    // Exit the function if the new order is the same as the current order
    if (newOrder === movedExhibit.order) {
      return;
    }
    // Create a reference to the moved exhibit's document
    const movedDocRef = doc(db, 'exhibits', movedExhibit.id);
    // Get all exhibit documents from Firestore
    const querySnapshot = await getDocs(collection(db, 'exhibits'));
    // Find if any exhibit is already at the newOrder position
    const displacedExhibit = querySnapshot.docs.find(doc => doc.data().order === newOrder);
    // Start a batch to perform both updates together
    const batch = writeBatch(db);
    // Update the moved exhibit's order
    batch.update(movedDocRef, { order: newOrder });
    // If there is a displaced exhibit, update its order to the moved exhibit's current order
    if (displacedExhibit) {
      batch.update(displacedExhibit.ref, { order: movedExhibit.order });
    }
    // Commit the batch
    await batch.commit();
    if (fetchData) {
      fetchData() // Call fetchData if it exists
    }
  };

  const validateOrder = async (sortedData) => {
    // Start a batch to perform both updates together
    if (sortedData) {
      const batch = writeBatch(db);
      for (let exhibit of sortedData) {
        const curIndex = sortedData.findIndex((ex) => ex.id === exhibit.id);
        const curDocRef = doc(db, 'exhibits', exhibit.id) || null;
        if (exhibit.order >= 0) {
          const nextExhibit = sortedData[curIndex + 1];
          if (nextExhibit) {
            const nextDocRef = doc(db, 'exhibits', nextExhibit.id) || null;

            const nextID = nextExhibit.exhibitID;
            const curID = exhibit.exhibitID;
            // Update the moved exhibit's order
            if (nextID) {
              batch.update(curDocRef, { next: nextExhibit.exhibitID });
            }
            if (curID) {
              batch.update(nextDocRef, { prev: exhibit.exhibitID });
            }
          } else {
            const curDocRef = doc(db, 'exhibits', exhibit.id) || null;
            batch.update(curDocRef, { next: null });
          }
        } else {
          batch.update(curDocRef, {next: null, prev: null})
        }
      }
      await batch.commit();
      setExhibitData(sortedData);
    }
  }

  const sortExhibits = (a, b) => {
    // Directly access the 'order' property since 'a' and 'b' are plain objects now.
    const orderA = a.order;
    const orderB = b.order;

    // Ensure the comparison logic accounts for possibly undefined or null 'order' values.
    if (orderA != null && orderB != null && !(isNaN(orderA) || isNaN(orderB))) {
      return parseInt(orderA) - parseInt(orderB);
    }
    if (orderA != null && (orderB == null || isNaN(orderB))) {
      return -1;
    }
    if (orderB != null && (orderA == null || isNaN(orderA))) {
      return 1;
    }
    return 0;
  };

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
            {exhibitData.sort(sortExhibits).map((exhibit, key) => (
              <ListViewItem
                key={key}
                index={key}
                exhibit={exhibit}
                setEntry={setEntry}
                handleOrderChange={handleOrderChange}
                order={exhibit.order}
                moveUp={() => moveUp(exhibit.id)} // Pass the function for moving up
                moveDown={() => moveDown(exhibit.id)} // Pass the function for moving down
                fetch={fetchData}
              />
            ))}
          </tbody>
        </table>
        <div className='flex justify-center mt-6'>
          <Button
            label="Add New Exhibit"
            onClick={() => handleAddExhibit()}
            icon={PlusIcon}
            iconProps={{ className: "w-7 h-7" }}
            iconPosition="left"
            className="btn rounded-full pl-3 pr-4 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)] mb-10"
          />
          <div className='flex justify-center mt-6'>
          </div>
        </div>
      </div>
    </div>
  );
}

