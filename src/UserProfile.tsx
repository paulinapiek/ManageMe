import React, { useState, useEffect } from "react";
import { UserManager } from "./UserManager";
import LoginForm from "./LoginForm";

const UserProfile = () => {
  const userManager = new UserManager();
  const [user, setUser] = useState<any>(null); // Początkowy stan to `null`

  // Pobierz użytkownika po załadowaniu komponentu
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await userManager.getUser(); // Oczekiwanie na rozwiązanie Promise
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleLoginSuccess = async (token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    const currentUser = await userManager.getUser(); // Pobranie użytkownika po zalogowaniu
    setUser(currentUser);
    console.log("Zalogowano pomyślnie:", { token, refreshToken });
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
