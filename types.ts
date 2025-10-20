// Fix: Added type definitions for various data structures used in the application.
import React from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  pricePerTon: string;
  imageUrl: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishDate: string;
}

export interface NavLink {
    name: string;
    path: string;
}

export interface Stat {
    value: string;
    label: string;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
}

export interface Testimonial {
    id: number;
    quote: string;
    author: string;
    company: string;
}
