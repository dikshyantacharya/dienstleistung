import { Dienstleistung } from './dienstleistung';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  dienstleistungEntityList: Dienstleistung[];
}
