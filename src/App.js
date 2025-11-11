import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for menu items with ingredients and costs
  const [menuItems, setMenuItems] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  
  // Form states
  const [newItem, setNewItem] = useState({ 
    name: '', 
    price: '', 
    description: '',
    category: 'main',
    preparationTime: ''
  });
  
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    cost: '',
    unit: 'g',
    stock: ''
  });
  
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientQuantities, setIngredientQuantities] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedMenuItems = localStorage.getItem('chefMenuItems');
    const savedIngredients = localStorage.getItem('chefIngredients');
    
    if (savedMenuItems) setMenuItems(JSON.parse(savedMenuItems));
    if (savedIngredients) setIngredients(JSON.parse(savedIngredients));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('chefMenuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('chefIngredients', JSON.stringify(ingredients));
  }, [ingredients]);

  // Add new ingredient
  const addIngredient = () => {
    if (newIngredient.name && newIngredient.cost) {
      const ingredient = {
        id: Date.now(),
        ...newIngredient,
        cost: parseFloat(newIngredient.cost),
        stock: parseFloat(newIngredient.stock) || 0
      };
      setIngredients([...ingredients, ingredient]);
      setNewIngredient({ name: '', cost: '', unit: 'g', stock: '' });
    }
  };

  // Add ingredient to current menu item
  const addIngredientToItem = (ingredientId) => {
    if (!selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients([...selectedIngredients, ingredientId]);
      setIngredientQuantities({
        ...ingredientQuantities,
        [ingredientId]: 0
      });
    }
  };

  // Update ingredient quantity
  const updateIngredientQuantity = (ingredientId, quantity) => {
    setIngredientQuantities({
      ...ingredientQuantities,
      [ingredientId]: parseFloat(quantity) || 0
    });
  };

  // Remove ingredient from current menu item
  const removeIngredientFromItem = (ingredientId) => {
    setSelectedIngredients(selectedIngredients.filter(id => id !== ingredientId));
    const newQuantities = { ...ingredientQuantities };
    delete newQuantities[ingredientId];
    setIngredientQuantities(newQuantities);
  };

  // Calculate total cost for current menu item
  const calculateTotalCost = () => {
    return selectedIngredients.reduce((total, ingredientId) => {
      const ingredient = ingredients.find(i => i.id === ingredientId);
      const quantity = ingredientQuantities[ingredientId] || 0;
      const costPerUnit = ingredient.cost;
      
      // Convert quantity to match ingredient unit if needed
      let cost = 0;
      if (ingredient.unit === 'kg' && quantity > 0) {
        cost = (costPerUnit * quantity) / 1000; // Convert g to kg
      } else {
        cost = costPerUnit * quantity;
      }
      
      return total + cost;
    }, 0);
  };

  // Calculate recommended price (3x cost for 66% profit margin)
  const calculateRecommendedPrice = () => {
    const totalCost = calculateTotalCost();
    return (totalCost * 3).toFixed(2);
  };

  // Calculate profit margin
  const calculateProfitMargin = (price, cost) => {
    if (!price || !cost) return 0;
    return (((price - cost) / price) * 100).toFixed(1);
  };

  // Add new menu item
  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      const totalCost = calculateTotalCost();
      const profitMargin = calculateProfitMargin(parseFloat(newItem.price), totalCost);
      
      const item = {
        id: Date.now(),
        ...newItem,
        price: parseFloat(newItem.price),
        preparationTime: parseInt(newItem.preparationTime) || 0,
        cost: totalCost,
        profitMargin: parseFloat(profitMargin),
        ingredients: selectedIngredients.map(ingredientId => {
          const ingredient = ingredients.find(i => i.id === ingredientId);
          return {
            id: ingredientId,
            name: ingredient.name,
            quantity: ingredientQuantities[ingredientId] || 0,
            unit: ingredient.unit,
            cost: ingredient.cost
          };
        })
      };
      
      setMenuItems([...menuItems, item]);
      
      // Reset form
      setNewItem({ name: '', price: '', description: '', category: 'main', preparationTime: '' });
      setSelectedIngredients([]);
      setIngredientQuantities({});
    }
  };

  // Delete menu item
  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Update ingredient stock
  const updateIngredientStock = (id, newStock) => {
    setIngredients(ingredients.map(ingredient =>
      ingredient.id === id ? { ...ingredient, stock: parseFloat(newStock) } : ingredient
    ));
  };

  // Delete ingredient
  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  // Calculate total menu value
  const calculateTotalMenuValue = () => {
    return menuItems.reduce((total, item) => total + item.price, 0);
  };

  // Calculate total potential profit
  const calculateTotalPotentialProfit = () => {
    return menuItems.reduce((total, item) => total + (item.price - item.cost), 0);
  };

  // Get low stock ingredients
  const getLowStockIngredients = () => {
    return ingredients.filter(ingredient => ingredient.stock < 100); // Less than 100 units
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-utensils"></i>
              <h1>ChefPro Menu Manager</h1>
            </div>
            <div className="stats-summary">
              <div className="stat">
                <span className="value">{menuItems.length}</span>
                <span className="label">Menu Items</span>
              </div>
              <div className="stat">
                <span className="value">${calculateTotalMenuValue().toFixed(2)}</span>
                <span className="label">Total Value</span>
              </div>
              <div className="stat">
                <span className="value">{getLowStockIngredients().length}</span>
                <span className="label">Low Stock</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard">
        <div className="container">
          <div className="dashboard-grid">
            
            {/* Sidebar */}
            <div className="sidebar">
              <h3>Management</h3>
              <ul className="sidebar-menu">
                <li className="active"><i className="fas fa-plus"></i> Add Menu Item</li>
                <li><i className="fas fa-carrot"></i> Ingredients</li>
                <li><i className="fas fa-chart-bar"></i> Analytics</li>
                <li><i className="fas fa-cog"></i> Settings</li>
              </ul>

              {/* Quick Stats */}
              <div className="quick-stats">
                <h4>Quick Stats</h4>
                <div className="stat-item">
                  <span>Avg. Profit Margin:</span>
                  <span className="value">
                    {menuItems.length > 0 
                      ? (menuItems.reduce((sum, item) => sum + item.profitMargin, 0) / menuItems.length).toFixed(1) + '%'
                      : '0%'
                    }
                  </span>
                </div>
                <div className="stat-item">
                  <span>Total Potential Profit:</span>
                  <span className="value">${calculateTotalPotentialProfit().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
              
              {/* Add Menu Item Section */}
              <div className="card">
                <h3><i className="fas fa-plus-circle"></i> Create New Menu Item</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Item Name</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="e.g., Grilled Salmon"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    >
                      <option value="appetizer">Appetizer</option>
                      <option value="main">Main Course</option>
                      <option value="dessert">Dessert</option>
                      <option value="beverage">Beverage</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Preparation Time (min)</label>
                    <input
                      type="number"
                      value={newItem.preparationTime}
                      onChange={(e) => setNewItem({...newItem, preparationTime: e.target.value})}
                      placeholder="e.g., 25"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Selling Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      placeholder="e.g., 24.99"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Describe your dish..."
                    rows="3"
                  />
                </div>

                {/* Ingredients Selection */}
                <div className="ingredients-section">
                  <h4>Ingredients & Cost Calculation</h4>
                  
                  <div className="ingredients-selector">
                    <select 
                      onChange={(e) => addIngredientToItem(parseInt(e.target.value))}
                      defaultValue=""
                    >
                      <option value="">Select Ingredient to Add</option>
                      {ingredients.map(ingredient => (
                        <option key={ingredient.id} value={ingredient.id}>
                          {ingredient.name} (${ingredient.cost}/{ingredient.unit})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Ingredients */}
                  <div className="selected-ingredients">
                    {selectedIngredients.map(ingredientId => {
                      const ingredient = ingredients.find(i => i.id === ingredientId);
                      return (
                        <div key={ingredientId} className="ingredient-item">
                          <span className="ingredient-name">{ingredient.name}</span>
                          <input
                            type="number"
                            placeholder="Quantity"
                            value={ingredientQuantities[ingredientId] || ''}
                            onChange={(e) => updateIngredientQuantity(ingredientId, e.target.value)}
                            min="0"
                            step="0.1"
                          />
                          <span className="ingredient-unit">{ingredient.unit}</span>
                          <span className="ingredient-cost">
                            Cost: ${((ingredientQuantities[ingredientId] || 0) * ingredient.cost).toFixed(2)}
                          </span>
                          <button 
                            className="btn btn-danger small"
                            onClick={() => removeIngredientFromItem(ingredientId)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cost Summary */}
                  <div className="cost-summary">
                    <div className="cost-item">
                      <span>Total Ingredient Cost:</span>
                      <span className="value">${calculateTotalCost().toFixed(2)}</span>
                    </div>
                    <div className="cost-item">
                      <span>Recommended Price (3x cost):</span>
                      <span className="value">${calculateRecommendedPrice()}</span>
                    </div>
                    <div className="cost-item">
                      <span>Profit Margin:</span>
                      <span className="value">
                        {newItem.price 
                          ? calculateProfitMargin(parseFloat(newItem.price), calculateTotalCost()) + '%'
                          : '0%'
                        }
                      </span>
                    </div>
                  </div>

                  <button className="btn btn-primary large" onClick={addMenuItem}>
                    <i className="fas fa-plus"></i> Add Menu Item
                  </button>
                </div>
              </div>

              {/* Ingredients Management */}
              <div className="card">
                <h3><i className="fas fa-carrot"></i> Manage Ingredients</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Ingredient Name</label>
                    <input
                      type="text"
                      value={newIngredient.name}
                      onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                      placeholder="e.g., Salmon Fillet"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Cost per Unit ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newIngredient.cost}
                      onChange={(e) => setNewIngredient({...newIngredient, cost: e.target.value})}
                      placeholder="e.g., 8.50"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Unit</label>
                    <select
                      value={newIngredient.unit}
                      onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                    >
                      <option value="g">Gram (g)</option>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="ml">Milliliter (ml)</option>
                      <option value="L">Liter (L)</option>
                      <option value="piece">Piece</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Current Stock</label>
                    <input
                      type="number"
                      value={newIngredient.stock}
                      onChange={(e) => setNewIngredient({...newIngredient, stock: e.target.value})}
                      placeholder="e.g., 1000"
                    />
                  </div>
                </div>

                <button className="btn btn-primary" onClick={addIngredient}>
                  <i className="fas fa-plus"></i> Add Ingredient
                </button>

                {/* Ingredients List */}
                <div className="ingredients-list">
                  <h4>Available Ingredients</h4>
                  {ingredients.map(ingredient => (
                    <div key={ingredient.id} className="ingredient-row">
                      <span className="name">{ingredient.name}</span>
                      <span className="cost">${ingredient.cost}/{ingredient.unit}</span>
                      <div className="stock-control">
                        <input
                          type="number"
                          value={ingredient.stock}
                          onChange={(e) => updateIngredientStock(ingredient.id, e.target.value)}
                        />
                        <span className="unit">{ingredient.unit}</span>
                      </div>
                      <button 
                        className="btn btn-danger small"
                        onClick={() => deleteIngredient(ingredient.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  {ingredients.length === 0 && (
                    <p className="no-items">No ingredients added yet.</p>
                  )}
                </div>
              </div>

              {/* Menu Items List */}
              <div className="card">
                <h3><i className="fas fa-utensils"></i> Menu Items</h3>
                <div className="menu-items-grid">
                  {menuItems.map(item => (
                    <div key={item.id} className="menu-item-card">
                      <div className="menu-item-header">
                        <h4>{item.name}</h4>
                        <span className="category">{item.category}</span>
                      </div>
                      <p className="description">{item.description}</p>
                      <div className="menu-item-details">
                        <div className="detail">
                          <span>Price:</span>
                          <strong>${item.price}</strong>
                        </div>
                        <div className="detail">
                          <span>Cost:</span>
                          <span>${item.cost.toFixed(2)}</span>
                        </div>
                        <div className="detail">
                          <span>Profit:</span>
                          <span className={`profit ${item.profitMargin >= 60 ? 'high' : item.profitMargin >= 40 ? 'medium' : 'low'}`}>
                            {item.profitMargin}%
                          </span>
                        </div>
                        <div className="detail">
                          <span>Prep Time:</span>
                          <span>{item.preparationTime} min</span>
                        </div>
                      </div>
                      <div className="menu-item-actions">
                        <button 
                          className="btn btn-danger"
                          onClick={() => deleteMenuItem(item.id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {menuItems.length === 0 && (
                    <p className="no-items">No menu items yet. Create your first one above!</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;