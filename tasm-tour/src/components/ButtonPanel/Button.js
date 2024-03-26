import React from 'react';

function Button({ label, className, onClick, icon, type }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {/* {icon && <FontAwesomeIcon icon={icon} />} {label} */}
    </button>
  );
}

export default Button;

