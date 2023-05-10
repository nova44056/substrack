import { User } from "firebase/auth";

export interface IAuthContext {
  currentUser: User | null;
}
