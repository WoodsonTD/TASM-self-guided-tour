import React from 'react'

class ExhibitForm extends React.Component {
    render() {
        return (
        <div>
            <h1>Exhibit Form</h1>
            <form className="mt-2 flex-column justify-center rounded-lg px-6 py-10">
                <label>
                    Title:
                    <input type="text" name="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <div>
                    <label>
                        ID:
                        <input type="text" name="id" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                    </label>
                    <label>
                        Media Type:
                        <select name='mediaType' defaultValue='None' className='text-darkBlue block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:max-w-xs sm:text-sm sm:leading-6'>
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
                    <input type="text" name="mediaLink" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <label>
                    Audio Link:
                    <input type="text" name="audioLink" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <label>
                    QR Link:
                    <input type="text" name="qrLink" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <label>
                    Content:
                </label>
                <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
                </div>
                <p className='text-center'>Additional reading</p>
                <label>
                    Link:
                    <input type="text" name="articleLink" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <label>
                    Link:
                    <input type="text" name="articleLink" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:text-sm sm:leading-6" />
                </label>
                <button type="submit" name='new'>New</button>
                <button type="submit" name='submit'>Submit</button>
            </form>
        </div>
        )
    }
    }

    export default ExhibitForm;
