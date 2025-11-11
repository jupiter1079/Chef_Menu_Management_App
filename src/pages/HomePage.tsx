import React from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import { calculateStats, groupMenuByCourse } from '../utils/helpers';
import { Course, CourseType } from '../types';
import Statistics from '../components/Statistics';
import CourseSection from '../components/CourseSection';
import { COURSES } from '../App';

const HomePage: React.FC = () => {
  const { menuItems } = useMenuItems();
  const stats = calculateStats(menuItems);
  
  const menuByCourse = groupMenuByCourse(menuItems);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Menu Overview</h1>
        <p>Complete menu with statistics and analytics</p>
      </div>

      {/* ✅ REQUIREMENT 1: Average prices by course displayed on home screen */}
      <Statistics stats={stats} />

      <section className="menu-section">
        <div className="section-header">
          <h2>Full Menu</h2>
          <div className="total-count">
            {stats.totalItems} item{stats.totalItems !== 1 ? 's' : ''}
          </div>
        </div>

        {menuItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>No Menu Items Yet</h3>
            <p>Visit the management page to add dishes to your menu!</p>
          </div>
        ) : (
          <div className="menu-display">
            {(Object.keys(menuByCourse) as CourseType[]).map(courseType => {
              const courseItems = menuByCourse[courseType];
              const courseInfo = COURSES.find(c => c.value === courseType) || COURSES[0];
              
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

export default HomePage;