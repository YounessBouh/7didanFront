import React,{useEffect,useState,useContext} from "react";
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from 'axios'
import Loading from "../../../util/loading/Loading";
import AuthContext from '../../../context/AuthContext'
import './NotActiveProfiles.css'

function NotActiveProfiles() {
   
 
    const[profiles,setProfiles]=useState([]);
    const[usersNr,setUsersNr]=useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const[mobile,setMobile]=useState('');
    const[paidProfile,setPaidProfile]=useState(true);
    const { loggedIn } = useContext(AuthContext);

    
    useEffect(() => {
      if(loggedIn===false) return navigate("/")

        async function loadData(){
           if(page<1){
            setPage(1)
           }
           if(page > totalPages)
           {
            setPage(totalPages);
           }
          await  axios.get(`https://www.optimusmaroc.com/api/v1/index/isNotActive?page=${page}`).then((response) => {
             const { data, pages: totalPages,count } = response.data;
              setProfiles(data);
              setTotalPages(totalPages);
              setUsersNr(count);
             });
            }  
            loadData();
            setLoading(true)
         }, [page]);


         async function loadFilteredProfiles(){
          await  axios.get(`https://www.optimusmaroc.com/api/v1/index/filteredByPhone?phone=${mobile}`).then((response) => {
           setProfiles(response.data.data)                                                              
            });
           }   
           
              

        const activateProfile=(item)=>{
          localStorage.setItem('id',item._id)
          localStorage.setItem('days',item.days)
          localStorage.setItem('isActive',item.isActive)
          localStorage.setItem('fullname',item.FullName)
          localStorage.setItem('phone',item.phone)
          navigate('/UpdateNotActiveProfile');
        }
       const searchInput=(e)=>{
         if(e.target.value) return setMobile(e.target.value);
       }
        
       

       const searchMobile=()=>{
          if(mobile.trim()==='') return alert('mobile number is Empty')
          loadFilteredProfiles();
          setMobile('');
       }

      
      
       const goNext=()=>{
         let nextPage=page+1;
         if(nextPage > totalPages)
         {
            setPage(totalPages);
         }
         else{
            setPage(page+1)
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
         }
      }
    
       
       return (
         <>
         {loggedIn===false && navigate("/")}
         <div className="searchNonActiveMobile">
           <div className="searchNonActiveMobileUsers">
              <p>Nr of non active users is {usersNr}: Page  {page} from {totalPages}</p>
           </div>
         <div className="searchNonActiveMobileButtons">
            <Button type='submit' style={{fontSize:'18px',fontWeight:'bold',marginLeft:'8px'}} size="small" 
            variant="contained" color="primary" onClick={searchMobile}>Search By Phone</Button>
            <Input type="text" name="profileList" value={mobile} onChange={searchInput} placeholder="Phone" />
         </div>
       </div>

      

        <div className='categoryListing'>
           {profiles.map((item)=>{
            return (
                <div  className='NoActiveProfile'   key={item._id} >
                   <div className="dashbordProfile__options__left">
                      <p>{item.FullName} </p>
                      <p>{item.address}</p>
                      <p>{item.phone}</p>
                      <p>{item.createdAt.substring(0, 10)}</p>
                   </div>
                   
                  <div  className="dashbordcategory__options__right">   
                     <Button  size="small" variant="contained" color="primary" 
                        onClick={(e)=>activateProfile(item)}>Update Not Active Profile</Button>        
                   </div> 
                 </div>    
             )
          })}
            
           </div>
           {profiles.length===0 && <Loading />}
            <div className="pages">
                <Button  size="small" variant="contained" color="primary" 
                onClick={goBack}>Previous Page</Button>   

                <Button  size="small" variant="contained" color="primary" 
                   onClick={goNext}>Next Page</Button>
                   
               </div>  
        </>
    )
   
}

export default NotActiveProfiles
