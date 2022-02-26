import React,{useEffect,useState,useContext} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setBox } from "../../../slices/navSlice"
import AuthContext from '../../context/AuthContext'
import Loading from '../../util/loading/Loading'
import DeleteIcon from '@mui/icons-material/Delete';
import './DeleteAdmin.css'

function DeleteAdmin() {
    const name=localStorage.getItem('name');
    const id= localStorage.getItem('id');
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    
    const removeRequest=()=>{ 
       async function removeCategory(){
        await  axios.delete(`https://7didan.com/api/v1/auth/remove/${id}`).then((response) => {
           });
       }  
       removeCategory();
       localStorage.clear();
       window.location.href='/Admins'
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

export default DeleteAdmin
