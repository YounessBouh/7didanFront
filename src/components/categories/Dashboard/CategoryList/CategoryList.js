import React,{useEffect,useState,useContext} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setBox } from "../../../../slices/navSlice"
import AuthContext from '../../../context/AuthContext'
import Loading from '../../../util/loading/Loading'
import './CategoryList.css'

const CategoryList=()=>{
  const[categories,setCategories]=useState([]);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { loggedIn } = useContext(AuthContext);


  useEffect(() => {
    async function loadData(){
      await  axios.get('https://7didan.com/api/v1/categories',).then((response) => {
          setCategories(response.data.data)
         });
        }  
        loadData();
     }, []);

     const removeRequest=(item)=>{
      dispatch(setBox(item)) ;
      localStorage.setItem('name',item.name);
      localStorage.setItem('id',item._id);
       navigate('/DeleteCategory');
     }

     const addRequest=(item)=>{  
      navigate('/CreateCategory');
     } 

     const updateRequest=(item)=>{
       dispatch(setBox(item)) ;
       localStorage.setItem('name',item.name);
       localStorage.setItem('id',item._id);
       navigate('/UpdateCategory');
    } 


    return (
        <div className="List">
        {loggedIn===false && navigate("/")}
        <Button style={{fontSize:'18px',fontWeight:'bold'}} size="small" variant="contained"
              color="primary" onClick={addRequest}>Add New Category</Button>
        <div className='categoryListing'>
         {categories.map((item)=>{
          return (
              <div  className='dashbordcategory'   key={item._id} >
              <div className="dashbordcategory__options">
                 <span>{item.name}</span>
                 <Button  size="small" variant="contained" color="error" 
                     onClick={() =>{removeRequest(item)}}>Remove</Button>
                 <Button size="small" variant="contained" color="primary"
                     onClick={() =>{updateRequest(item)}}>Update</Button>
              </div>
                   
             </div>
           )
        })}
       </div>
       {categories.length===0 && <Loading />}
     </div>
    )
}

export default CategoryList;