import React,{useContext} from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './DeleteCity.css'

function DeleteCity() {
   
    const name=localStorage.getItem('name');
    const id= localStorage.getItem('id');
    const { loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const removeRequest=()=>{ 
       async function removeCity(){
        await  axios.delete(`https://7didan.com/api/v1/locations/${id}`).then((response) => {
           });
       }  
       removeCity();
       localStorage.clear();
       window.location.href='/CitiesList'
     }
     
    return (
        <div className='removeItem'>
        {loggedIn===false && navigate("/")}
            <span className='cityName'>{name}</span>
            <Button size="large" variant="contained" color="error" onClick={removeRequest} 
            style={{fontSize:'18px',fontWeight:'bold'}} startIcon={<DeleteIcon />}> إثبات حذف العنصر</Button>
               
        </div>
    )
}
export default DeleteCity
