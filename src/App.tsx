import React, { useState, useEffect } from 'react';
import './App.css';

// Types and Interfaces
type CourseType = 'STARTER' | 'MAIN' | 'DESSERT' | 'DRINK' | 'SIDE';

interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: CourseType;
  price: number;
  createdAt: Date;
}

interface Course {
  value: CourseType;
  label: string;
  icon: string;
}

// Constants
const COURSES: Course[] = [
  { value: 'STARTER', label: 'Starters', icon: '🥗' },
  { value: 'MAIN', label: 'Main Courses', icon: '🍖' },
  { value: 'DESSERT', label: 'Desserts', icon: '🍰' },
  { value: 'DRINK', label: 'Drinks', icon: '🍹' },
  { value: 'SIDE', label: 'Sides', icon: '🍟' }
];

const PRICE_RANGE = {
  min: 0,
  max: 1000,
  step: 0.5
};

function App() {
  // State management
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [formData, setFormData] = useState({
    dishName: '',
    description: '',
    course: 'STARTER' as CourseType,
    price: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter menu items based on search
  const filteredMenuItems = menuItems.filter(item =>
    item.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group menu items by course using for...in loop
  const menuByCourse: Record<CourseType, MenuItem[]> = {
    STARTER: [],
    MAIN: [],
    DESSERT: [],
    DRINK: [],
    SIDE: []
  };

  // Using for loop to populate menuByCourse
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    menuByCourse[item.course].push(item);
  }

  // Calculate statistics using while loop
  const calculateStats = () => {
    let totalValue = 0;
    let itemCount = 0;
    
    while (itemCount < menuItems.length) {
      totalValue += menuItems[itemCount].price;
      itemCount++;
    }

    return {
      totalItems: menuItems.length,
      averagePrice: menuItems.length > 0 ? totalValue / menuItems.length : 0,
      totalValue
    };
  };

  const stats = calculateStats();

  // Handle form input changes
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validate form
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

  // Add menu item with animation delay
  const addMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newMenuItem: MenuItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      dishName: formData.dishName.trim(),
      description: formData.description.trim(),
      course: formData.course,
      price: parseFloat(formData.price),
      createdAt: new Date()
    };

    setMenuItems(prev => [newMenuItem, ...prev]);
    
    // Reset form
    setFormData({
      dishName: '',
      description: '',
      course: 'STARTER',
      price: ''
    });

    setIsSubmitting(false);
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  // Get course info
  const getCourseInfo = (course: CourseType) => {
    return COURSES.find(c => c.value === course) || COURSES[0];
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🍽️ Chef's Menu Studio</h1>
            <p>Professional Menu Management System</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{stats.totalItems}</span>
              <span className="stat-label">Total Items</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{formatCurrency(stats.averagePrice)}</span>
              <span className="stat-label">Average Price</span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Add Menu Item Section */}
          <section className="form-section">
            <div className="section-header">
              <h2>Add New Menu Item</h2>
              <p>Create delicious additions to your menu</p>
            </div>
            
            <form onSubmit={addMenuItem} className="menu-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="dishName" className="form-label">
                    Dish Name *
                  </label>
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
                  <div className="character-count">
                    {formData.dishName.length}/50
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="course" className="form-label">
                    Course Category *
                  </label>
                  <div className="course-selector">
                    {COURSES.map((course) => (
                      <button
                        key={course.value}
                        type="button"
                        className={`course-option ${
                          formData.course === course.value ? 'selected' : ''
                        }`}
                        onClick={() => handleInputChange('course', course.value)}
                      >
                        <span className="course-icon">{course.icon}</span>
                        <span className="course-label">{course.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description" className="form-label">
                    Description *
                  </label>
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
                  <div className="character-count">
                    {formData.description.length}/200
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    Price (ZAR) *
                  </label>
                  <div className="price-input-container">
                    <span className="currency-symbol">R</span>
                    <input
                      type="number"
                      id="price"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0.00"
                      min={PRICE_RANGE.min}
                      max={PRICE_RANGE.max}
                      step={PRICE_RANGE.step}
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
          </section>

          {/* Menu Display Section */}
          <section className="menu-section">
            <div className="section-header">
              <div className="section-title">
                <h2>Current Menu</h2>
                <div className="total-count">
                  {stats.totalItems} item{stats.totalItems !== 1 ? 's' : ''} • Total Value: {formatCurrency(stats.totalValue)}
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

            {menuItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <h3>No Menu Items Yet</h3>
                <p>Start building your menu by adding your first dish above!</p>
              </div>
            ) : (
              <div className="menu-display">
                {/* Using for...in loop to iterate through courses */}
                {(Object.keys(menuByCourse) as CourseType[]).map(courseType => {
                  const courseItems = menuByCourse[courseType];
                  const courseInfo = getCourseInfo(courseType);
                  
                  if (courseItems.length === 0) return null;

                  return (
                    <div key={courseType} className="course-section">
                      <div className="course-header">
                        <span className="course-icon-large">{courseInfo.icon}</span>
                        <h3>{courseInfo.label}</h3>
                        <span className="item-count-badge">{courseItems.length}</span>
                      </div>
                      
                      <div className="menu-items-grid">
                        {courseItems.map((item, index) => (
                          <div 
                            key={item.id} 
                            className="menu-item-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
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
                              <span className="item-id">#{item.id.slice(-8)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>© 2024 Chef's Menu Studio • Professional Menu Management</p>
        </div>
      </footer>
    </div>
  );
}

export default App;