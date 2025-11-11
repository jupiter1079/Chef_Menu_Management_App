import React from 'react';
import { MenuStats, CourseType, Course } from '../types';
import { formatCurrency } from '../utils/helpers';
import { COURSES } from '../App';

interface StatisticsProps {
  stats: MenuStats;
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="statistics-section">
      <h3>Menu Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card main-stat">
          <span className="stat-number">{stats.totalItems}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-card main-stat">
          <span className="stat-number">{formatCurrency(stats.averagePrice)}</span>
          <span className="stat-label">Average Price</span>
        </div>
        <div className="stat-card main-stat">
          <span className="stat-number">{formatCurrency(stats.totalValue)}</span>
          <span className="stat-label">Total Value</span>
        </div>
      </div>

      <div className="course-stats">
        <h4>Average Prices by Course</h4>
        <div className="course-stats-grid">
          {COURSES.map(course => (
            <div key={course.value} className="course-stat-card">
              <span className="course-stat-icon">{course.icon}</span>
              <div className="course-stat-info">
                <span className="course-stat-label">{course.label}</span>
                <span className="course-stat-price">
                  {formatCurrency(stats.averageByCourse[course.value])}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;