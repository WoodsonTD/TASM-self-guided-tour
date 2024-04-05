import React from 'react';

function Button({ label, className, onClick, icon: Icon, iconProps = {}, iconPosition = 'left', type = 'button', ariaLabel, textVisibilityClass = '' }) {
  return (
    <button className={`${className}`} onClick={onClick} type={type} aria-label={ariaLabel || label}>
      {iconPosition === 'left' && Icon && <Icon {...iconProps} />}
      {label && <span className={`${textVisibilityClass}`}>{label}</span>}
      {iconPosition === 'right' && Icon && <Icon {...iconProps} />}
    </button>
  );
}

export default Button;

