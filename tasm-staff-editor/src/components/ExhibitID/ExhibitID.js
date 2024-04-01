import React, { useState } from 'react';

export default function ExhibitID() {
    const [id, setId] = useState('');

    const handleChange = (event) => {
        setId(event.target.value);
    };

    return (
        <label className='block mb-4'>
            ID:
            <input
                type="text"
                name="id"
                value={id}
                onChange={handleChange}
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6"
            />
        </label>
    );
}
