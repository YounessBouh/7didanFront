import React,{useState,useEffect,useContext} from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import axios from 'axios'
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './CreateZone.css'

function CreateZone() {
    const [inputValue, setInputValue] = useState("");
    const[cities,setCity]=useState([]);
    const [cityId, setCityId] = useState("");
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);

    
    useEffect(() => {
        async function loadData(){
          await  axios.get('https://www.optimusmaroc.com/api/v1/locations').then((response) => {
            setCity(response.data.data)
             });
            }  
            loadData();
         }, []);


    const addRequest=(e)=>{ 
        e.preventDefault()
        if(inputValue.trim() === "" || cityId.trim()==="") return alert('is empty')
        async function addZone(){
            await  axios.post('https://www.optimusmaroc.com/api/v1/zones',{name:inputValue,cityId:cityId}
            ).then((response) => {});
           }  
           addZone();
           localStorage.clear();
           window.location.href='/ZonesList'
      }

      const changeCity=(e)=>{
        console.log(e.target.value)
        setCityId(e.target.value);
      }


    return (
        <div className='createItem'>
        {loggedIn===false && navigate("/")}
        <Input value={inputValue} className='zoneName' placeholder='إضافة المنطقة'
         style={{fontSize:'22px',fontWeight:'bold'}}
         onChange={(e) => setInputValue(e.target.value)} required />

         <select value={cityId} onChange={changeCity} 
             className='zoneDrop'  >
             <option value="">select city</option>
         {cities.map(city=>{
             return( 
                   <option value={city._id} key={city._id} >{city.name}</option>
               )
         })}
         </select>


        <Button size="large" variant="contained" color="primary" onClick={addRequest} 
        style={{fontSize:'18px',fontWeight:'bold'}} > إظافة عنصر جديد</Button>
        </div>
    )
}


export default CreateZone
