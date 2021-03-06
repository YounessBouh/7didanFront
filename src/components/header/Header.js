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
             <p> optimusmaroc</p>
           </div>

           <div className='header__center' onClick={()=> navigate("/Contact")}>
           <p> طريقة التسجيل </p>
         </div>

           {
            loggedIn ? (
              <div className='header__right' onClick={()=> navigate("/DashboardHome")}>
             <p>Dashboard</p>
             </div>
            ) : (
              <div className='header__right' onClick={()=> navigate("/Login")}>
             <p>Log in</p>
           </div>
            )
           }
           
           {loggedIn === true &&
            (
              <div className='header__rightOption'>
                <LogOutBtn />
            </div>
            ) 
          }
           
        </div>
    )
}

export default Header
