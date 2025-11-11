import React, { useState } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import { calculateStats, groupMenuByCourse } from '../utils/helpers';
import { CourseType } from '../types';
import MenuForm from '../components/MenuForm';
import CourseSection from '../components/CourseSection';
import { COURSES } from '../App';

const ManagementPage: React.FC = () => {
  const { menuItems, addMenuItem, removeMenuItem, clearAllMenuItems } = useMenuItems();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const stats = calculateStats(menuItems);
  const menuByCourse = groupMenuByCourse(menuItems);

  const handleAddItem = async (formData: any) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addMenuItem(formData);
    setIsSubmitting(false);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all menu items? This action cannot be undone.')) {
      clearAllMenuItems();
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Menu Management</h1>
        <p>Add, remove, and manage your menu items</p>
      </div>

      <div className="management-layout">
        {/* ✅ REQUIREMENT 2: Separate screen for adding menu items */}
        <section className="form-section">
          <div className="section-header">
            <h2>Add New Menu Item</h2>
            <p>Create delicious additions to your menu</p>
          </div>
          
          <MenuForm onSubmit={handleAddItem} isSubmitting={isSubmitting} />
        </section>

        <section className="menu-section">
          <div className="section-header">
            <div className="section-title">
              <h2>Current Menu Items</h2>
              <div className="total-count">
                {stats.totalItems} item{stats.totalItems !== 1 ? 's' : ''}
              </div>
            </div>
            
            {menuItems.length > 0 && (
              <button 
                className="clear-all-button"
                onClick={handleClearAll}
              >
                🗑️ Clear All
              </button>
            )}
          </div>

          {menuItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No Menu Items Yet</h3>
              <p>Start building your menu by adding your first dish!</p>
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
                    onRemoveItem={removeMenuItem}
                    showDeleteButton={true}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ManagementPage;