import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function ProvideGithubUserName() {
  const [userName, setUserName] = useState("");
  const { getGithubUser, user } = useContext(UserContext);
  return (
    <div>
      <h2>Github User Name</h2>
      <input
        type="text"
        onChange={(e) => {
          console.log(userName);

          setUserName(e.target.value);
        }}
        value={userName}
        placeholder="github username"
      />
      <button onClick={() => getGithubUser(userName)}>Get</button>
      {!user ? <>loading</> : <>{user?.login ? user.login : "unknown"}</>}
    </div>
  );
}

export default ProvideGithubUserName;
