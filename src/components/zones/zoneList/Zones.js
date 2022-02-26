import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import {setZone} from "../../../slices/navSlice";
import { useNavigate } from 'react-router-dom';
import {selectCity}  from "../../../slices/navSlice";
import {selectCategory}   from "../../../slices/navSlice";
import axios from 'axios'
import './Zones.css'

const Zones=()=>{

   const city=useSelector(selectCity);
   const category=useSelector(selectCategory);
  const[zones,setZones]=useState([]);
  const [loading, setLoading] = useState(false)
  const dispatch=useDispatch();
  const navigate = useNavigate();

   


  useEffect(() => {
    if(city==null || category==null) return navigate("/");
    async function loadData(){
      await  axios.get(`https://www.optimusmaroc.com/api/v1/zones?cityId=${city._id}`).then((response) => {
        setZones(response.data.data)
         });
        }  
        loadData();
        setLoading(true)
     }, []);

     const handelRequest=(item)=>{
    //   console.log('from redux',city)
       dispatch(setZone(item));
       navigate("/Profiles");
     }

     return (
      <div className='categoryListing'>
       {zones.map((item)=>{
        return (
            <div  className='CategoryItem'   key={item._id} 
            onClick={(event) =>{handelRequest(item)}}>
                <p className='CategoryName'>{item.name}</p>
        </div>

        )
    })}
     </div>
  )
}

export default Zones;

