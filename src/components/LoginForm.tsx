import React, { useState } from "react";
import { User } from "../services/UserManager";

const LoginForm: React.FC<{ onLoginSuccess: (token: string, refreshToken: string, user: User) => Promise<void>}> = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error("Nieprawidłowe dane logowania");
      }

      const data = await response.json();
      onLoginSuccess(data.token, data.refreshToken, data.user);
      // kim unzytkownik jest zalogowany, można pobrać jego dane
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Login:</label>
        <input 
          type="text" 
          value={login} 
          onChange={(e) => setLogin(e.target.value)} 
        />
      </div>
      <div>
        <label>Hasło:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit">Zaloguj</button>
    </form>
  );
};

export default LoginForm;
