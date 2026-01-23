
import { UserRole } from '../../auth/auth.types';

export interface BrandConfig {
  name: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  theme: "light" | "dark";
  font?: string;
}

export interface HotelSettings {
  id: string;
  name: string;
  address: string;
  city: string;
  timezone: string;
  currency: string;
  contactEmail: string;
  contactPhone: string;
  brand: BrandConfig;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  lastLogin?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  role: UserRole;
}
