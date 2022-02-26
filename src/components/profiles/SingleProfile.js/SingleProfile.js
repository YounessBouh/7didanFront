import React,{useState,useEffect} from 'react'
import {selectProfile}  from "../../../slices/navSlice";
import {useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './SingleProfile.css'
import defaultImage from '../../images/defaultUser.png'


  function SingleProfile() {
    const navigate = useNavigate();
    const profile=useSelector(selectProfile);
    const[showPhone,setShowPhone]=useState(false);
    const fullName= localStorage.getItem('fullName');
    const address=  localStorage.getItem('address');
    const phone=   localStorage.getItem('phone');
    const description=  localStorage.getItem('description');
    const showNumber=  localStorage.getItem('showNumber');
   
    
    
    useEffect(()=>{
      if(profile == null ) return navigate("/");
    },[])
     
    const handelShowPhone=()=>{
      if(showNumber==='true')
      {
        setShowPhone(true);
      }
      else{
        swal("العميل لا يسمح بإظهار رقمه الشخصي")
      }
    }
     
   
//{!imageURL ? <img src={imageURL} alt='loading'  /> : <img src={defaultImage} alt='loading'  />}
    return < >
    
       <div  className='SingleProfilesItem'  >
            <div className="singleProfile__left">
             <p className='ProfilesItem__span' >{fullName}</p>
             <p className='ProfilesItem__span'>{address}</p>
             <p className='ProfilesItem__span'>{description}</p>
             <p className='ProfilesItem__span ProfilesItem__info' onClick={handelShowPhone}> 
                {showPhone? <strong>{phone}</strong> 
                : <h3>إظهار الهاتف</h3>  
           }</p>
          </div>
            <div className="singleProfile__right">
            {profile && profile.images.length===1 ? <img src={profile.images[0].url} alt='oops' 
                style={{borderRadius:'100px',objectFit:'contain'}} height='180' /> : 
                <img src={defaultImage} alt='loading'  />}
            
            </div>
               
        </div>
        <div className='galleryProfile__images'>
        {profile && profile.images.length>1 && profile.images.map((item)=>{
          return (<div   key={item.public_id}>
            <img src={item.url} alt='oops' style={{border:'4px solid white',maxHeight:'400px',margin:'10px',objectFit:'contain'}}  />
            </div>)
         })
      }
        </div>
        <div className='galleryProfile__imagesURL'>
        
        {profile && profile.imagesURL.length>0 && profile.imagesURL.map((itemURL, idx)=>{
          return (<div   key={idx}>
            <img src={itemURL} alt='oops' style={{border:'4px solid white',maxHeight:'400px',margin:'10px',objectFit:'contain'}}  />
            </div>)
        })
          
        }
        
        </div>
      </>
  }

  export default SingleProfile
