import React,{useContext} from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

import './DeleteCategory.css'


function DeleteCategory() {

    
    const name=localStorage.getItem('name');
    const id= localStorage.getItem('id');
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    
    const removeRequest=()=>{ 
       async function removeCategory(){
        await  axios.delete(`https://7didan.com/api/v1/categories/${id}`).then((response) => {
           });
       }  
       removeCategory();
       localStorage.clear();
      // window.location.href='/CategoryList'
      window.location.href='/'
     }
     
     
    return (
        <div className='removeItem'>
            {loggedIn===false && navigate("/")}
            <span className='categoryName'>{name}</span>
            <Button size="large" variant="contained" color="error" onClick={removeRequest} 
            style={{fontSize:'18px',fontWeight:'bold'}} startIcon={<DeleteIcon />}> إثبات حذف العنصر</Button>
               
        </div>
    )
}

export default DeleteCategory
