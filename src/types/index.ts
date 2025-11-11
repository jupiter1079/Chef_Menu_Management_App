export type CourseType = 'STARTER' | 'MAIN' | 'DESSERT' | 'DRINK' | 'SIDE';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: CourseType;
  price: number;
  createdAt: Date;
}

export interface Course {
  value: CourseType;
  label: string;
  icon: string;
}

export interface MenuStats {
  totalItems: number;
  averagePrice: number;
  totalValue: number;
  averageByCourse: Record<CourseType, number>;
}