import React,{useState,useContext} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext'
import './UpdateNotActiveProfile.css'

function UpdateNotActiveProfile() {

    const id=localStorage.getItem('id');
    const [days,setDays]=useState(localStorage.getItem('days'))
    const [isActive,setIsActive]=useState(localStorage.getItem('isActive'));
    const[fullname,setFullName]=useState(localStorage.getItem('fullname'))
    const[phone,setPhone]=useState(localStorage.getItem('phone'))
    const initialDays={sevenDays:7,onemonth:31,sixMonth:183,oneYear:365} 
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    

     
    async function updateProfile(){
       if(days.trim()==='') return alert('days cannot be empty')
      await  axios.put(`https://www.optimusmaroc.com/api/v1/index/${id}`,{isActive:true,isPaid:true,})
            .then((response) => {
         });
     } 
     
     async function removeProfile(){
      await  axios.delete(`https://www.optimusmaroc.com/api/v1/index/${id}`).then((response) => {
         });
     }  



   const activateProfile=()=>{
      updateProfile();
      localStorage.clear();
      navigate('/NotActiveProfiles')
   }

  const removeRequest=(e)=>{
     removeProfile();
     localStorage.clear();
     navigate('/NotActiveProfiles')
  }


    return (
        <div  className='profileNotActive'>
        {loggedIn===false && navigate("/")}     
        <div className="ProfileNotActive__options__left">
           <p> fullname :  {fullname} </p>
           <p>phone  : {phone}</p>
           <p>Period  : {days}</p>
           <p>is Active : {isActive}</p>
        </div>
       <div  className="ProfileNotActive__options__right">
       
         <Button  size="large" variant="contained" color="primary" 
             onClick={activateProfile}>Activate</Button> 

        <Button  size="large" variant="contained" color="error" 
          onClick={removeRequest}>Remove</Button>  
                  
        </div>   
      </div>   
    )
}

export default UpdateNotActiveProfile
