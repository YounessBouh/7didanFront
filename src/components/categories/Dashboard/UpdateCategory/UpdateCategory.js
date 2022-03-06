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
    const [allzones,setAllZoness]= useState(localStorage.getItem('allZones'));
    const id= localStorage.getItem('id');

    const updateRequest=()=>{ 
      if(nameVal.trim() === "") return alert('is empty')
        console.log('type of allzones after', allzones)
       async function updateCategory(){    
        await  axios.put(`https://7didan.com/api/v1/categories/${id}`,{name:nameVal,allZones:JSON.parse(allzones)})
        .then((response) => {});
       }  
       updateCategory();
       localStorage.clear();
      // window.location.href='/CategoryList'
         window.location.href='/'
     }

     console.log('first loading allzone ',allzones)

     const updateName=(e)=>{
        setNameVal(e.target.value)
     }
       
     const handleAllZones=(e)=>{
      if(e.target.value.trim() === "") return alert('catgeory cannot be empty')
      setAllZoness(e.target.value)
     }
     console.log('type of allzone befor', allzones)
     
     
    return (
        <div className='updateItem'>
           {loggedIn===false && navigate("/")}
            <Input defaultValue={nameVal} className='categoryName' 
              style={{fontSize:'22px',fontWeight:'bold'}}  
              onChange={updateName} required />
             <p className='category__p'> for all zones ? :  {allzones}</p>
              <select name='isPaid'  onChange={handleAllZones} className='zoneValue'>
              <option value="">change zones </option>
              <option value={true} > for all zones </option>
              <option value={false}> for single zone </option>
             </select>    
            <Button size="large" variant="contained" color="primary" onClick={updateRequest} 
            style={{fontSize:'18px',fontWeight:'bold'}} startIcon={<DeleteIcon />}> تعديل العنصر</Button>   
        </div>
    )
}

export default UpdateCategory
