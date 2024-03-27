import React from 'react';

function Button({ label, className, onClick, icon: Icon, iconProps = {}, iconPosition = 'left', type = 'button' }) {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {iconPosition === 'left' && Icon && <Icon {...iconProps} />}
      {label}
      {iconPosition === 'right' && Icon && <Icon {...iconProps} />}
    </button>
  );
}

export default Button;

