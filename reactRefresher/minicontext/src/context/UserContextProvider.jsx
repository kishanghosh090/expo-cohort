import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  async function getGithubUser(userName) {
    console.log(userName);

    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.clone().json();
    setUser(data);
  }
  return (
    <UserContext.Provider
      value={{
        user,
        getGithubUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
