import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
     const loggedInRes = await axios.get("https://www.optimusmaroc.com/api/v1/auth/loggedIn");
  //  const loggedInRes = await axios.get(
   //   "https://mern-auth-template-tutorial.herokuapp.com/auth/loggedIn"
  //  );
    setLoggedIn(loggedInRes.data);
    console.log(loggedInRes.data)
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
