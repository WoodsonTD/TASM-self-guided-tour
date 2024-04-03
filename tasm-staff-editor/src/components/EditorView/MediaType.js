import React from 'react';
import { storage } from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function MediaType({ mediaType, mediaLink, onChange }) {

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `exhibits/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      onChange({ target: { name: 'mediaLink', value: downloadURL } });
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-col">
        <label htmlFor="media-type" className="mr-2 text-white">
          Media Type:
        </label>
        <select
          name='mediaType'
          id="media-type"
          value={mediaType}
          onChange={onChange}
          className='text-darkBlue rounded-md mt-1 border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red'
        >
          <option value='image'>Image</option>
          <option value='video'>Video</option>
          <option value='text'>None</option>
        </select>
      </div>
      {mediaType === 'image' && (
        <div className="flex flex-col mb-4">
          <label className="mr-2 text-white">Upload Image:</label>
          <input
            type="file"
            name="mediaLink"
            accept='image/*'
            onChange={handleImageUpload}
            className="mt-1 text-white"
          />
        </div>
      )}
      {mediaType === 'video' && (
        <div className="flex flex-col mb-4">
          <label className="mr-2 text-white">Add Video Link:</label>
          <input
            type="text"
            name="mediaLink"
            value={mediaLink}
            onChange={onChange}
            className="mt-1 rounded-md"
          />
        </div>
      )}
    </div>
  );
}
