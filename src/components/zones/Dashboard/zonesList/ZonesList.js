import React,{useEffect,useState,useContext} from "react";
import axios from 'axios'
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setBox } from "../../../../slices/navSlice"
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import Loading from "../../../util/loading/Loading";
import './ZonesList.css'

function ZonesList() {
    
    const[zones,setZones]=useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    const dispatch=useDispatch();
    const[name,setName]=useState('');
    const[usersNr,setUsersNr]=useState(0);


    useEffect(() => {
      async function loadData(){
         if(page<1){
          setPage(1)
         }
         if(page > totalPages)
         {
          setPage(totalPages);
         }
        await  axios.get(`https://www.optimusmaroc.com/api/v1/zones/getFilteredZones?page=${page}`).then((response) => {
           const { data, pages: totalPages,count } = response.data;
            setZones(data);
            setTotalPages(totalPages);
            setUsersNr(count);
           });
          }  
          loadData();
          setLoading(true)
       }, [page]);



   const SearchZone=()=>{
    async function loadData(){
      await  axios.get(`https://www.optimusmaroc.com/api/v1/zones?name=${name}`).then((response) => {
        setZones(response.data.data)
         });
    }  
        loadData();
   }


      
           const removeRequest=(item)=>{
            dispatch(setBox(item)) ;
            localStorage.setItem('name',item.name);
            localStorage.setItem('id',item._id);
             navigate('/DeleteZone');
           }
      
           const addRequest=(item)=>{
            navigate('/CreateZone');
           } 
           const updateRequest=(item)=>{
             dispatch(setBox(item)) ;
             localStorage.setItem('name',item.name);
             localStorage.setItem('id',item._id);
             navigate('/UpdateZone');
          } 
         const searchRequest=(e)=>{
          setName(e.target.value);
          console.log(name)
         }
         const searchMobile=()=>{
          if(name.trim()==='')
          {
            setName('');
            return alert('mobile number is Empty')
          } 
          SearchZone();
          setName('');
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
              <div className="List">
              {loggedIn===false && navigate("/")}
              {zones.length===0 && <Loading />}
              <div className='zoneList__header'>
                <Button style={{fontSize:'18px',fontWeight:'bold'}} size="small" variant="contained"
                     color="primary" onClick={addRequest}>Add New zone</Button>

             <div className="zoneList__SearchOption">
             <Input  type="text" placeholder="Search" 
             value={name} onChange={searchRequest} />  

             <Button type='submit' style={{fontSize:'18px',fontWeight:'bold',marginLeft:'5px'}} size="small" 
               variant="contained" color="primary" onClick={searchMobile}>Search</Button>
            
              </div>
             
              </div>
              <p style={{margin:'20px',fontSize:'16px',fontWeight:'bold'}}>Nr of non active users is {usersNr}: Page  {page} from {totalPages}</p>
             
              <div className='cityListing'>
               {zones.map((item)=>{
                return (
                    <div  className='dashbordzone'   key={item._id} >
                    <div className="dashbordzone__options">
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
             <div className="pages">
             <Button  size="small" variant="contained" color="primary" 
             onClick={goBack}>Previous Page</Button>   

             <Button  size="small" variant="contained" color="primary" 
                onClick={goNext}>Next Page</Button>
                
            </div>

           </div>
          )
      }
      
  

export default ZonesList
