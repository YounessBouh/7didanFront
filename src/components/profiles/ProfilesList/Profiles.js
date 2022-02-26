import React,{useEffect,useState} from "react";
import {useDispatch,useSelector } from "react-redux";
import {setProfile} from "../../../slices/navSlice";
import { useNavigate } from 'react-router-dom';
import {selectCategory}  from "../../../slices/navSlice";
import {selectCity}  from "../../../slices/navSlice";
import {selectZone}  from "../../../slices/navSlice";
import {selectProfile}  from "../../../slices/navSlice";
import Loading from "../../util/loading/Loading";
import axios from 'axios'
import './Profiles.css'

const Cities=()=>{
  const[profiles,setProfiles]=useState([]);
  const [loading, setLoading] = useState(false)
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const city=useSelector(selectCity);
  const zone=useSelector(selectZone);
  const category=useSelector(selectCategory);
  const profile=useSelector(selectProfile);
  let public_ids=[];
  let imagesURL=[];
  let imgURL='';

  useEffect(() => {
    if(city==null || category==null || zone==null) return navigate("/");
    async function loadData(){
      await  axios.get(`https://www.optimusmaroc.com/api/v1/index?cityId=${city._id}&zoneId=${zone._id}&categoryId=${category._id}`).then((response) => {
        setProfiles(response.data.data)
         });
        }  
        loadData();
        setLoading(true)
     }, []);


     const handelRequest=(item)=>{
       dispatch(setProfile(item));
       localStorage.setItem('fullName',item.FullName);
       localStorage.setItem('address',item.address);
       localStorage.setItem('phone',item.phone);
       localStorage.setItem('description',item.description);
       localStorage.setItem('showNumber',item.showPhone);
       localStorage.setItem('days',item.days);
       getImages(item);
       navigate("/SingleProfile");
     }

     const getImages=(item)=>{
      for(let i=0;i<item.images.length;i++)
      {
        imagesURL.push(item.images[i].url);
      }
       localStorage.setItem("imagesURL", imagesURL);
      
    }

  

  return (
    <>
    <div className='Profiles'>
     {profiles.map((item)=>{
      return (
          <div  className='ProfilesItem'   key={item._id}  >
            <div className="ProfilesItem__left">
             <span className='ProfilesItem__span' >{item.FullName}</span>
             <span className='ProfilesItem__span'>{item.address}</span>
             <span className='ProfilesItem__span ProfilesItem__info'
             onClick={(event) =>{handelRequest(item)}} >تفاصيل أكثر حول العميل</span>
          </div>
                 
        </div>

      )
  })}
  {profiles.length===0 && <Loading />}
   </div>
   </>
)
}

export default Cities;
