export type Role = 'user' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  address?: string;
  location?: [number, number];
  createdAt?: string;
}

export interface Tanker {
  id: string;
  driverName: string;
  numberPlate: string;
  capacityLiters: number;
  status: 'available' | 'busy' | 'maintenance';
  currentLat: number;
  currentLon: number;
  lastUpdated: any;
}

export interface Booking {
  id: string;
  userId: string;
  vendorId?: string;
  tankerId?: string;
  address: string;
  latitude: number;
  longitude: number;
  quantityLiters: number;
  price: number;
  status: 'pending' | 'assigned' | 'on_the_way' | 'delivered' | 'cancelled';
  scheduledTime: any;
  createdAt: any;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: any;
  read: boolean;
}
