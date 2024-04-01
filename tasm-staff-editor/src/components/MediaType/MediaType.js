import React from 'react';

export default function MediaType({ mediaType, mediaLink, onChange }) {

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-col">
        <label htmlFor="media-type" className="mr-2 text-white">
          Media Type:
        </label>
        <select name='mediaType' id="media-type" value={mediaType} onChange={onChange} className='text-darkBlue flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600'>
          <option value='image'>Image</option>
          <option value='video'>Video</option>
          <option value='text'>None</option>
        </select>
      </div>
      {mediaType === 'image' && (
        <div className="flex flex-col mb-4">
          <label htmlFor="upload-image" className="mr-2 text-white">Upload Image:</label>
          <input type="file" name="mediaLink" id="upload-image" onChange={onChange} className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6" />
        </div>
      )}
      {mediaType === 'video' && (
        <div className="flex flex-col mb-4">
          <label htmlFor="add-video-link" className="mr-2 text-white">Add Video Link:</label>
          <input type="text" name="mediaLink" id="add-video-link" value={mediaLink} onChange={onChange} className="flex-1" />
        </div>
      )}
    </div>
  );
}
