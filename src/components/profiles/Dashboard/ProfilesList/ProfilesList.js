import React,{useEffect,useState,useContext} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setBox } from "../../../../slices/navSlice"
import Input from '@mui/material/Input';
import AuthContext from '../../../context/AuthContext'
import './ProfilesList.css'

function ProfilesList() {
  const initialState = { cityId: '', categoryId: '', zoneId: '',}
  const [profile, setProfile] = useState(initialState);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const[usersNr,setUsersNr]=useState(0);
  const [categories,setCategories]=useState([]);
  const [cities,setCities]=useState([]);
  const [zones,setZones]=useState([]);
  const [profiles,setProfiles]=useState([]);
  const [phone,setPhone]=useState('');
 // const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { loggedIn } = useContext(AuthContext);


    async function loadCities(){
     await  axios.get('https://www.optimusmaroc.com/api/v1/locations').then((response) => {
     setCities(response.data.data)
     });} 

    async function loadCategories(){
      await  axios.get('https://www.optimusmaroc.com/api/v1/categories').then((response) => {
          setCategories(response.data.data)
     });} 
       
    async function loadZones(){
        await  axios.get(`https://www.optimusmaroc.com/api/v1/zones?cityId=${profile.cityId}`).then((response) => {
              setZones(response.data.data)
      });} 

    async function loadProfiles(){
        await  axios.get(`https://www.optimusmaroc.com/api/v1/index?cityId=${profile.cityId}&zoneId=${profile.zoneId}&categoryId=${profile.categoryId}&page=${page}`).then((response) => {
          const { data, pages: totalPages,count } = response.data;    
            setProfiles(data);
            setTotalPages(totalPages);
            setUsersNr(count);                                                                  
           });
          }

       async function loadFilteredProfiles(){
        await  axios.get(`https://www.optimusmaroc.com/api/v1/index/filteredByPhone?phone=${phone}`).then((response) => {
          const { data, pages: totalPages,count } = response.data;    
            setProfiles(data);
            setTotalPages(totalPages);
            setUsersNr(count);                                                                    
           });
          }   
           
         const searchNonPaidProfile=(e)=>{
          navigate('/NotPaidProfiles')
         } 

   
     useEffect(() => {
      if(loggedIn===false) return navigate('/');
        loadCategories();
        loadCities();
     }, []);

     const removeRequest=(item)=>{
      dispatch(setBox(item)) ;
      localStorage.setItem('id',item._id);
      localStorage.setItem('fullName',item.FullName);
       navigate('/DeleteProfile');
     }

     const addRequest=(item)=>{
      navigate('/CreateProfile');
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


    const handleChangeInput = e =>{
      const {name, value} = e.target
       setProfile({...profile, [name]:value})
    }

    const getZones=()=>{
      if(profile.categoryId.trim()==='' || profile.cityId.trim()==='')
                   return alert('Plz select category and city');
      loadZones();
    }

    const getProfiles=()=>{
      if(profile.categoryId.trim()==='' || profile.cityId.trim()==='' || profile.zoneId.trim()==='')
                   return alert('Plz select category,city and zone');
      loadProfiles();
    }
    const searchProfile=(e)=>{
      setPhone(e.target.value);
    }
    
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(phone.trim()==='') return alert('phone cannot be empty')
      loadFilteredProfiles()
      setPhone('');
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
        <div className="profileList__header">
        <Button style={{fontSize:'18px',fontWeight:'bold'}} size="small" variant="contained"
           color="primary" onClick={addRequest}>Add New Profile</Button>
        
       <Button type='submit' style={{backgroundColor:'black',fontSize:'18px',fontWeight:'bold',marginLeft:'8px'}} size="small" 
        variant="contained" color="primary" onClick={searchNonPaidProfile}>Not Paid Active Profiles</Button>   

        <div className="profileList__headerSearch">
        <form onSubmit={handleSubmit}>
          <Input type="text" name="profileList" placeholder="Phone" value={phone} onChange={searchProfile}/>
          <Button type='submit' style={{fontSize:'18px',fontWeight:'bold'}} size="small" 
          variant="contained" color="primary">Search By Phone</Button>
        </form>
          
        </div>   
        </div>
        

        <div className="SelectList">
          <select name='categoryId' value={profile.categoryId} onChange={handleChangeInput} 
          className='profileDrop'  >
          <option value="">select category</option>
             {categories.map(category=>{
            return( 
             <option value={category._id} key={category._id} >{category.name}</option>
           )
         })}
       </select>

        <select name='cityId' value={profile.cityId} onChange={handleChangeInput} 
         className='profileDrop' >
         <option value="">select city</option>
           {cities.map(city=>{
            return( 
             <option value={city._id} key={city._id} >{city.name}</option>
           )
         })}
       </select>

       <button className='btnLoadZones' 
             onClick={getZones}> Click here to Load Zones </button>

       <select name='zoneId' value={profile.zoneId} onChange={handleChangeInput} 
             className='profileDrop' >
             <option value=""> select  zone</option>
           {zones.map(zone=>{
            return( 
             <option value={zone._id} key={zone._id} >{zone.name}</option>
         )
     })}
    </select>
    <button className='btnLoadZones' 
         onClick={getProfiles}> Click here to Load Profiles </button>
   
        </div>
         
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
     </div>
    )
}


export default ProfilesList
