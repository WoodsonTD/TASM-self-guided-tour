import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import ExhibitTitle from '../ExhibitTitle/ExhibitTitle';
import ModelView from '../AFrame/ModelView';
import ButtonPanel from '../ButtonPanel/ButtonPanel';

export default function ExhibitPage({ exhibitID }) {
  const [exhibit, setExhibit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const exhibitRef = doc(db, 'exhibits', exhibitID);
        const exhibitSnapshot = await getDoc(exhibitRef);

        if (exhibitSnapshot.exists()) {
          setExhibit(exhibitSnapshot.data());
        } else {
          setError('Exhibit not found');
        }

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch exhibit data');
        setLoading(false);
      }
    };

    fetchData();
  }, [exhibitID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  if (!exhibit) {
    console.log('Exhibit not found this is the');
    return <div>Exhibit not found. ID: {exhibitID}</div>;
  }

  return (
    <div className="">
      <ExhibitTitle title={exhibit.title} />
      <ModelView {...exhibit.mediaData} />
      <p>{exhibit.text}</p>
      <FurtherReading furtherReading={exhibit.furtherReading} />
      <ButtonPanel />
    </div>
  );
}

export function FurtherReading({ furtherReading }) {
  return (
    <div className="FurtherReading">
      <h2 className="text-5xl text-black">Further Reading</h2>
      <ul>
        {furtherReading.map((item, index) => (
          <li key={index}>
            <a target="blank" href={item.link}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
