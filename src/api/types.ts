export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserResponse {
  code: string;
  data: User[];
  error?: string;
}

export interface Project {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
}

export interface ProjectResponse {
  code: string;
  data: Project[];
  error?: string;
}

export interface Gateway {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
}

export interface GatewayResponse {
  code: string;
  data: Gateway[];
  error?: string;
}

export interface Payment {
  paymentId: string;
  amount: number;
  projectId: string;
  gatewayId: string;
  userIds: string[];
  modified: string;
  created: string;
}

export interface ReportResponse {
  code: string;
  data: Payment[];
  error?: string;
}
