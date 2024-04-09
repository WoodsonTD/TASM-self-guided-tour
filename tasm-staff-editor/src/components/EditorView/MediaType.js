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
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-14">
      <div className='flex-1'>
        <div className="flex flex-col">
          <label htmlFor="media-type" className="mr-2 text-black">
            Media Type:
          </label>
          <select
            name='mediaType'
            id="media-type"
            value={mediaType}
            onChange={onChange}
            className="dropdown cursor-pointer mb-4 md:mb-16"
          >
            <option value='image'>Image</option>
            <option value='video'>Video</option>
            <option value='text'>None</option>
          </select>
        </div>
        {mediaType === 'image' && (
            <div className="flex flex-col">
              <label className="mr-2 text-black">Upload Image:</label>
              <input
                type="file"
                name="mediaLink"
                accept='image/*'
                onChange={handleImageUpload}
                className="file-btn mt-1 text-white/80 cursor-pointer bg-darkBlue rounded-full drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
              />
            </div>
        )}
        {mediaType === 'video' && (
          <div className="flex flex-col">
            <label className="mr-2 text-black">Add Video Link:</label>
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
      {mediaType === 'image' && mediaLink && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <img src={mediaLink} alt="Uploaded" className="w-36 h-36 object-cover rounded-md drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]" />
          <a href={mediaLink} target="_blank" rel="noopener noreferrer" className="imageLink">View Image</a>
        </div>
      )}
    </div>
  );
}
