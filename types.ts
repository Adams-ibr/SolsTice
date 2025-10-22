// FIX: Changed to named type imports from 'react' to be more explicit and avoid
// potential module resolution issues that could overwrite the global JSX namespace.
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

// FIX: Adding a side-effect import of 'react' to ensure its global JSX namespace is
// loaded before we attempt to augment it. This resolves the issue where `JSX.IntrinsicElements`
// was being overwritten instead of extended.
import 'react';

// FIX: Moved Lottie player type definitions from Preloader.tsx to fix global JSX type issues.
// This ensures the augmentation of JSX.IntrinsicElements happens in a global context
// after React's base types are loaded, resolving errors for standard HTML tags.
export interface LottiePlayerElement extends HTMLElement {
  load(animationData: object): void;
}

// Augmenting the global JSX namespace to make the `lottie-player` custom element available in JSX.
declare global {
  namespace JSX {
    // FIX: The previous declaration of IntrinsicElements was overwriting React's default
    // JSX elements instead of augmenting them. By correctly declaring the interface for
    // augmentation, TypeScript's declaration merging now adds 'lottie-player' to the
    // existing IntrinsicElements without removing standard HTML tags like 'div', 'p', etc.
    interface IntrinsicElements {
      'lottie-player': DetailedHTMLProps<HTMLAttributes<LottiePlayerElement> & {
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
  content: ReactNode;
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
    icon: ReactNode;
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