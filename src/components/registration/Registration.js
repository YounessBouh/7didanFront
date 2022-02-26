import React,{useState,useContext} from "react";
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Registration'

function Registration() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const { getLoggedIn } = useContext(AuthContext);
    const { loggedIn } = useContext(AuthContext);



    const addRequest=async (e)=>{ 
        e.preventDefault()
       
        try{
            if(username.trim() === "" || password.trim() === "") 
             return alert('username or password is empty')

             if(username.length < 4 || password.length < 6) 
             return alert('username should be min 4 characters and password min 6 characters ')
          
             async function authenticate(){
                await  axios.post('https://7didan.com/api/v1/auth/register',{name:username,password:password}
                )
               }  
              
        authenticate();
        await getLoggedIn();
        navigate("/");     

        }catch(err)
        {
            console.error(err);
        }
       }

   
    return (
        <div>
        {loggedIn===false && navigate("/")}
        <div className='createItem'>
        <input value={username} className='username__option' minLength="4"
         style={{fontSize:'22px',fontWeight:'bold'}} placeholder="username"
         onChange={(e) => setUserName(e.target.value)} required />

         <input value={password} className='password__option' type="password" minLength="6"
          style={{fontSize:'22px',fontWeight:'bold'}} placeholder="password with min 6 characters"
          onChange={(e) => setPassword(e.target.value)} required />

        <Button size="large" variant="contained" color="primary" onClick={addRequest} 
        style={{fontSize:'18px',fontWeight:'bold'}} > إظافة عنصر جديد</Button>
        </div>
        </div>
    )
}

export default Registration

