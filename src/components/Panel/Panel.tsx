import React from 'react';
import './Panel.css';
import { IRetailItem } from '../../service/api';

interface IPanelProps {
  retailItem: IRetailItem;
}

export const Panel: React.FC<IPanelProps> = ({ retailItem }) => {
  // If no retailItem is provided, return null to render nothing
  if (!retailItem) return null;

  return (
    <div className="panel-container">
      <img className="item-image" src={retailItem.image} alt="retail item" />
      <h4>{retailItem.title}</h4>
      <span className="subtitle">{retailItem.subtitle}</span>
      <div className="tags-container">
        {retailItem.tags.map((tag, i) => (
          <div key={i} className="tag">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};
