export interface UserModel {
  email: string;
  password?: string;
  name?: string;
  google?: boolean;
  facebook?: boolean;
  displayName?: string;
  organization?: string;
  uid: string;
  
  emailVerified: boolean;
  
  photoURL?: string;
  role?: Roles;
}
export type Roles = 'SUSCRIPTOR' | 'EDITOR' | 'ADMIN';