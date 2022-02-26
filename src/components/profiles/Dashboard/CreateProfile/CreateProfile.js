import React,{useState,useEffect,useContext} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import swal from 'sweetalert';
import './CreateProfile.css'

function CreateProfile() {
    const initialState = {
        FullName: '',
        address: '',
        description: '',
        cityId: '',
        categoryId: '',
        zoneId: '',
        phone: '',
        days: 0,
        isActive:true,
        showPhone:true,
        isPaid:true,
        endSubscription:'',
        reclamationNr:0,
        pics:[],
        imagesURL:[]
    }

    const initialDays={sevenDays:7,onemonth:31,sixMonth:183,oneYear:365}
    const [profile, setProfile] = useState(initialState);
    const [categories,setCategories]=useState([]);
    const [cities,setCities]=useState([]);
    const [zones,setZones]=useState([]);
    const [imageURL, setImageURL] = useState('')
    const { loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [imagesURL, setImagesURL] = useState([])
    
    
     async function loadCities(){
      await  axios.get('https://7didan.com/api/v1/locations').then((response) => {
       setCities(response.data.data)
       });} 

       async function loadCategories(){
        await  axios.get('https://7didan.com/api/v1/categories').then((response) => {
            setCategories(response.data.data)
       });} 
         
         async function loadZones(){
            await  axios.get(`https://7didan.com/api/v1/zones?cityId=${profile.cityId}`).then((response) => {
                setZones(response.data.data)
       });} 
        

       useEffect(() => {
        loadCategories();
        loadCities();
         }, []);
   
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProfile({...profile, [name]:value})
    }


    const addProfile= async ()=>{
      console.log('days==>',profile.days)
        if(profile.days==null || profile.days===0)
        {
          profile.days=365;
        }
        if(profile.categoryId.trim()==='' || profile.cityId.trim()==='' || profile.zoneId.trim()==='' 
        || profile.phone.trim()==='' || profile.description.trim()===''
        || profile.address.trim()==='' || profile.FullName.trim()===''  )
          return alert('cannot be empty');
           

          await  axios.post('https://7didan.com/api/v1/index',{FullName:profile.FullName,
          address:profile.address,description:profile.description,cityId:profile.cityId,
          categoryId:profile.categoryId,zoneId:profile.zoneId,phone:profile.phone,days:profile.days,
          showPhone:profile.showPhone,isPaid:initialState.isPaid,images:initialState.pics,
          isActive:initialState.isActive, endSubscription:initialState.endSubscription,
          imagesURL:imagesURL}
        ).then((response) => {
            setProfile(initialState);
           // navigate('/ProfilesList')
            navigate('/')

        });
       }  


    const getZones=()=>{
        if(profile.categoryId.trim()==='' || profile.cityId.trim()==='')
                     return alert('Plz select category and city');
        loadZones();
      }
    
      const showProfile=(e)=>{
          profile.showPhone=e.target.value;
      }
      const handleIsPaid=(e)=>{
        if(e.target.value.trim()==='') return alert('cannot be empty')
        initialState.isPaid=e.target.value;
      }
      const handleIsActive=(e)=>{
        if(e.target.value.trim()==='') return alert('cannot be empty')
        initialState.isActive=e.target.value;
      }

      const handleUpload = async e =>{
        e.preventDefault()
        swal('wait wait wait for uploading............!!!!');
        try {
            initialState.pics=[];
            for(const file of e.target.files)
            {
              //  const file = e.target.files[0]
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
             //   setImages(res.data)
               initialState.pics.push(res.data)
            }
            
            
            if(initialState.pics.length === 0)
               {
                swal('unfortunatilly the images not added');
               }
            else{
                swal('done');
               }
            
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    
    const handleImagesURL= async e =>{
      e.preventDefault();
      if(imageURL.trim()==='') return alert('url cannot be empty!');
      setImagesURL([...imagesURL, imageURL])
      console.log(imagesURL);
      setImageURL('')
    }

   
    const handleDescription=e=>{
      e.preventDefault();
      setImageURL(e.target.value)
    }
    

      return (
        <div className='createItem'>
        {loggedIn===false && navigate("/")}
       
        <div className='createItem__left'>
             <input value={profile.FullName} className='createItemInput__option1' name='FullName'
              style={{fontSize:'22px',fontWeight:'bold'}} placeholder='الإسم الكامل'
             onChange={handleChangeInput} required  autoComplete="off" />

             <input value={profile.phone} className='createItemInput__option2' name='phone' type='number'
             style={{fontSize:'22px',fontWeight:'bold'}} placeholder='الهاتف'
           onChange={handleChangeInput} required autoComplete="off" />

            <input value={profile.address} className='createItemInput__option3' name='address'
               style={{fontSize:'22px',fontWeight:'bold'}} placeholder='العنوان'
            onChange={handleChangeInput} required autoComplete="off" />
            
            
           <textarea value={profile.description} className='profileName' name='description'
            style={{fontSize:'22px',fontWeight:'bold'}} placeholder='الوصف'
            onChange={handleChangeInput} required autoComplete="off" />

            <div className='createProfile__form'>
              <textarea value={imageURL} className='profileName' name='description'
               style={{width:'700px',fontSize:'18px',fontWeight:'bold'}} placeholder='image URL' 
                onChange={handleDescription} autoComplete="off" />

                <Button size="large" onClick={handleImagesURL} variant="contained" style={{backgroundColor:'black',
                  fontSize:'18px',fontWeight:'bold'}}>add URL</Button>
              </div>
            
        </div>
        <div  className='createItem__right'>
               
              <select name='categoryId' value={profile.categoryId} onChange={handleChangeInput} 
                 className='profileDrop'>
                <option value="">select category</option>
             {categories.map(category=>{
               return( 
                     <option value={category._id} key={category._id} >{category.name}</option>
                 )
             })}
           </select>

            <select name='cityId' value={profile.cityId} onChange={handleChangeInput} 
                 className='profileDrop'>
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
                  className='profileDrop'>
                <option value="">select zone</option>
              {zones.map(zone=>{
               return( 
                     <option value={zone._id} key={zone._id} >{zone.name}</option>
                 )
             })}
            </select>
              
          
            
               <select name='days' value={profile.days} onChange={handleChangeInput} 
               className='profileDrop'>
                 <option value="">select  package</option>
                 <option value={initialDays.sevenDays} > سبعة أيام </option>
                 <option value={initialDays.onemonth}>شهر واحد </option>
                 <option value={initialDays.sixMonth}>ستة أشهر</option>
                 <option value={initialDays.oneYear}>سنة واحدة</option>
               </select>   
             
            <div className='profileRadio'>

              <select name='isPaid'  onChange={handleIsPaid} 
                  className='profileDrop'>
              <option value="">Select is Paid ?</option>
              <option value={true} > True </option>
              <option value={false}> False </option>
             </select>

              <select name='isPaid'  onChange={handleIsActive} 
                  className='profileDrop'>
              <option value="">Select is Active ?</option>
              <option value={true} > True </option>
              <option value={false}> False </option>
             </select>
           
              <input type="radio"  value={true}  
              onClick={showProfile} name='showPhone'   className='profileRadio__right' /> 
              <span className='profileRadio__right__span'>إخفاء رقم الهاتف</span>    
              
             <input type="radio" value={false} onClick={showProfile} 
                     className='profileRadio__right' name='showPhone'  /> 
                 <span className='profileRadio__right__span'>إظهار رقم الهاتف</span>   
             
             
                 <input multiple={true} type="file"  color='primary' className='profileMultipleFiles'
                 onChange={handleUpload}/>     
             
                 <Button size="large" variant="contained" color="primary" onClick={addProfile}
                 style={{fontSize:'18px',fontWeight:'bold',marginTop:'30px',marginLeft:'800px'}} > إظافة عنصر جديد</Button>    
            </div>
          
            
        </div>
       
        </div>
    )
}

export default CreateProfile
