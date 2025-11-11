import React from 'react';
import { MenuItem, Course } from '../types';
import { formatCurrency } from '../utils/helpers';

interface MenuItemCardProps {
  item: MenuItem;
  courseInfo: Course;
  onRemove?: (id: string) => void;
  showDeleteButton?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  courseInfo, 
  onRemove, 
  showDeleteButton = false 
}) => {
  return (
    <div className="menu-item-card">
      <div className="card-header">
        <h4 className="dish-name">{item.dishName}</h4>
        <div className="price-tag">
          {formatCurrency(item.price)}
        </div>
      </div>
      
      <div className="card-body">
        <p className="dish-description">{item.description}</p>
      </div>
      
      <div className="card-footer">
        <span className="course-badge">
          {courseInfo.icon} {courseInfo.label}
        </span>
        <div className="card-actions">
          <span className="item-id">#{item.id.slice(-8)}</span>
          {showDeleteButton && onRemove && (
            <button 
              className="delete-button"
              onClick={() => onRemove(item.id)}
              title="Remove item"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;