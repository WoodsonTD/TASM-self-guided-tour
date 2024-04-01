import React, { useState } from 'react';
import QRCodeComponent from '../QRCode/QRCodeComponent.js';
import { db } from '../../firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import ExhibitTitle from '../ExhibitTitle/ExhibitTitle.js';
// import ExhibitID from '../ExhibitID/ExhibitID.js';
import MediaType from '../MediaType/MediaType.js';
import ExhibitContent from '../ExhibitContent/ExhibitContent.js';
import ReadingLinks from '../ReadingLinks/ReadingLinks.js';

function ExhibitForm(props) {
    const [title, setTitle] = useState('');
    // const [id, setId] = useState('');
    const [mediaType, setMediaType] = useState('None');
    const [mediaLink, setMediaLink] = useState('');
    const [audioLink, setAudioLink] = useState('');
    const [content, setContent] = useState('');
    const [articleLink, setArticleLink] = useState(['']);
    const [qrCodeValue, setQrCodeValue] = useState('');

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
            const qrCodeValue = `http://172.31.131.156:3000/exhibit/${docRef.id}`;
            setQrCodeValue(qrCodeValue);

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
            <h1>Exhibit Form</h1>
            <form className="mt-6 mx-14 justify-center rounded-lg px-6 py-10 md:mx-32 lg:mx-36" onSubmit={handleSubmit}>
                <ExhibitTitle title={title} onChange={handleChange} />
                {/* <ExhibitID onChange={handleChange} /> */}
                <MediaType
                    mediaType={mediaType}
                    mediaLink={mediaLink}
                    onChange={handleChange}
                />
                <ExhibitContent content={content} onChange={handleChange} />
                <ReadingLinks
                    articleLink={articleLink}
                    onChange={handleChange}
                    onAddArticleLink={handleAddArticleLink}
                />
                <button type="submit" name='submit' className="btn rounded-r-full pr-1 pl-3 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]">Submit</button>
            </form>
            <div>
                <h3>Generated QR Code:</h3>
                <QRCodeComponent value={qrCodeValue} />
            </div>
        </div>
    );
}

export default ExhibitForm;
