import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import './LogOutBtn.css'

function LogOutBtn() {
  const navigate = useNavigate();
    const { getLoggedIn } = useContext(AuthContext);


  async function logOut() {
     await axios.get("https://www.optimusmaroc.com/api/v1/auth/logout");
 //   await axios.get(
  //    "https://mern-auth-template-tutorial.herokuapp.com/auth/logout"
  //  );
    await getLoggedIn();
   // history.push("/");
    navigate('/');
  }

  return <button className="LogOutBtn" onClick={logOut}>Log out</button>;
}

export default LogOutBtn
