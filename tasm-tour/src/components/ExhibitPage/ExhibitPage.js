import { useState, useEffect } from 'react';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import ExhibitTitle from '../ExhibitTitle/ExhibitTitle';
import ModelView from '../AFrame/ModelView';
import VideoView from '../VideoView/VideoView';
import ImageView from '../ImageView/ImageView';
import ButtonPanel from '../ButtonPanel/ButtonPanel';

export default function ExhibitPage({ exhibitID, setExhibitID }) {
  const [exhibit, setExhibit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const errorStyle = 'md:w-2/3 m-auto text-center';

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      setExhibit(null);
      try {
        const queryResults = query(collection(db, 'exhibits'), where('exhibitID', '==', exhibitID));
        const exhibitResults = await getDocs(queryResults);
        if (!exhibitResults.empty) {
          const exhibitSnapshot = exhibitResults.docs[0];
          setExhibit(exhibitSnapshot.data());
          if (exhibitResults.size > 1) {
            console.warn("Multiple exhibits found with the same ID: " + exhibitID);
          }
        } else {
          setError('Exhibit not found.\n' + exhibitID);
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch exhibit data.\n" + error);
        setLoading(false);
      }
    };

    fetchData();
  }, [exhibitID]);

  if (loading) {
    return <div className={errorStyle}>Loading...</div>;
  }

  if (error) {
    return <div className={errorStyle} style={{ whiteSpace: "pre-wrap" }}> Error: {error}</div>;
  }


  if (!exhibit) {
    return (
      <div className={errorStyle}>Exhibit not found. ID: {exhibitID}</div>
    );
  }


  console.log("Exhibit loaded successfully!\n" + exhibit);
  let media = null;
  switch (exhibit.mediaType) {
    case 'model':
      media = <ModelView modelID={exhibit.mediaLink} />;
      break;
    case 'video':
      media = <VideoView videoPath={exhibit.mediaLink} />;
      break;
    case 'image':
      media = <ImageView imagePath={exhibit.mediaLink} />;
      break;
    default:
      media = null;
  }


  return (
    <div className="">
      <ExhibitTitle title={exhibit.title} bodyText={exhibit.content} />
      {media}
      <p
        className='text-black text-center md:w-10/12 w-11/12 m-auto p-4 whitespace-pre-wrap'
      >
        {exhibit.content}
      </p>
      {(exhibit.articleLink && !(exhibit.articleLink[0].link === "" || exhibit.articleLink[0].title === "")) ? <FurtherReading articleLink={exhibit.articleLink} /> : null}
      <ButtonPanel setExhibitID={setExhibitID} nextExhibit={exhibit.next} prevExhibit={exhibit.prev} />
    </div>
  );
}

export function FurtherReading({ articleLink }) {
  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-5xl text-black text-center">Further Reading</h2>
      <ul className='text-center list-disc' >
        {articleLink.map((item, index) => (
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
