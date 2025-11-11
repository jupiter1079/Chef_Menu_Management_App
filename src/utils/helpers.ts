import { MenuItem, CourseType, MenuStats } from '../types';

// Format currency function
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount);
};

// Generate unique ID
export const generateId = (): string => {
  return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Calculate statistics including average by course
export const calculateStats = (menuItems: MenuItem[]): MenuStats => {
  let totalValue = 0;
  let itemCount = 0;
  const courseTotals: Record<CourseType, { sum: number; count: number }> = {
    STARTER: { sum: 0, count: 0 },
    MAIN: { sum: 0, count: 0 },
    DESSERT: { sum: 0, count: 0 },
    DRINK: { sum: 0, count: 0 },
    SIDE: { sum: 0, count: 0 }
  };

  while (itemCount < menuItems.length) {
    const item = menuItems[itemCount];
    totalValue += item.price;
    courseTotals[item.course].sum += item.price;
    courseTotals[item.course].count += 1;
    itemCount++;
  }

  const averageByCourse = Object.entries(courseTotals).reduce((acc, [course, data]) => {
    acc[course as CourseType] = data.count > 0 ? data.sum / data.count : 0;
    return acc;
  }, {} as Record<CourseType, number>);

  return {
    totalItems: menuItems.length,
    averagePrice: menuItems.length > 0 ? totalValue / menuItems.length : 0,
    totalValue,
    averageByCourse
  };
};

// Group menu items by course - MAKE SURE THIS IS EXPORTED
export const groupMenuByCourse = (menuItems: MenuItem[]): Record<CourseType, MenuItem[]> => {
  const menuByCourse: Record<CourseType, MenuItem[]> = {
    STARTER: [],
    MAIN: [],
    DESSERT: [],
    DRINK: [],
    SIDE: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    menuByCourse[item.course].push(item);
  }

  return menuByCourse;
};

// Filter menu items by course and search term
export const filterMenuItems = (
  menuItems: MenuItem[], 
  courseFilter: CourseType | 'ALL', 
  searchTerm: string
): MenuItem[] => {
  return menuItems.filter(item => {
    // Filter by course
    const courseMatch = courseFilter === 'ALL' || item.course === courseFilter;
    
    // Filter by search term
    const searchMatch = !searchTerm || 
      item.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return courseMatch && searchMatch;
  });
};