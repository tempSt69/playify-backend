export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export interface User {
  _id?: string;
  email: string;
  hash: string;
  role: 'admin' | 'user';
}
