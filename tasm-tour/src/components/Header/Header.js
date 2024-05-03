import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/tasm-logo-p-500.png';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Button from '../ButtonPanel/Button';

export default function Header() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      if (inputValue.toLowerCase() === 'home') {
        navigate('/home');
      } else {
        navigate(`/exhibit/${inputValue}`);
      }
    }
  };


  // Effect to update input value based on URL changes
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentExhibitId = pathSegments[pathSegments.length - 1];
    if (pathSegments[1] === 'exhibit' && currentExhibitId !== inputValue) {
      setInputValue(currentExhibitId);
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-tasm-header-bg bg-no-repeat bg-cover bg-right-top flex justify-between items-center">
      <img src={logo} alt='TASM Logo' className="object-scale-down h-24 m-2" />
      <div className="m-4 pr-3 font-exo2 text-center">
        <p className="text-white text-2xl font-bold">Go to Exhibit:</p>
        <div className='flex'>
          <input
            type='text'
            value={inputValue || ''}
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
            className="bg-gray text-black w-24 py-1 px-2 rounded-l-md text-center text-2xl font-bold drop-shadow-[-2px_3px_4px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-blue transition-all"
          />
          <Button
            onClick={() => navigate(`/exhibit/${inputValue}`)}
            className="btn rounded-r-md pr-1 pl-3 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-blue transition-all"
            icon={ChevronRightIcon}
            iconProps={{ className: "w-7 h-7" }}
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
}
