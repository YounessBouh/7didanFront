import React,{useState,useContext} from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './UpdateCategory.css'


function UpdateCategory() {

    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    const [nameVal,setNameVal]= useState(localStorage.getItem('name'));
    const id= localStorage.getItem('id');

    const updateRequest=()=>{ 
      if(nameVal.trim() === "") return alert('is empty')
       async function updateCategory(){
        await  axios.put(`https://7didan.com/api/v1/categories/${id}`,{name:nameVal})
        .then((response) => {});
       }  
       updateCategory();
       localStorage.clear();
       window.location.href='/CategoryList'
     }

     const updateName=(e)=>{
        setNameVal(e.target.value)
     }
     
    return (
        <div className='updateItem'>
           {loggedIn===false && navigate("/")}
            <Input defaultValue={nameVal} className='categoryName' 
              style={{fontSize:'22px',fontWeight:'bold'}}  
              onChange={updateName} required />
            <Button size="large" variant="contained" color="primary" onClick={updateRequest} 
            style={{fontSize:'18px',fontWeight:'bold'}} startIcon={<DeleteIcon />}> تعديل العنصر</Button>   
        </div>
    )
}

export default UpdateCategory