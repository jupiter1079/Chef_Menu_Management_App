import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMenuItems } from './hooks/useMenuItems';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ManagementPage from './pages/ManagementPage';
import GuestViewPage from './pages/GuestViewPage';
import './App.css';

// Constants (moved from original App.tsx)
export const COURSES = [
  { value: 'STARTER', label: 'Starters', icon: '🥗' },
  { value: 'MAIN', label: 'Main Courses', icon: '🍖' },
  { value: 'DESSERT', label: 'Desserts', icon: '🍰' },
  { value: 'DRINK', label: 'Drinks', icon: '🍹' },
  { value: 'SIDE', label: 'Sides', icon: '🍟' }
] as const;

function App() {
  // This provides the context for all pages
  useMenuItems();

  return (
    <Router>
      <div className="app">
        <Navigation />
        
        <main className="app-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manage" element={<ManagementPage />} />
              <Route path="/guest" element={<GuestViewPage />} />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>© 2024 Chef's Menu Studio • Professional Menu Management</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;