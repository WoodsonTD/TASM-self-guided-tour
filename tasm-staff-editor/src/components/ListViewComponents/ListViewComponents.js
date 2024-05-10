import { db } from '../../firebase.js';
import { collection, getDocs, addDoc, doc, query, orderBy, writeBatch } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';
import ListViewItem from './ListViewItem.js';
import Button from '../ButtonPanel/Button.js';
import ExhibitForm from '../EditorView/ExhibitForm.js';
import { PlusIcon } from '@heroicons/react/24/outline';

/**
 * @param {*} entry Value of the current exhibit being edited
 * @param {*} setEntry Function to set the entry in the parent component, used to open the edit form
 * @returns ListViewComponent, a list of all exhibits in the database
 */
export default function ListViewComponent({ entry, setEntry }) {
  const [exhibitData, setExhibitData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExhibit, setEditingExhibit] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const exhibitsQuery = query(collection(db, 'exhibits'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(exhibitsQuery);

      const sortedData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      validateOrder(sortedData);
    } catch (error) {
      console.error('ERROR:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, entry]);

  const moveUp = async (exhibitId) => {
    const index = exhibitData.findIndex(exhibit => exhibit.id === exhibitId);
    if (index > 0) {
      const prevOrder = exhibitData[index - 1].order;
      doOrderChange(exhibitData[index], prevOrder);
    }
  };

  const moveDown = async (exhibitId) => {
    const index = exhibitData.findIndex(exhibit => exhibit.id === exhibitId);
    if (index < exhibitData.length - 1) {
      const nextOrder = exhibitData[index + 1].order;
      doOrderChange(exhibitData[index], nextOrder);
    }
  };

  const handleAddExhibit = async () => {
    const exhibitsQuery = query(collection(db, 'exhibits'), orderBy('order', 'desc'));
    const querySnapshot = await getDocs(exhibitsQuery);

    let nextOrder = 0;
    if (!querySnapshot.empty) {
      nextOrder = querySnapshot.docs[0].data().order + 1;
    }

    const newExhibit = {
      title: '',
      exhibitID: '',
      content: '',
      mediaType: 'image',
      mediaLink: '',
      order: nextOrder,
      next: null,
      prev: null,
    };

    const docRef = await addDoc(collection(db, 'exhibits'), newExhibit);
    setEntry(docRef.id);
    setEditingExhibit({ ...newExhibit, id: docRef.id });
    setShowForm(true);
  };

  const handleFormSubmit = async (submittedExhibit) => {
    await fetchData();
    setEntry(submittedExhibit.id);
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setEntry(null);
    setEditingExhibit(null);
    setShowForm(false);
  };

  const handleOrderChange = async (event, movedExhibit) => {
    const newOrder = parseInt(event.target.value);
    doOrderChange(movedExhibit, newOrder);
  };

  const doOrderChange = async (movedExhibit, newOrder) => {
    if (newOrder === movedExhibit.order) {
      return;
    }

    const movedDocRef = doc(db, 'exhibits', movedExhibit.id);
    const querySnapshot = await getDocs(collection(db, 'exhibits'));

    const displacedExhibit = querySnapshot.docs.find(doc => doc.data().order === newOrder);
    const batch = writeBatch(db);

    batch.update(movedDocRef, { order: newOrder });

    if (displacedExhibit) {
      batch.update(displacedExhibit.ref, { order: movedExhibit.order });
    }

    await batch.commit();
    fetchData();
  };

  const validateOrder = async (sortedData) => {
    if (sortedData) {
      const batch = writeBatch(db);
      for (let exhibit of sortedData) {
        const curIndex = sortedData.findIndex((ex) => ex.id === exhibit.id);
        const curDocRef = doc(db, 'exhibits', exhibit.id) || null;
        if (exhibit.order >= 0) {
          const nextExhibit = sortedData[curIndex + 1];
          if (nextExhibit) {
            const nextDocRef = doc(db, 'exhibits', nextExhibit.id) || null;
            batch.update(curDocRef, { next: nextExhibit.exhibitID });
            batch.update(nextDocRef, { prev: exhibit.exhibitID });
          } else {
            batch.update(curDocRef, { next: null });
          }
        } else {
          batch.update(curDocRef, { next: null, prev: null });
        }
      }
      await batch.commit();
      setExhibitData(sortedData);
    }
  };

  const sortExhibits = (a, b) => {
    const orderA = a.order;
    const orderB = b.order;

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
              <th>Exhibit Name</th>
              <th>Exhibit ID</th>
              <th>EDIT</th>
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
                moveUp={() => moveUp(exhibit.id)}
                moveDown={() => moveDown(exhibit.id)}
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
        </div>
      </div>
      {showForm && (
        <ExhibitForm
          entry={editingExhibit?.id}
          setEntry={setEntry}
          isAddingNew={!editingExhibit?.id}
          handleDelete={handleFormCancel}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}
