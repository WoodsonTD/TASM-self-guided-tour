import React, { useState } from 'react';

export default function ReadingLinks() {
    const [articleLink, setArticleLink] = useState('');

    const handleChange = (e) => {
        setArticleLink(e.target.value);
    };

    return (
        <div>
            <p className='text-center text-xl block mb-4'>Additional reading</p>
            <label className='block mb-4'>
                Link:
                <input
                    type="text"
                    name="articleLink"
                    value={articleLink}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6"
                />
            </label>
            <label className='block mb-4'>
                Link:
                <input
                    type="text"
                    name="articleLink"
                    value={articleLink}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6"
                />
            </label>
        </div>
    );
};
