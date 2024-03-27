import React from 'react'

class ExhibitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            id: '',
            mediaType: 'None',
            mediaLink: '',
            audioLink: '',
            qrLink: '',
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

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted', this.state);
    }

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
                    QR Link:
                    <input type="text" name="qrLink" value={qrLink} onChange={this.handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
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
        </div>
        )
    }
    }

    export default ExhibitForm;
