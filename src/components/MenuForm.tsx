import React, { useState } from 'react';
import { CourseType, Course } from '../types';
import { COURSES } from '../App';

interface MenuFormProps {
  onSubmit: (data: {
    dishName: string;
    description: string;
    course: CourseType;
    price: number;
  }) => void;
  isSubmitting?: boolean;
}

const MenuForm: React.FC<MenuFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    dishName: '',
    description: '',
    course: 'STARTER' as CourseType,
    price: ''
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.dishName.trim()) {
      alert('Please enter a dish name');
      return false;
    }
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Please enter a valid price');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit({
      dishName: formData.dishName.trim(),
      description: formData.description.trim(),
      course: formData.course,
      price: parseFloat(formData.price)
    });

    // Reset form
    setFormData({
      dishName: '',
      description: '',
      course: 'STARTER',
      price: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="menu-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="dishName" className="form-label">Dish Name *</label>
          <input
            type="text"
            id="dishName"
            value={formData.dishName}
            onChange={(e) => handleInputChange('dishName', e.target.value)}
            placeholder="e.g., Grilled Salmon with Lemon Butter"
            className="form-input"
            maxLength={50}
            required
          />
          <div className="character-count">{formData.dishName.length}/50</div>
        </div>

        <div className="form-group">
          <label htmlFor="course" className="form-label">Course Category *</label>
          <div className="course-selector">
            {COURSES.map((course) => (
              <button
                key={course.value}
                type="button"
                className={`course-option ${formData.course === course.value ? 'selected' : ''}`}
                onClick={() => handleInputChange('course', course.value)}
              >
                <span className="course-icon">{course.icon}</span>
                <span className="course-label">{course.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description" className="form-label">Description *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe the ingredients, preparation method, and key features..."
            className="form-input"
            rows={3}
            maxLength={200}
            required
          />
          <div className="character-count">{formData.description.length}/200</div>
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">Price (ZAR) *</label>
          <div className="price-input-container">
            <span className="currency-symbol">R</span>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="0.00"
              min={0}
              max={1000}
              step={0.5}
              className="form-input price-input"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="spinner"></div>
            Adding to Menu...
          </>
        ) : (
          '➕ Add to Menu'
        )}
      </button>
    </form>
  );
};

export default MenuForm;