import React from 'react';

export default function ReadingLinks({ articleLink = [], onChange, onAddArticleLink }) {
    return (
        <div>
            <p className='text-center text-xl block mb-4'>Additional reading</p>
            {articleLink.map((link, index) => (
                <label key={index} className='block mb-4'>
                    Link:
                    <input
                        type="text"
                        name={`articleLink[${index}]`}
                        value={link}
                        onChange={(event) => onChange(event, index)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightBlue-600 sm:leading-6"
                    />
                </label>
            ))}
            <button type="button" onClick={onAddArticleLink}>
                Add Link
            </button>
        </div>
    );
}
