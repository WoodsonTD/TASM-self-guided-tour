import React, { useState } from 'react';

export default function ExhibitContent() {
    const [content, setContent] = useState('');

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    return (
        <div>
            <label htmlFor="content">Content:</label>
            <div className="mt-2">
                <textarea
                    id="content"
                    name="content"
                    onChange={handleChange}
                    rows={3}
                    className="block mb-6 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6"
                    value={content}
                />
            </div>
        </div>
    );
};
