export type Role = "admin" | "developer" | "devops";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  login: string;  
}

export class UserManager {
  
getUser(): User | null {
    const currentUser = localStorage.getItem("user");
    return currentUser ? JSON.parse(currentUser) : null;
  }
}