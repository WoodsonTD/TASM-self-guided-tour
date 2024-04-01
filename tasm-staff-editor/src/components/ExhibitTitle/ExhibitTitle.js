import React from 'react';

export default function ExhibitTitle({ title, onChange }) {
  return (
    <div>
      <label className='block mb-1 text-white'>
        Title:
      </label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6"
      />
    </div>
  );
};
