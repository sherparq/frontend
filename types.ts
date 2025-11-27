export interface Project {
  id: string;
  title: string;
  category: string;
  metric: string;
  image: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  bullets: string[];
  image: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}