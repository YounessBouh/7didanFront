import React,{useEffect,useState,useContext} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setBox } from "../../../../slices/navSlice"
import AuthContext from '../../../context/AuthContext'
import './CitiesList.css'
import Loading from "../../../util/loading/Loading";

function CitiesList() {
  const[cities,setCities]=useState([]);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { loggedIn } = useContext(AuthContext);


    useEffect(() => {
        async function loadData(){
          await  axios.get('https://www.optimusmaroc.com/api/v1/locations').then((response) => {
            setCities(response.data.data)
             });
            }  
            loadData();
         }, [cities]);
    
         const removeRequest=(item)=>{
          dispatch(setBox(item)) ;
          localStorage.setItem('name',item.name);
          localStorage.setItem('id',item._id);
          navigate('/DeleteCity');
         }
    
         const addRequest=(item)=>{
          navigate('/CreateCity');
         } 
         const updateRequest=(item)=>{
           dispatch(setBox(item)) ;
           localStorage.setItem('name',item.name);
           localStorage.setItem('id',item._id);
           navigate('/UpdateCity');
        } 
    
        return (
            <div className="List">
            {loggedIn===false && navigate("/")}
            <Button style={{fontSize:'18px',fontWeight:'bold'}} size="small" variant="contained"
                  color="primary" onClick={addRequest}>Add New City</Button>
            <div className='cityListing'>
             {cities.map((item)=>{
              return (
                  <div  className='dashbordcity'   key={item._id} >
                  <div className="dashbordcity__options">
                     <span>{item.name}</span>
                     <Button  size="small" variant="contained" color="error" 
                         onClick={(event) =>{removeRequest(item)}}>Remove</Button>
                     <Button size="small" variant="contained" color="primary"
                         onClick={(event) =>{updateRequest(item)}}>Update</Button>
                  </div>
                       
                 </div>
               )
            })}
           </div>
           {cities.length===0 && <Loading />}
         </div>
        )
    }
    

export default CitiesList
