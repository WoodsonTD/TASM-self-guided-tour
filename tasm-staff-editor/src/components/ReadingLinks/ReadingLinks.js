import React from 'react';
import Button from '../ButtonPanel/Button.js';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function ReadingLinks({ articleLink = [], onChange, onAddArticleLink }) {
  return (
    <div>
      <p className='text-center text-white text-xl block mb-4'>Additional reading</p>
      {articleLink.map((link, index) => (
        <div key={index}>
          <label htmlFor="link" className='block mb-1 text-white'>
            Link:
          </label>
          <input
            type="text"
            name={`articleLink[${index}]`}
            id="link"
            value={link}
            placeholder='Add link here'
            onChange={(event) => onChange(event, index)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6"
          />
        </div>
      ))}
      <Button
        label="Add Link"
        onClick={onAddArticleLink}
        icon={PlusIcon}
        iconProps={{ className: "w-7 h-7" }}
        iconPosition="left"
        className="btn rounded-full pl-3 pr-4 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}
