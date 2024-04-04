import React from 'react';

export default function ExhibitTitle({ title, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="title" className='text-white'>
        Title:
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="title"
          placeholder="Exhibit Title"
          id="title"
          value={title}
          onChange={onChange}
          className="input"
        />
      </div>
    </div>
  );
};
