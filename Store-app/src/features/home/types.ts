export interface Category {
    id: number;
    label: string;
    emoji: string;
    count: number;
  }
   
  export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    badge: string;
    badgeColor: string;
    emoji: string;
    bg: string;
  }