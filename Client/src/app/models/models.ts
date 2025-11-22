export interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  province?: string;
  phoneNumber?: string;
  email?: string;
  establishedDate: Date;
  isActive: boolean;
  pastors?: Pastor[];
}

export interface Pastor {
  id: number;
  firstName: string;
  lastName: string;
  title?: string;
  bio?: string;
  email?: string;
  phoneNumber?: string;
  photoUrl?: string;
  ordainedDate?: Date;
  isActive: boolean;
  branchId: number;
  branch?: Branch;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  eventDate: Date;
  endDate?: Date;
  location?: string;
  imageUrl?: string;
  type: EventType;
  status: EventStatus;
  createdAt: Date;
  updatedAt?: Date;
  branchId?: number;
  branch?: Branch;
}

export enum EventType {
  General = 0,
  Service = 1,
  Prayer = 2,
  Youth = 3,
  Women = 4,
  Men = 5,
  Children = 6,
  Conference = 7,
  Outreach = 8,
  Other = 9
}

export enum EventStatus {
  Upcoming = 0,
  Completed = 1,
  Cancelled = 2
}

export interface ChurchInfo {
  id: number;
  mission: string;
  vision: string;
  beliefs: string;
  history?: string;
  contactEmail?: string;
  contactPhone?: string;
  foundedDate?: Date;
  heroVideoUrl?: string;
  updatedAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  fullName: string;
  email: string;
}

export interface Highlight {
  id: number;
  title: string;
  description?: string;
  type: HighlightType;
  mediaUrl: string;
  thumbnailUrl?: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export enum HighlightType {
  Image = 0,
  Video = 1
}

export interface Testimony {
  id: number;
  name?: string;
  testimony: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
