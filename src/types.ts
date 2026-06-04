export interface SubService {
  name: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  subServices: SubService[];
  benefits: string[];
  iconName: string;
  rolesRecruited?: string[];
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface EngagementStep {
  step: number;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}
