import React, { useState } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import { groupMenuByCourse, filterMenuItems } from '../utils/helpers';
import { CourseType } from '../types';
import CourseSection from '../components/CourseSection';
import { COURSES } from '../App';

const GuestViewPage: React.FC = () => {
  const { menuItems } = useMenuItems();
  const [selectedCourse, setSelectedCourse] = useState<CourseType | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = filterMenuItems(menuItems, selectedCourse, searchTerm);
  const menuByCourse = groupMenuByCourse(filteredItems);

  const displayedCourses = selectedCourse === 'ALL' 
    ? (Object.keys(menuByCourse) as CourseType[])
    : [selectedCourse];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Our Menu</h1>
        <p>Discover our delicious offerings</p>
      </div>

      <section className="filter-section">
        <div className="filter-controls">
          <div className="course-filter">
            <label>Filter by Course:</label>
            <div className="course-buttons">
              <button
                className={`course-filter-btn ${selectedCourse === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedCourse('ALL')}
              >
                📋 All Courses
              </button>
              {COURSES.map(course => (
                <button
                  key={course.value}
                  className={`course-filter-btn ${selectedCourse === course.value ? 'active' : ''}`}
                  onClick={() => setSelectedCourse(course.value)}
                >
                  {course.icon} {course.label}
                </button>
              ))}
            </div>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </section>

      <section className="menu-section">
        {menuItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>Menu Coming Soon</h3>
            <p>Our chef is preparing something special for you!</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No Items Found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="menu-display">
            {displayedCourses.map(courseType => {
              const courseItems = menuByCourse[courseType];
              const courseInfo = COURSES.find(c => c.value === courseType) || COURSES[0];
              
              if (courseItems.length === 0) return null;

              return (
                <CourseSection
                  key={courseType}
                  courseType={courseType}
                  courseInfo={courseInfo}
                  items={courseItems}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default GuestViewPage;