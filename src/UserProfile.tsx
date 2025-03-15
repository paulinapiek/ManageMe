import React from "react";
import { UserManager } from "./UserManager";

const UserProfile = () => {
  const userManager = new UserManager();
  const user = userManager.getUser();

  return (
    <div>
      <h2>Zalogowany użytkownik:</h2>
      <p>{user.firstName} {user.lastName}</p>
    </div>
  );
};

export default UserProfile;
