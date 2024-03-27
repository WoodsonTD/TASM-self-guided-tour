import { React, useState} from 'react';
import logo from '../../assets/images/tasm-logo-p-500.png';

export default function Header({ code='A69Z' }) {
  const [inputValue, setInputValue] = useState(code);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

	return (
		<div className="bg-tasm-header-bg bg-no-repeat bg-cover bg-right-top flex justify-between items-center">
			<div>
				<img src={logo} alt='TASM Logo' className="object-scale-down h-24 m-2" />
			</div>
      <div className="m-4 pr-3 font-exo2 text-center">
        <p className="text-white text-2xl font-bold">Go to Exhibit:</p>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          className="bg-gray text-black w-36 py-0 px-2 rounded-md text-center text-2xl font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-blue transition-all"
        />
      </div>
		</div>
	);
}
