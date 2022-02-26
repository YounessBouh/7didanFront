import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import {setCity} from "../../../slices/navSlice";
import { useNavigate } from 'react-router-dom';
import {selectCategory}   from "../../../slices/navSlice";
import Loading from "../../util/loading/Loading";

import axios from 'axios'
import './Cities.css'

const Cities=()=>{
  const category=useSelector(selectCategory);
  const[cities,setCities]=useState([]);
  const [loading, setLoading] = useState(false)
  const dispatch=useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if(category===null) return navigate("/");
    async function loadData(){
      await  axios.get('https://www.optimusmaroc.com/api/v1/locations').then((response) => {
          setCities(response.data.data)
         });
        }  
        loadData();
        setLoading(true)
     }, []);

     const handelRequest=(item)=>{
       dispatch(setCity(item));
       navigate("/Zones");
     }


     return (
       <>
      <div className='categoryListing'>
       {cities.map((city)=>{
        return (
            <div  className='CategoryItem'   key={city._id} 
            onClick={(event) =>{handelRequest(city)}}>
                <p className='CategoryName'>{city.name}</p>
        </div>
        )
    })}
     </div>
     {cities.length===0 && <Loading />}
     </>
  )
}

export default Cities;
