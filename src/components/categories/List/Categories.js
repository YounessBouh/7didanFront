import React,{useEffect,useState} from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../../slices/navSlice";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loading from "../../util/loading/Loading";
import './Categories.css'

const CategoryListing=()=>{
  const[categories,setCategories]=useState([]);
  const [loading, setLoading] = useState(false)
  const dispatch=useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData(){
      await  axios.get('https://www.optimusmaroc.com/api/v1/categories').then((response) => {
          setCategories(response.data.data)
         });
        }  
        loadData();
        setLoading(true)
     }, []);

     const handelRequest=(item)=>{
       dispatch(setCategory(item));
       navigate("/Cities");
     }


    return (
      <>
        <div className='categoryListing'>
         {categories.map((item)=>{
          return (
              <div  className='CategoryItem'   key={item._id} 
              onClick={(event) =>{handelRequest(item)}}>
                  <p className='CategoryName'>{item.name}</p>
          </div>
          )
      })}
       </div>
       {categories.length===0 && <Loading />}
       </>
    )
}

export default CategoryListing;