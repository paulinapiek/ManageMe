export interface User {
    id: string;
    firstName: string;
    lastName: string;
  }
  
  export class UserManager {
    private currentUser: User;
  
    constructor() {
      this.currentUser = {
        id: "1",
        firstName: "Jan",
        lastName: "Kowalski",
      };
    }
  
    getUser(): User {
      return this.currentUser;
    }
  }
  