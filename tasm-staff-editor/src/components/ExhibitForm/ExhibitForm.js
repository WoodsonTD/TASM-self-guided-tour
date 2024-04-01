import React, { useState } from 'react';
import QRCodeComponent from '../QRCode/QRCodeComponent.js';
import { db } from '../../firebase.js';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import ExhibitTitle from '../ExhibitTitle/ExhibitTitle.js';
import MediaType from '../MediaType/MediaType.js';
import ExhibitContent from '../ExhibitContent/ExhibitContent.js';
import ReadingLinks from '../ReadingLinks/ReadingLinks.js';
import Button from '../ButtonPanel/Button.js';
import { CheckIcon } from '@heroicons/react/24/outline';


function ExhibitForm(props) {
  const [title, setTitle] = useState('');
  // const [id, setId] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [mediaLink, setMediaLink] = useState('');
  const [audioLink, setAudioLink] = useState('');
  const [content, setContent] = useState('');
  const [articleLink, setArticleLink] = useState(['']);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [fourDigitCode, setFourDigitCode] = useState('');

  const handleChange = (event, index) => {
    const { name, value } = event.target;
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
      case 'articleLink':
        setArticleLink((prevLinks) => {
          const updatedLinks = [...prevLinks];
          updatedLinks[index] = value;
          return updatedLinks;
        });
        break;
      default:
        break;
    }
  };

  const handleAddArticleLink = () => {
    setArticleLink((prevState) => [...prevState, '']);
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
      const qrCodeValue = `http://localhost:3000/exhibit/${docRef.id}`;
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
    <div className='text-lg'>
      <h1 className="text-white">Exhibit Form</h1>
      <form className="mt-6 mx-14 justify-center rounded-lg px-6 py-10 md:mx-32 lg:mx-36" onSubmit={handleSubmit}>
        <ExhibitTitle title={title} onChange={handleChange} />
        <MediaType
          mediaType={mediaType}
          mediaLink={mediaLink}
          onChange={handleChange}
        />
        <div>
          <QRCodeComponent value={qrCodeValue} fourDigitCode={fourDigitCode} />
        </div>
        <ExhibitContent content={content} onChange={handleChange} />
        <ReadingLinks
          articleLink={articleLink}
          onChange={handleChange}
          onAddArticleLink={handleAddArticleLink}
        />
        <Button
          label="Submit"
          onClick={() => console.log('Submit clicked')}
          icon={CheckIcon}
          iconProps={{ className: "w-7 h-7" }}
          iconPosition="left"
          className="btn rounded-full pl-3 pr-4 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
        />
      </form>
    </div>
  );
}

export default ExhibitForm;
