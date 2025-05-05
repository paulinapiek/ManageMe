export type Role = "admin" | "developer" | "devops";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  }

export class UserManager {
  // private users: User[] = [
  //   { id: "1", firstName: "Jan", lastName: "Kowalski", role: "admin" },
  //   { id: "2", firstName: "Anna", lastName: "Nowak", role: "developer" },
  //   { id: "3", firstName: "Piotr", lastName: "Wiśniewski", role: "devops" },
  // ];

  private currentUserId: string = "0";

  async getUser(): Promise<User | null> {
    const token = localStorage.getItem("token"); // Pobranie tokena z localStorage lub innego miejsca przechowywania

    if (!token) {
      throw new Error("Brak tokena autoryzacyjnego");
    }
    const response = await fetch("http://localhost:3000/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    
      // body: JSON.stringify({ "1"}),
    });
    return response.json();
    // const user = this.users.find(user => user.id === this.currentUserId);
    // return user || null;
  }




}
