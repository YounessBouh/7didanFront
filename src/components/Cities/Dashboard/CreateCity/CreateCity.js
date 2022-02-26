import React,{useState,useContext} from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AuthContext from '../../../context/AuthContext'
import './CreateCity.css'

function CreateCity() {
    const [inputValue, setInputValue] = useState("");
    const { loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const addRequest=(e)=>{ 
        e.preventDefault()
        if(inputValue.trim() === "") return alert('is empty')
        async function addCategory(){
        await  axios.post('https://7didan.com/api/v1/locations',{name:inputValue})
            .then((response) => {});}  
           addCategory();
         //  window.location.href='/CitiesList'
           window.location.href='/'
      }

  
    return (
        <div className='createItem'>
        {loggedIn===false && navigate("/")}
        <Input value={inputValue} className='cityName' 
         style={{fontSize:'22px',fontWeight:'bold'}}
         onChange={(e) => setInputValue(e.target.value)} required />
        <Button size="large" variant="contained" color="primary" onClick={addRequest} 
        style={{fontSize:'18px',fontWeight:'bold'}} > إظافة عنصر جديد</Button>
        </div>
    )
}

export default CreateCity
