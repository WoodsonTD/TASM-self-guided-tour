import { React, useState} from 'react';
import logo from '../../assets/images/tasm-logo-p-500.png';
import {ChevronRightIcon} from '@heroicons/react/24/outline';
import Button from '../ButtonPanel/Button';

export default function Header({ exhibitID, setExhibitID }) {
  const [inputValue, setInputValue] = useState(exhibitID);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  }

	return (
		<div className="bg-tasm-header-bg bg-no-repeat bg-cover bg-right-top flex justify-between items-center">
			<div>
				<img src={logo} alt='TASM Logo' className="object-scale-down h-24 m-2" />
			</div>
      <div className="m-4 pr-3 font-exo2 text-center">
        <p className="text-white text-2xl font-bold">Go to Exhibit:</p>
        <div className='flex'>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={console.log(inputValue)}
          className="bg-gray text-black w-24 py-1 px-2 rounded-l-md text-center text-2xl font-bold drop-shadow-[-2px_3px_4px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-blue transition-all"
        />
        <Button 
          className="btn rounded-r-md pr-1 pl-3 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-blue transition-all"
          onClick={() => setExhibitID(inputValue)}
          icon={ChevronRightIcon}
          iconProps={{ className: "w-7 h-7" }}
          iconPosition="right"
        >
          
        </Button>
        </div>
      </div>
		</div>
	);
}
