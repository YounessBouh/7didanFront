import React,{useEffect} from 'react'
import axios from 'axios'

function Generation() {
      
       async function updateAdmin(){
        await  axios.get('https://7didan.com/api/v1/auth/Generation');
       }  
    useEffect(()=>{
        updateAdmin();
    },[])
    return (
        <div>
            <h1>THE PAGE IS EMPTY</h1>
        </div>
    )
}

export default Generation
