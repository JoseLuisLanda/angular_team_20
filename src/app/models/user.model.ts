export interface UserModel {
  email: string;
  password?: string;
  name?: string;
  google?: boolean;
  facebook?: boolean;
  displayName?: string;
  organization?: string;
}
