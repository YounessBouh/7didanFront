import React,{useEffect,useState,useContext} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setBox } from "../../../slices/navSlice"
import AuthContext from '../../context/AuthContext'
import Loading from '../../util/loading/Loading'
import './Admins.css'

function Admins() {
    const[admins,setAdmins]=useState([]);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { loggedIn } = useContext(AuthContext);


  useEffect(() => {
    async function loadData(){
      await  axios.get('https://7didan.com/api/v1/auth/getAdmins',).then((response) => {
          setAdmins(response.data.data)
         });
        }  
        loadData();
     }, []);

     const addRequest=()=>{  
      navigate('/Registration');
     } 

     const removeRequest=(item)=>{
      dispatch(setBox(item)) ;
      localStorage.setItem('name',item.name);
      localStorage.setItem('id',item._id);
       navigate('/DeleteAdmin');
     }


     const updateRequest=(item)=>{
       dispatch(setBox(item)) ;
       localStorage.setItem('name',item.name);
       localStorage.setItem('role',item.role);
       localStorage.setItem('id',item._id);
       navigate('/UpdateAdmin');
    } 

    return (
        <div className="List">
        {loggedIn===false && navigate("/")}
        <div className='categoryListing'>
         {admins.map((item)=>{
          return (
            <>
            <Button style={{fontSize:'18px',fontWeight:'bold'}} size="small" variant="contained"
              color="primary" onClick={addRequest}>Add New Category</Button>
              <div  className='dashbordcategory'   key={item._id} >
                  <div className="dashbordcategory__options">
                    <span>{item.name}</span>
                    <span>{item.role}</span>
                 <Button  size="small" variant="contained" color="error" 
                     onClick={() =>{removeRequest(item)}}>Remove</Button>
                 <Button size="small" variant="contained" color="primary"
                     onClick={() =>{updateRequest(item)}}>Update</Button>
              </div>
                   
             </div>
            </>

           )
        })}
       </div>
       {admins.length===0 && <Loading />}
     </div>
    )
}

export default Admins
