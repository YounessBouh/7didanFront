import React,{useState,useContext} from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import axios from 'axios'
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './CreateCategory.css'

function CreateCategory() {
    const [inputValue, setInputValue] = useState("");
    const [allzones, setAllZones] = useState('');
    const { loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const addRequest=(e)=>{ 
        e.preventDefault()
        if(inputValue.trim() === "" || allzones.trim() === "") return alert('is empty')
         const zoneOption=JSON.parse(allzones);
        async function addCategory(){
            await  axios.post('https://7didan.com/api/v1/categories',{name:inputValue,allZones:zoneOption});
           }  
            addCategory();
          // window.location.href='/CategoryList'
            window.location.href='/'
      }

      const handleAllZones=(e)=>{
        if(e.target.value.trim() === "") return alert('catgeory cannot be empty')
         setAllZones(e.target.value)
      }
     

  
    return (
        <div className='createItem'>
        {loggedIn===false && navigate("/")}
        <Input value={inputValue} className='categoryName' 
         style={{fontSize:'22px',fontWeight:'bold'}}
         onChange={(e) => setInputValue(e.target.value)} required />
         

         <select name='isPaid'  onChange={handleAllZones} className='zoneValue'>
              <option value="">change zones </option>
              <option value={false}> for single zone </option>
              <option value={true} > for all zones </option>
             </select>    

        <Button size="large" variant="contained" color="primary" onClick={addRequest} 
        style={{fontSize:'18px',fontWeight:'bold'}} > إظافة عنصر جديد</Button>
        </div>
    )
}

export default CreateCategory
