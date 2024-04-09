import React, { useEffect, useState } from 'react';
import QRCodeComponent from './QRCodeComponent.js';
import { db } from '../../firebase.js';
import { updateDoc, getDoc, doc } from 'firebase/firestore';
import ExhibitTitle from './ExhibitTitle.js';
import MediaType from './MediaType.js';
import ExhibitContent from './ExhibitContent.js';
import ReadingLinks from './ReadingLinks.js';
import Button from '../ButtonPanel/Button.js';
import { CheckIcon } from '@heroicons/react/24/outline';


function ExhibitForm({ entry, setEntry, handleDelete }) {
  const [title, setTitle] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [mediaLink, setMediaLink] = useState('');
  const [audioLink, setAudioLink] = useState('');
  const [content, setContent] = useState('');
  const [articleLink, setArticleLink] = useState([{ title: '', link: '' }]);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [exhibitID, setExhibitID] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false); // State for adding a new exhibit
  const [formError, setFormError] = useState('');


  // The document reference for the exhibit
  const [docRef, setDocRef] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'exhibits', entry);
        const docSnap = (await getDoc(docRef)).data();
        setTitle(docSnap.title);
        setMediaType(docSnap.mediaType || 'image');
        setMediaLink(docSnap.mediaLink);
        setAudioLink(docSnap.audioLink);
        setContent(docSnap.content);
        setArticleLink(docSnap.articleLink || [{ title: '', link: '' }]);
        setExhibitID(docSnap.exhibitID || // Generate a unique 4-digit code
          (Math.floor(1000 + Math.random() * 9000).toString()));


        setDocRef(docRef);
      }
      catch (error) {
        console.error('Error fetching exhibit data: ', error);
      }
    };
    fetchData();
  }
    , [entry]);

  useEffect(() => {
    const qrCodeValue = `https://tasm-staff-editor.web.app/?exhibitID=${exhibitID}`;
    setQrCodeValue(qrCodeValue);
  }, [exhibitID]);


  const handleChange = (event) => {

    const { name, value } = event.target;

    if (name === 'articleLink') {
      // Directly use the value from the event since it's already the updated array
      setArticleLink(value);
    } else {
      // Handle other inputs based on their names
      switch (name) {
        case 'title':
          setTitle(value);
          break;
        case 'mediaType':
          setMediaType(value);
          break;
        case 'mediaLink':
          setMediaLink(value);
          break;
        case 'audioLink':
          setAudioLink(value);
          break;
        case 'content':
          setContent(value);
          break;
        default:
          console.error('Invalid input name:', name);
          break;
      }
    }
  };

  const handleAddArticleLink = () => {
    setArticleLink([...articleLink, { title: '', link: '' }]);
  };

  const handleRemoveArticleLink = (indexToRemove) => {
    // If there's only one link, clear the fields instead of removing
    if (articleLink.length === 1) {
      setArticleLink([{ title: '', link: '' }]);
    } else {
      // Otherwise, remove the link at the specified index
      setArticleLink(articleLink.filter((_, index) => index !== indexToRemove));
    }
  };

  const validateForm = () => {
    let errorMessage = "";

    if (!title || !title.trim()) {
      errorMessage += "Title is required.\n";
    }
    if (!content || !content.trim()) {
      errorMessage += "Content is required.\n";
    }

    setFormError(errorMessage); // Set the composed error message
    return !errorMessage; // If there is an error message, return false
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    // Call the validateForm function and stop submission if any checks fail
    if (!validateForm()) {
      return;
    }

    try {
      // Generate the URL or identifier for the QR code
      const qrCodeValue = `https://tasm-staff-editor.web.app/?exhibitID=${exhibitID}`;
      setQrCodeValue(qrCodeValue);
      const exhibitData = {
        title,
        mediaType,
        mediaLink,
        audioLink,
        content,
        articleLink,
        exhibitID,
        qrCodeValue,
      };
      // Update the exhibit data in Firestore with the 4-digit code
      await updateDoc(docRef, exhibitData);

    } catch (error) {
      console.error('Error saving exhibit data:', error);
    }
  };

  // When resetting the form, clear all fields and generate a new exhibit ID
  const handleReset = () => {
    setTitle('');
    setMediaType('image');
    setMediaLink('');
    setAudioLink('');
    setContent('');
    setArticleLink([{ title: '', link: '' }]);
    setExhibitID(Math.floor(1000 + Math.random() * 9000).toString());
  };

  // When adding a new exhibit, call this function to reset the form and set the state
  const handleAddNewExhibit = () => {
    handleReset();
    setIsAddingNew(true);
  };

  return (
    <div className='flex flex-col items-center justify-center text-lg'>
      <h1 className="text-2xl text-white">Exhibit Form</h1>
      <form className="w-full max-w-4xl mx-4 md:mx-8 lg:mx-12 xl:mx-16 px-6 pb-10 pt-6" onSubmit={handleSubmit}>
        <ExhibitTitle title={title} onChange={handleChange} />
        <div className="qrContainer">
          <MediaType
            mediaType={mediaType}
            mediaLink={mediaLink}
            onChange={handleChange}
          />
          <QRCodeComponent value={qrCodeValue} exhibitID={exhibitID} />
        </div>
        <ExhibitContent content={content} onChange={handleChange} />
        <ReadingLinks
          articleLink={articleLink}
          onChange={handleChange}
          onAddArticleLink={handleAddArticleLink}
          onRemoveArticleLink={handleRemoveArticleLink}
        />
        <div className="flex justify-center mt-6">
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          <Button
            label="Submit"
            type='submit'
            onClick={handleSubmit}
            icon={CheckIcon}
            iconProps={{ className: "w-7 h-7" }}
            iconPosition="left"
            className="btn rounded-full pl-3 pr-4 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          />
          {/* Cancel Button */}
          <Button
            label="Cancel"
            className="btn rounded-full pl-3 pr-4 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
            onClick={() => {
              // Clear form fields
              setTitle('');
              setMediaType('image');
              setMediaLink('');
              setAudioLink('');
              setContent('');
              setArticleLink([{ title: '', link: '' }]);
              setExhibitID('');
              // If we're adding a new exhibit and decide to cancel, handle deletion if needed
              if (isAddingNew && entry) {
                handleDelete(entry);
              }
              // Update the state to no longer be adding a new exhibit
              setEntry(null);
              setIsAddingNew(false); // This should be passed down from the parent if it's a shared state
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default ExhibitForm;
