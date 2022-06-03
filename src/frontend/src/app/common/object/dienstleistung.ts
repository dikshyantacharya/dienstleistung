import { User } from './user';

export interface Dienstleistung {
  id: number;
  userEmail: string;
  title: string;
  description: string;
  pricing: string;
  userEntity: User;
  shared: boolean;
}
