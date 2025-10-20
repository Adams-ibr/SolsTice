import React from 'react';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  pricePerTon: string;
  imageUrl: string;
  gallery: string[];
  origin: string;
  specifications: { key: string; value: string }[];
  packaging: string[];
  shippingTerms: string;
  harvestSeason: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: React.ReactNode;
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