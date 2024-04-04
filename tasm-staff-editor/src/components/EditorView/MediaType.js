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
    <div className="flex flex-col space-y-12">
      <div className="flex flex-col">
        <label htmlFor="media-type" className="mr-2 text-white">
          Media Type:
        </label>
        <select
          name='mediaType'
          id="media-type"
          value={mediaType}
          onChange={onChange}
          className="dropdown"
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
            className="file-btn mt-1 text-white/80 cursor-pointer bg-darkBlue rounded-full"
          />
        </div>
      )}
      {mediaType === 'video' && (
        <div className="flex flex-col mb-4">
          <label className="mr-2 text-white">Add Video Link:</label>
          <input
            type="text"
            name="mediaLink"
            placeholder="Video Link"
            value={mediaLink}
            onChange={onChange}
            className="mt-1 input placeholder:text-gray-400"
          />
        </div>
      )}
    </div>
  );
}
