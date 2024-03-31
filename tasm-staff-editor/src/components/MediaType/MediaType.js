import React, { useState } from 'react';

export default function MediaType(props) {
    const [state, setState] = useState({
        mediaType: 'image',
        mediaLink: ''
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const { mediaType, mediaLink } = state;

    return (
        <div>
            <label>
                Media Type:
                <select name='mediaType' value={mediaType} onChange={handleChange} className='text-darkBlue block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:max-w-xs sm:leading-6'>
                    <option value='image'>Image</option>
                    <option value='video'>Video</option>
                    <option value='text'>None</option>
                </select>
            </label>
            <br></br>
            {mediaType !== 'text' && (
                <label className='block mb-4'>
                    {mediaType === 'image' ? 'Upload Image' : 'Add Video Link'}
                    {mediaType === 'image' && (
                        <input type="file" name="mediaLink" onChange={handleChange} className="upload-image-button block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6" />
                    )}
                    {mediaType === 'video' && (
                        <input type="text" name="mediaLink" value={mediaLink} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6" />
                    )}
                </label>
            )}
        </div>
    );
}
