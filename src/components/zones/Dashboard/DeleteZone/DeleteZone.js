import React,{useContext} from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './DeleteZone.css'

function DeleteZone() {
    const name=localStorage.getItem('name');
    const id= localStorage.getItem('id');
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    
    const removeRequest=()=>{ 
       async function removeZone(){
        await  axios.delete(`https://7didan.com/api/v1/zones/${id}`).then((response) => {
           });
       }  
       removeZone();
       localStorage.clear();
     //  window.location.href='/ZonesList'
       window.location.href='/'
     }
     
    return (
        <div className='removeItem'>
            {loggedIn===false && navigate("/")}
            <span className='zoneName'>{name}</span>
            <Button size="large" variant="contained" color="error" onClick={removeRequest} 
            style={{fontSize:'18px',fontWeight:'bold'}} startIcon={<DeleteIcon />}> إثبات حذف العنصر</Button>
               
        </div>
    )
}


export default DeleteZone
