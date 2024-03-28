import React from 'react'
import QRCode from 'react-qr-code';
import { db } from '../firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

class ExhibitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            id: '',
            mediaType: 'None',
            mediaLink: '',
            audioLink: '',
            content: '',
            articleLink: ['']
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleAddArticleLink = () => {
        this.setState((prevState) => ({
            articleLink: [...prevState.articleLink, '']
        }));
    };

handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const exhibitData = {
            title: this.state.title,
            id: this.state.id,
            mediaType: this.state.mediaType,
            mediaLink: this.state.mediaLink,
            audioLink: this.state.audioLink,
            content: this.state.content,
            articleLink: this.state.articleLink,
        };

        await addDoc(collection(db, 'exhibits'), exhibitData);
        console.log('Exhibit data saved to Firestore');
        // Clear the form or perform any other necessary actions
    } catch (error) {
        console.error('Error saving exhibit data:', error);
    }
};

    render() {
        const { title, id, mediaType, mediaLink, audioLink, qrLink, content, articleLink } = this.state;
        return (
        <div>
            <h1>Exhibit Form</h1>
            <form className="mt-2 flex-column justify-center rounded-lg px-6 py-10" onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={title} onChange={this.handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <div>
                    <label>
                        ID:
                        <input type="text" name="id" value={id} onChange={this.handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                    </label>
                    <label>
                        Media Type:
                        <select name='mediaType' value={mediaType} onChange={this.handleChange} className='text-darkBlue block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:max-w-xs sm:text-sm sm:leading-6'>
                            <option value='image'>Image</option>
                            <option value='video'>Video</option>
                            <option value='audio'>Audio</option>
                            <option value='text'>None</option>
                        </select>
                    </label>
                </div>
                <br></br>
                <label>
                    Media Link:
                    <input type="text" name="mediaLink" value={mediaLink} onChange={this.handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <label>
                    Audio Link:
                    <input type="text" name="audioLink" value={audioLink} onChange={this.handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <label>
                    Content:
                </label>
                <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  onChange={this.handleChange}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  value={content}
                />
                </div>
                <p className='text-center'>Additional reading</p>
                <label>
                    Link:
                    <input type="text" name="articleLink" value={articleLink} onChange={this.handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <label>
                    Link:
                    <input type="text" name="articleLink" value={articleLink} onChange={this.handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <button type="submit" name='new'>New</button>
                <button type="submit" name='submit'>Submit</button>
            </form>
                <div>
                    <h3>Generated QR Code:</h3>
                    <QRCode value={this.state.id} size={256} />
                </div>
        </div>
        )
    }
    }

    export default ExhibitForm;
