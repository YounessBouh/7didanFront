import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios'
import './MakeBackup.css'

function MakeBackup() {


    async function loadCategories(){
        await  axios.get('https://7didan.com/api/v1/categories/all').then((response) => {
            
           });
        } 
     async function loadCities(){
      await  axios.get('https://7didan.com/api/v1/locations').then((response) => {
         
         });
        }  
       async function loadZones(){
         await  axios.get('https://7didan.com/api/v1/zones/all').then((response) => {
        
         });
        } 
       
         async function loadProfiles(){
         await  axios.get('https://7didan.com/api/v1/index/all').then((response) => {
         
         });
        }  
        
    const saveCategories=()=>{
        loadCategories();
    }
    const saveCities=()=>{
        loadCities();
    }
    const saveZones=()=>{
        loadZones();
    }

    const saveProfiles=()=>{
        loadProfiles();
    }
   


    return (

        <div className='backup'>
        <Button onClick={saveCategories} >Categories Backup</Button>
        <Button onClick={saveCities} >Cities Backup</Button>
        <Button onClick={saveZones} >Zones Backup</Button>
        <Button onClick={saveProfiles} > Profiles Backup</Button>

        </div>
    )
}

export default MakeBackup
