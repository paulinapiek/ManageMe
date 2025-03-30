export type Role = "admin" | "developer" | "devops";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export class UserManager {
  private users: User[] = [
    { id: "1", firstName: "Jan", lastName: "Kowalski", role: "admin" },
    { id: "2", firstName: "Anna", lastName: "Nowak", role: "developer" },
    { id: "3", firstName: "Piotr", lastName: "Wiśniewski", role: "devops" },
  ];

  private currentUserId: string = "2";

  getUser(): User | null {
    const user = this.users.find(user => user.id === this.currentUserId);
    return user || null;
  }

  getUsers(): User[] {
    return this.users;
  }

  setCurrentUser(userId: string): void {
    if (!this.users.some(user => user.id === userId)) {
      console.error("Invalid user ID.");
      return;
    }
    this.currentUserId = userId;
  }

  updateRole(userId: string, newRole: Role): void {
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return;
    }
    user.role = newRole;
  }
}
