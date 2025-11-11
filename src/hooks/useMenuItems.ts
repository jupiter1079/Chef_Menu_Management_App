import { useState } from "react";
import { MenuItem } from "../types";

// In your hooks/useMenuItems.ts
export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // Make sure this has proper error handling
  const addMenuItem = (item: MenuItem) => {
    // implementation
  };
  
  const removeMenuItem = (id: string) => {
    // implementation
  };
  
  const clearAllMenuItems = () => {
    // implementation
  };

  return { menuItems, addMenuItem, removeMenuItem, clearAllMenuItems };
};