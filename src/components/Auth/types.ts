
export enum ENTITIES {
  USER = 'user'
}

export interface JournalEntry {
  event_type: string;
  entity_id:string;
  entity_type: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  avartar?: string; 
  passwordHash: string;
}

export interface UserWithAccessToken extends Omit<User, 'passwordHash'> {
  accessToken: string;
}

export interface CreateUserEventData {
  id: string;
  email: string;
  passwordHash: string;
  status: number;
}

export interface GetUserRequest {
  accessToken: string,
  id: string
}