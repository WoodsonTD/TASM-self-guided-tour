import React from 'react';

export default function ExhibitContent({ content, onChange }) {

  return (
    <div>
      <label htmlFor="content" className="text-white">Content:</label>
      <div className="mt-1">
        <textarea
          id="content"
          name="content"
          onChange={onChange}
          rows={4}
          className="input mb-6"
          value={content}
          style={{ minHeight: '48px', maxHeight: '168px' }}
        />
      </div>
    </div>
  );
};
