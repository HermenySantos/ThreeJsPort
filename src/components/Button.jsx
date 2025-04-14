import React from 'react';

const Button = ({ name, isBeam = false, customStyles, containerClass, bgClass, icon }) => {
  const handleClick = () => {
    // Track button clicks in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'button_click', {
        event_category: 'engagement',
        event_label: name,
      });
    }
  };

  return (
    <button className={`btn ${containerClass}`} onClick={handleClick}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="btn-ping"></span>
          <span className="btn-ping_dot"></span>
        </span>
      )}
      {icon && icon.position === 'left' && <img src={icon.src} alt={icon.alt} className="w-4 h-4 mr-2" />}
      {name}
      {icon && icon.position === 'right' && <img src={icon.src} alt={icon.alt} className="w-4 h-4 ml-2" />}
    </button>
  );
};

export default Button;
