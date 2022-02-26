import React,{useContext, useEffect} from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AuthContext from '../../../context/AuthContext'
import { useSelector } from "react-redux";
import './DeleteProfile.css'
import { selectBox } from '../../../../slices/navSlice';

function DeleteProfile() {

    const id=localStorage.getItem('id');
    const fullname =localStorage.getItem('fullName');
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    const box=useSelector(selectBox);
    let imagesId={publicIDs:[]};


    useEffect(()=>{
        if(box==null ) return navigate("/");
        if(box.images.length>0){
            for(let i=0;i<box.images.length;i++)
            {
                imagesId.publicIDs.push(box.images[i].public_id);
            }
        }
       
      
    },[])

   
    const  removeProfile= async()=>{
        await  axios.delete(`https://7didan.com/api/v1/index/${id}`).then((response) => {
           });
       }      


    const removeRequest=()=>{ 
       removeProfile();
     //  window.location.href='/ProfilesList'
       window.location.href='/'
     }


     return (
        <div className='removeItem'>
        {loggedIn===false && navigate("/")}
            <span className='profileName'>{fullname}</span>
             <Button size="large" variant="contained" color="error" 
                onClick={removeRequest} 
                style={{fontSize:'18px',fontWeight:'bold'}} 
                startIcon={<DeleteIcon />}> إثبات حذف العنصر</Button>
               
        </div>
    )
}

export default DeleteProfile
