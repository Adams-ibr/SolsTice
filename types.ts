import React from 'react';

// FIX: Moved Lottie player type definitions from Preloader.tsx to fix global JSX type issues.
// This ensures the augmentation of JSX.IntrinsicElements happens in a global context
// after React's base types are loaded, resolving errors for standard HTML tags.
export interface LottiePlayerElement extends HTMLElement {
  load(animationData: object): void;
}

// Augmenting the global JSX namespace to make the `lottie-player` custom element available in JSX.
declare global {
  namespace JSX {
    // FIX: Removed `extends React.JSX.IntrinsicElements` to correctly augment the
    // global interface via declaration merging. Using `extends` was incorrectly
    // replacing the original `IntrinsicElements` definition.
    interface IntrinsicElements {
      'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<LottiePlayerElement> & {
        src?: string;
        background?: string;
        speed?: string;
        loop?: boolean;
        autoplay?: boolean;
      }, LottiePlayerElement>;
    }
  }
}


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

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  socials: {
    linkedin: string;
    twitter: string;
  };
}