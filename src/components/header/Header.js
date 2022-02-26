import React,{ useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import LogOutBtn from '../login/LogOutBtn'

import './Header.css'



function Header() {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
    return (
        <div className='header'>
           <div className='header__left' onClick={()=> navigate("/")}>
             <p> ترحب بكم optimusmaroc</p>
           </div>
           {
            loggedIn ? (
              <div className='header__right' onClick={()=> navigate("/DashboardHome")}>
             <p>Dashboard</p>
             </div>
            ) : (
              <div className='header__right' onClick={()=> navigate("/Login")}>
             <p>Login</p>
           </div>
            )
           }
           
           {loggedIn === true &&
            (
              <div className='header__right'>
                <LogOutBtn />
            </div>
            ) 
          }
           
        </div>
    )
}

export default Header
