export type Role = 'vip' | 'client' | 'user';
export type Roles = ['vip', 'client'] | ['client'] | ['user'];

export interface User {
  email: string;
  name?: string;
  roles?: Roles;
}
