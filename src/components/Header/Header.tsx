import React from 'react';
import stackline from '../../assets/stackline.png';
import './Header.css';

export const Header = () => {
  return (
    <div className="header">
      <img src={stackline} alt="Logo" />
    </div>
  );
};
