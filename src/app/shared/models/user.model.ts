export interface UserModel {
  email: string;
  password?: string;
  name?: string;
  google?: boolean;
  displayName?: string;
  organization?: string;
  uid: string;
  lastLoginAt?: string;
  emailVerified: boolean;
  refreshToken?: string;
  photoURL?: string;
  role?: Roles;
  rememberme?: boolean;
  url?: string;
  type?: string;
  actividadReciente?: Actividad[];
  dateBirth?: string;
  pais?:string;
  genero?:string;
  linkedin?:string;
  twitter?:string;
  github?:string;
  facebook?:string;
}

export interface Actividad {
  date: string;
  description: string;
}
export type Roles = 'SUSCRIPTOR' | 'EDITOR' | 'ADMIN';
