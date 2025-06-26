import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { User } from "../services/UserManager"; 

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null); // Początkowy stan to `null`

  // Pobierz użytkownika po załadowaniu komponentu
  useEffect(() => {
    const fetchUser = () => {
      const currentUser = localStorage.getItem("user");
      setUser(currentUser ? JSON.parse(currentUser) : null);
    };

    fetchUser();
  }, []);

  const handleLoginSuccess = async (token: string, refreshToken: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user)); 
    setUser(user);
  };


  if (!user) {
    return (
      <div>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div>
      <h2>Zalogowany użytkownik:</h2>
      <p>Imię i nazwisko: {user.firstName} {user.lastName}</p>
      <p>Rola: {user.role}</p>
       </div>
  );
};

export default UserProfile;
