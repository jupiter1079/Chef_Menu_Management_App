import React from 'react';
import { MenuItem, CourseType, Course } from '../types';
import MenuItemCard from './MenuItemCard';

interface CourseSectionProps {
  courseType: CourseType;
  courseInfo: Course;
  items: MenuItem[];
  onRemoveItem?: (id: string) => void;
  showDeleteButton?: boolean;
}

const CourseSection: React.FC<CourseSectionProps> = ({ 
  courseType, 
  courseInfo, 
  items, 
  onRemoveItem,
  showDeleteButton = false 
}) => {
  if (items.length === 0) return null;

  return (
    <div className="course-section">
      <div className="course-header">
        <span className="course-icon-large">{courseInfo.icon}</span>
        <h3>{courseInfo.label}</h3>
        <span className="item-count-badge">{items.length}</span>
      </div>
      
      <div className="menu-items-grid">
        {items.map((item, index) => (
          <MenuItemCard
            key={item.id}
            item={item}
            courseInfo={courseInfo}
            onRemove={onRemoveItem}
            showDeleteButton={showDeleteButton}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSection;