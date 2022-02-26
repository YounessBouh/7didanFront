import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import{selectBox} from "../../../../slices/navSlice"
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext'
import swal from 'sweetalert';
import './UpdateProfile.css'

function UpdateProfile() {
    const   box=useSelector(selectBox);
    const id=localStorage.getItem('id');
    const [fullname,setFullName] =useState(localStorage.getItem('fullName'));
    const [address,setAddress] = useState(localStorage.getItem('address'));
    const [phone,setPhone]= useState(localStorage.getItem('phone'));
    const [description,setDescription]= useState(localStorage.getItem('description'));
    const [showPhone,setShowPhone]= useState(localStorage.getItem('showPhone'));
    //const [days,setDays]= useState(localStorage.getItem('days'));
    const [isPaid,setIsPaid]= useState(localStorage.getItem('isPaid'));
    const [isActive,setIsActive]= useState(localStorage.getItem('isActive'));
    const  endSubscription= localStorage.getItem('endSubscription');
    const days= localStorage.getItem('days');
    const [currentDate,setCurrentDate]=useState(new Date().getFullYear());
    const [dateState,setDateState]=useState(false);
    const [picsURL, setPicsURL] = useState([])
    const [imageURL, setImageURL] = useState('')
    const [imagesURL, setImagesURL] = useState([])

    
     
    useEffect(()=>{
      if(loggedIn===false) return navigate('/');
      if(box == null ) return navigate("/ProfilesList");
      if(box.images.length!==0)
      {
       setPicsURL(box.images)
      }

      if(box.imagesURL.length!==0)
      {
      setImagesURL(box.imagesURL)
      }
    
    },[])
    
    console.log('picsURL outside',picsURL)
   
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);


    const updateProfile=async (e)=>{
      let nextDate;
      let xdate=endSubscription;
      if(dateState===true)
      {
         nextDate=endSubscription.substring(0,4); 
         xdate=endSubscription.replace(nextDate.toString(),currentDate.toString())
      }
      
       async function updateRequest(){
        await  axios.put(`https://7didan.com/api/v1/index/${id}`,{FullName:fullname,
        address:address,description:description,phone:phone,endSubscription:xdate,imagesURL:imagesURL,
        showPhone:showPhone,isActive:isActive,isPaid:isPaid,images:picsURL}).then((response) => {
           });
       } 
       updateRequest();
     }
   

     const handleSubmit = async e =>{
        e.preventDefault();
        await updateProfile();
        localStorage.clear();
         window.location.href='/ProfilesList'
    }

    
    const handleNameInput=(e)=>{
      e.preventDefault();
      if(e.target.value.trim()==='') return alert('cannot be empty')
      setFullName(e.target.value);
    }

    const handleAddressInput=(e)=>{
      e.preventDefault();
      if(e.target.value.trim()==='') return alert('cannot be empty')
      setAddress(e.target.value);
    }

    const handlePhoneInput=(e)=>{
      e.preventDefault();
      if(e.target.value.trim()==='') return alert('cannot be empty')
      setPhone(e.target.value);
    }

    const handleDescriptionInput=(e)=>{
      e.preventDefault();
      if(e.target.value.trim()==='') return alert('cannot be empty')
      setDescription(e.target.value);
    }

   
    const handelisPaid=(e)=>{
      e.preventDefault();
      if(e.target.value.trim()==='') return alert('cannot be empty')
      const number=JSON.parse(e.target.value)
      setIsPaid(number);
    }

    const handelshowPhone=(e)=>{
      e.preventDefault();
      const number=JSON.parse(e.target.value)
      setShowPhone(number);
    }

    const handelisActive=(e)=>{
      e.preventDefault();
      const number=JSON.parse(e.target.value)
      setIsActive(number);
    }

    const addYear=(e)=>{
      e.preventDefault();
      setCurrentDate(currentDate+1);
      setDateState(true);
    }

    const SubsYear=(e)=>{
      e.preventDefault();
      let date=new Date().getFullYear();
      if(currentDate===date) return setCurrentDate(currentDate);
       setCurrentDate(currentDate-1);
       setDateState(true);
    }

    const removeImage=(index)=>{
      async function updateImage(){
        await  axios.post(`https://7didan.com/api/v1/index/updateImage`,{item:box,
        index:index}).then((response) => {
           });
       } 
       updateImage();
      swal('image has been removed');
      navigate("/ProfilesList");
    }

    const removeImageURL=(indexURL)=>{
      async function updateImageURL(){
        await  axios.post(`https://7didan.com/api/v1/index/updateImageURL`,{item:box,
        index:indexURL}).then((response) => {
           });
       } 
       updateImageURL();
       swal('image has been removed');
       navigate("/ProfilesList");
    }

    const addNewImage = async e =>{
      e.preventDefault()
      swal('wait wait wait uploading....!!!!!!');
      try {
          for(const file of e.target.files)
          {
              if(!file) return alert("File not exist.")
  
              if(file.size > 1024 * 1024) // 1mb
                  return alert("Size too large!")
  
              if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                  return alert("File format is incorrect.")
                  
              let formData = new FormData()
              formData.append('file', file)
              const res = await axios.post('https://7didan.com/api/v1/upload', formData, {
                  headers: {'content-type': 'multipart/form-data' } //Authorization: token
               })
           console.log('res.data',res.data)
           setPicsURL([...picsURL, res.data])
            console.log('picsURL inside after',picsURL)
           swal('done');
            
          }      
      } catch (err) {
          alert(err.response.data.msg);
      }
  }

  const handleDescription=e=>{
    e.preventDefault();
    setImageURL(e.target.value)
  }
   
  const handleImagesURL= async e =>{
    e.preventDefault();
    if(imageURL.trim()==='') return alert('url cannot be empty!');
     setImagesURL([...imagesURL, imageURL])
    setImageURL('')
  }

     return (
       <>
       {loggedIn===false && navigate("/")}
        <div className='updateItem'>
          {loggedIn===false && navigate("/")}

           <Input defaultValue={fullname} className='profileName' 
           name='fullName' style={{fontSize:'22px',fontWeight:'bold'}}  
            onChange={handleNameInput} required />

            <Input value={address} className='profileName' name='address'
            style={{fontSize:'22px',fontWeight:'bold'}} 
            onChange={handleAddressInput} required />

          <Input value={phone} className='profileName' name='phone'
           style={{fontSize:'22px',fontWeight:'bold'}} type='number' 
           onChange={handlePhoneInput} required /> 

           <textarea value={description} className='profileArea' name='description'
           style={{fontSize:'22px',fontWeight:'bold'}} placeholder='الوصف'
           onChange={handleDescriptionInput} required autoComplete="off" />

           <div className='UpdateProfile_phone'>
           <div className='UpdateProfile_phoneLeft'>
              <span style={{fontSize:'18px',fontWeight:'bold'}}> number is appeared? </span>
              <Input value={showPhone} className='UpdateprofileInput' name='phone'
              style={{fontSize:'18px',fontWeight:'bold',width:'80px',margin:'20px'}} 
               readOnly />
           </div>

           <div className='UpdateProfile_phoneRight'>
             <span style={{fontSize:'18px',fontWeight:'bold',marginLeft:'120px'}}> 
                    change displaying number :</span>
              <select style={{fontSize:'18px',fontWeight:'bold',height:'40px'}}  name='phone'
               onChange={handelshowPhone}  >
              <option value="">إختر ظهور الهاتف</option>
              <option value="true" >ظاهر</option>
              <option value="false">مخفي</option>
            </select>
           </div>
           </div>

           <div className='UpdateProfile_phone'>
           <div className='UpdateProfile_phoneLeft'>
              <span style={{fontSize:'18px',fontWeight:'bold'}}> is Paid ? </span>
              <Input value={isPaid} className='UpdateprofileInput' name='phone'
              style={{fontSize:'18px',fontWeight:'bold',width:'80px',margin:'20px'}} 
               readOnly />
           </div>

           <div className='UpdateProfile_phoneRight'>
             <span style={{fontSize:'18px',fontWeight:'bold',marginLeft:'120px'}}> 
                    change displaying number :</span>
              <select style={{fontSize:'18px',fontWeight:'bold',height:'40px'}}  name='phone'
               onChange={handelisPaid}  >
              <option value="">تغير قيمة الدفع</option>
              <option value="true" >مدفوع</option>
              <option value="false">غير مدفوع</option>
            </select>
           </div>
           </div>

          <div className='UpdateProfile_Days'>
          <span style={{fontSize:'18px',fontWeight:'bold'}}> End Subscription : </span>
          <Input value={endSubscription} className='UpdateprofileInput' name='phone'
          style={{fontSize:'18px',fontWeight:'bold',width:'80px',margin:'10px',width:'100px'}} 
           readOnly />


           <span style={{fontSize:'18px',fontWeight:'bold',marginLeft:'140px'}}> change the Period  :</span>
              
            <button style={{fontSize:'24px',fontWeight:'bold',backgroundColor:'black',
            marginTop:'5px',color:'white',borderRadius:'20px',paddingLeft:'25px',
            paddingRight:'25px'}} onClick={addYear}> +  </button>

           <span style={{marginLeft:'10px',marginRight:'10px',fontSize:'20px',fontWeight:'bold'}}>{currentDate}</span>

            <button style={{fontSize:'24px',fontWeight:'bold',backgroundColor:'black',
            marginTop:'5px',borderRadius:'20px',color:'white',paddingLeft:'25px',
            paddingRight:'25px'}} onClick={SubsYear}> - </button>
          </div>

          <div className='UpdateProfile_phone'>
          <div className='UpdateProfile_phoneLeft'>
             <span style={{fontSize:'18px',fontWeight:'bold'}}> is Active ? </span>
             <Input value={isActive} className='UpdateprofileInput' name='phone'
             style={{fontSize:'18px',fontWeight:'bold',width:'80px',margin:'20px'}} 
              readOnly />
          </div>

          <div className='UpdateProfile_phoneRight'>
            <span style={{fontSize:'18px',fontWeight:'bold',marginLeft:'120px'}}> 
                   change displaying number :</span>
             <select style={{fontSize:'18px',fontWeight:'bold',height:'40px'}}  name='phone'
              onChange={handelisActive}  >
             <option value="">تغيير حالة الحساب</option>
             <option value="true" >الحساب فعال</option>
             <option value="false">الحساب غير فعال</option>
           </select>
          </div>
          </div>
        </div>

        <div className='profileUpdateImages'>
        <div className='profileUpdateImages__create'>
        <input type='file' onChange={addNewImage} className='profileUpdateFiles'  />
        </div>
        {box && box.images.map((item)=>{
          return (<div className='profileUpdateSingleImages'  key={item.public_id}>
            <img src={item.url} alt='oops' height='200px' style={{margin:'10px',objectFit:'contain'}}  />
             <Button size="large" variant="contained" color="primary"  
               onClick={()=>removeImage(box.images.indexOf(item))} style={{fontSize:'16px',fontWeight:'bold',
               backgroundColor: "red"}}  > Remove image </Button>
            </div>)
        }) 
        }
        </div>
        <div className='profileUpdateImages'>
        {box && box.imagesURL.map((item,idx)=>{
         return (<div className='profileUpdateSingleImages'  key={idx}>
         <img src={item} alt='oops' height='200px' style={{margin:'10px',objectFit:'contain'}}  />
           <Button size="large" variant="contained" color="primary"  
           onClick={()=>removeImageURL(box.imagesURL.indexOf(item))} style={{fontSize:'16px',fontWeight:'bold',
               backgroundColor: "red"}}  > Remove URL</Button>
            </div>)
        }) 
        }
        
        </div>

        <div className='createProfile__form'>
        <textarea value={imageURL} className='profileName' name='description'
         style={{width:'700px',fontSize:'18px',fontWeight:'bold'}} placeholder='image URL' 
          onChange={handleDescription} autoComplete="off" />

        <Button size="large" onClick={handleImagesURL} variant="contained" style={{backgroundColor:'black',
            fontSize:'18px',fontWeight:'bold'}}>add URL</Button>
        </div>

        <div className='profileUpdateButton'>
        <Button size="large" variant="contained" color="primary"  
        onClick={handleSubmit} style={{fontSize:'18px',fontWeight:'bold',marginLeft:'50px'}} 
        startIcon={<DeleteIcon />}> تعديل العنصر</Button>
        </div>
        
       

        </>
    )
}

export default UpdateProfile
