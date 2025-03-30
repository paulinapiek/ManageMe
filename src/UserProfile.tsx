import React from "react";
import { UserManager } from "./UserManager";

const UserProfile = () => {
  const userManager = new UserManager();
  const user = userManager.getUser();

  if (!user) {
    // Fallback UI when no user is found
    return (
      <div>
        <h2>Brak zalogowanego użytkownika</h2>
        <p>Proszę zalogować się, aby zobaczyć szczegóły użytkownika.</p>
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
