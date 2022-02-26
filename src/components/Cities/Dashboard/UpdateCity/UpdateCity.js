import React,{useState,useContext} from 'react'
import axios from 'axios'
import{selectBox} from "../../../../slices/navSlice"
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './UpdateCity.css'

function UpdateCity() {
    const [nameVal,setNameVal]= useState(localStorage.getItem('name'));
    const id= localStorage.getItem('id');
    const { loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const updateRequest=()=>{ 
      if(nameVal.trim() === "") return alert('is empty')
       async function updateCategory(){
        await  axios.put(`https://7didan.com/api/v1/locations/${id}`,{name:nameVal}).then((response) => {
           });
       }  
       updateCategory();
       localStorage.clear();
       window.location.href='/CitiesList'
     }

     const updateName=(e)=>{
        setNameVal(e.target.value)
     }
     
    return (
        <div className='updateItem'>
           {loggedIn===false && navigate("/")}
            <Input defaultValue={nameVal} className='cityName' 
              style={{fontSize:'22px',fontWeight:'bold'}}  required
              onChange={updateName} />
            <Button size="large" variant="contained" color="primary" onClick={updateRequest} 
            style={{fontSize:'18px',fontWeight:'bold'}} startIcon={<DeleteIcon />}> تعديل العنصر</Button>
        </div>
    )
}

export default UpdateCity
