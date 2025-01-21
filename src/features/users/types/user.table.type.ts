export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: Gender;
  address: string;
  role: Role;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
