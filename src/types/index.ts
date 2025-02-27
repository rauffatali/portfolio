// Common type definitions
export interface NavItem {
  title: string;
  path: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
} 