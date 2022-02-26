import React,{useEffect,useState,useContext} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setBox, setCategory } from "../../../../slices/navSlice"
import Input from '@mui/material/Input';
import AuthContext from '../../../context/AuthContext'
import './NotPaidProfiles.css'

function NotPaidProfiles() {

    const [profiles,setProfiles]=useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const[usersNr,setUsersNr]=useState(0);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const { loggedIn } = useContext(AuthContext);

    async function loadNonPaidProfiles(){
        if(page<1){
          setPage(1)
         }
         if(page > totalPages)
         {
          setPage(totalPages);
         }
        await  axios.get(`https://7didan.com/api/v1/index/filteredByIsPaid?page=${page}`).then((response) => {
          const { data, pages: totalPages,count } = response.data;    
          setProfiles(data);
          setTotalPages(totalPages);
          setUsersNr(count);                                                             
           });
       } 

       useEffect(()=>{
         if(loggedIn===false) return navigate("/")
        loadNonPaidProfiles();
        if(loggedIn===false) return navigate('/');
       },[page])

       const removeRequest=(item)=>{
        //dispatch(setBox(item)) ;
        localStorage.setItem('id',item._id);
        localStorage.setItem('fullName',item.FullName);
         navigate('/DeleteProfile');
       }

       const updateRequest=(item)=>{
        dispatch(setBox(item)) ;
        localStorage.setItem('id',item._id);
        localStorage.setItem('fullName',item.FullName);
        localStorage.setItem('address',item.address);
        localStorage.setItem('phone',item.phone);
        localStorage.setItem('description',item.description);
        localStorage.setItem('showPhone',item.showPhone.toString());
        localStorage.setItem('days',item.days.toString());
        localStorage.setItem('isPaid',item.isPaid.toString());
        localStorage.setItem('isActive',item.isActive.toString());
        localStorage.setItem('endSubscription',item.endSubscription);
        navigate('/UpdateProfile');
    } 

    
    const goNext=()=>{
        let nextPage=page+1;
        if(nextPage > totalPages)
        {
           setPage(totalPages);
        }
        else{
           setPage(page+1)
         //  loadFilteredProfiles()
        }
      }
      const goBack=()=>{
        let previousPage=page-1;
        if(previousPage < 1)
        {
           setPage(1)
        }
        else{
           setPage(page-1)
         //  loadFilteredProfiles()
        }
     }

      
         return (
            <>
            {loggedIn===false && navigate("/")}
            <div className='categoryListing'>
            {profiles.map((item)=>{
             return (
                 <div  className='dashbordcategory'   key={item._id} >
                 <div className="dashbordcategory__options">
                    <div className="dashbordcategory__options__left">
                       <p>Name : {item.FullName} </p>
                       <p>address : {item.address}</p>
                       <p>Phone : {item.phone}</p>
                       <Button style={{margin:'5px'}}  size="large" variant="contained" color="error" 
                         onClick={(event) =>{removeRequest(item)}}>Remove</Button>
                       <Button size="large" variant="contained" color="primary"
                           onClick={(event) =>{updateRequest(item)}}>Update</Button>
                    </div>  
                 </div>
                      
                </div>
              )
           })}
           
           </div>
           <div className="pages">
              <Button  size="small" variant="contained" color="primary" 
                  onClick={goBack}>Previous Page</Button>   

           <Button  size="small" variant="contained" color="primary" 
                 onClick={goNext}>Next Page</Button>
            </div>
            <p style={{margin:'20px',fontSize:'16px',fontWeight:'bold'}}>Nr of non active users is {usersNr}: Page  {page} from {totalPages}</p>    
           </>
         )
           
}

export default NotPaidProfiles;
