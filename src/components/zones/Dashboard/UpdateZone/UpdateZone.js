import React,{useState,useContext} from 'react'
import axios from 'axios'
import{selectBox} from "../../../../slices/navSlice"
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './UpdateZone.css'

function UpdateZone() {
    const [nameVal,setNameVal]= useState(localStorage.getItem('name'));
    const id= localStorage.getItem('id');
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);

    const updateRequest=()=>{ 
        if(nameVal.trim() === "") return alert('is empty')
       async function updateCategory(){
        await  axios.put(`https://www.optimusmaroc.com/api/v1/zones/${id}`,{name:nameVal}).then((response) => {
           });
       }  
        updateCategory();
        localStorage.clear();
        window.location.href='/ZonesList'
     }

     const updateName=(e)=>{
        setNameVal(e.target.value)
     }
     
    return (
        <div className='updateItem'>
            {loggedIn===false && navigate("/")}
            <Input defaultValue={nameVal} className='zoneName' required
              style={{fontSize:'22px',fontWeight:'bold'}}  onChange={updateName} />

            <Button size="large" variant="contained" color="primary" onClick={updateRequest} 
            style={{fontSize:'18px',fontWeight:'bold'}} startIcon={<DeleteIcon />}> تعديل العنصر</Button>
               
        </div>
    )
}

export default UpdateZone
