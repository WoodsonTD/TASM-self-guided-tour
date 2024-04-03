import React, { useState } from 'react';
import QRCodeComponent from './QRCodeComponent.js';
import { db } from '../../firebase.js';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import ExhibitTitle from './ExhibitTitle.js';
import MediaType from './MediaType.js';
import ExhibitContent from './ExhibitContent.js';
import ReadingLinks from './ReadingLinks.js';
import Button from '../ButtonPanel/Button.js';
import { CheckIcon } from '@heroicons/react/24/outline';


function ExhibitForm() {
  const [title, setTitle] = useState('');
  // const [id, setId] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [mediaLink, setMediaLink] = useState('');
  const [audioLink, setAudioLink] = useState('');
  const [content, setContent] = useState('');
  const [articleLink, setArticleLink] = useState([{ title: '', link: '' }]);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [fourDigitCode, setFourDigitCode] = useState('');

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
          break;
      }
    }
  };

  const handleAddArticleLink = () => {
    setArticleLink([...articleLink, { title: '', link: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const exhibitData = {
        title,
        mediaType,
        mediaLink,
        audioLink,
        content,
        articleLink,
      };
      const docRef = await addDoc(collection(db, 'exhibits'), exhibitData);
      console.log('Exhibit data saved to Firestore');

      // Generate the URL or identifier for the QR code
      const qrCodeValue = `http://localhost:3000/exhibits/${docRef.id}`;
      setQrCodeValue(qrCodeValue);

      // Generate a unique 4-digit code
      setFourDigitCode(Math.floor(1000 + Math.random() * 9000).toString());
      console.log('Generated 4-digit code:', fourDigitCode);

      // Update the exhibit data in Firestore with the 4-digit code
      await updateDoc(docRef, { fourDigitCode });


      // Clear the form fields
      setTitle('');
      setMediaType('None');
      setMediaLink('');
      setAudioLink('');
      setContent('');
      setArticleLink(['']);
    } catch (error) {
      console.error('Error saving exhibit data:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center text-lg'>
      <h1 className="text-2xl text-white">Exhibit Form</h1>
      <form className="w-full max-w-4xl mx-4 md:mx-8 lg:mx-12 xl:mx-16 px-6 py-10" onSubmit={handleSubmit}>
        <ExhibitTitle title={title} onChange={handleChange} />
        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4 mb-4">
          <MediaType
            mediaType={mediaType}
            mediaLink={mediaLink}
            onChange={handleChange}
          />
          <QRCodeComponent value={qrCodeValue} fourDigitCode={fourDigitCode} />
        </div>
        <ExhibitContent content={content} onChange={handleChange} />
        <ReadingLinks
          articleLink={articleLink}
          onChange={handleChange}
          onAddArticleLink={handleAddArticleLink}
        />
        <div className="flex justify-center mt-6">
          <Button
            label="Submit"
            onClick={handleSubmit}
            icon={CheckIcon}
            iconProps={{ className: "w-7 h-7" }}
            iconPosition="left"
            className="btn rounded-full pl-3 pr-4 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          />
        </div>
      </form>
    </div>
  );
}

export default ExhibitForm;