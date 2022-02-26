import React,{useState,useContext} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AuthContext from '../../context/AuthContext'
import Input from '@mui/material/Input';
import DeleteIcon from '@mui/icons-material/Delete';
import './UpdateAdmin.css'

function UpdateAdmin() {
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    const nameVal=localStorage.getItem('name');
    const [role,setRole]= useState(localStorage.getItem('role'));
    const id= localStorage.getItem('id');

    console.log(nameVal);
    console.log(id);

    const updateRequest=()=>{ 
      if(role.trim() === "") return alert('is empty')
      console.log(role)
       async function updateAdmin(){
        await  axios.put(`https://7didan.com/api/v1/auth/update/${id}`,{role:role}).then((response) => {
           });
       }  
        updateAdmin();
       localStorage.clear();
       window.location.href='/Admins'
     }

     const updateRole=(e)=>{
         if(e.target.value.trim!==''){
            setRole(e.target.value)
         }
         else{
             alert('cannot make it empty')
         }
        
     }
     
    return (
        <div className='updateItem'>
        {loggedIn===false && navigate("/")}
         <Input defaultValue={nameVal} className='categoryName' 
           style={{fontSize:'22px',fontWeight:'bold'}}  readOnly required />
        
           <Input defaultValue={role} className='categoryName' 
           style={{fontSize:'22px',fontWeight:'bold'}}  readOnly required />  
           
           <select style={{fontSize:'18px',fontWeight:'bold',height:'40px',marginRight:'10px'}}  name='phone'
             onChange={updateRole}  >
          <option value=''> change user role</option>
          <option value='admin' > admin </option>
          <option value='user'> user </option>
         
        </select> 
 
         <Button size="large" variant="contained" color="primary" onClick={updateRequest} 
         style={{fontSize:'18px',fontWeight:'bold'}} startIcon={<DeleteIcon />}> تعديل العنصر</Button>   
     </div>
    )
}

export default UpdateAdmin
