import { db } from '../../firebase.js';
import { collection, getDocs, addDoc, updateDoc,doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import ListViewItem from './ListViewItem.js';
import Button from '../ButtonPanel/Button.js';
import { writeBatch } from 'firebase/firestore';

export default function ListViewComponent({ entry, setEntry }) {
  const [exhibitData, setExhibitData] = useState([]);

  const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'exhibits'));
        let sortedData = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.order - b.order);

        let lastOrder = sortedData[0]?.order || 0;
        for (let exhibit of sortedData) {
          if (isNaN(exhibit.order) || exhibit.order == null || exhibit.order <= lastOrder) {
            lastOrder++;
            await updateDoc(doc(db, 'exhibits', exhibit.id), { order: lastOrder });
            exhibit.order = lastOrder;
          } else {
            lastOrder = exhibit.order;
          }
        }

        setExhibitData(sortedData);
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
      const newOrder = exhibitData[index].order;
      const prevOrder = exhibitData[index - 1].order;
      await updateDoc(doc(db, 'exhibits', exhibitId), { order: prevOrder });
      await updateDoc(doc(db, 'exhibits', exhibitData[index - 1].id), { order: newOrder });
      fetchData(); // Refetch the data after update
    }
  };

  const moveDown = async (exhibitId) => {
    const index = exhibitData.findIndex(exhibit => exhibit.id === exhibitId);
    if (index < exhibitData.length - 1) {
      // Swap order with the next item
      const newOrder = exhibitData[index].order;
      const nextOrder = exhibitData[index + 1].order;
      await updateDoc(doc(db, 'exhibits', exhibitId), { order: nextOrder });
      await updateDoc(doc(db, 'exhibits', exhibitData[index + 1].id), { order: newOrder });
      fetchData(); // Refetch the data after update
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
            {exhibitData.sort(sortExhibits).map((exhibit, key) => (
              <ListViewItem
                key={key}
                exhibit={exhibit}
                setEntry={setEntry}
                handleOrderChange={handleOrderChange}
                order={exhibit.order}
                moveUp={() => moveUp(exhibit.id)} // Pass the function for moving up
                moveDown={() => moveDown(exhibit.id)} // Pass the function for moving down
              />
            ))}
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
