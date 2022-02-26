import cityApi from "../../api/contextAPI";
import { ActionTypes } from "../constants/action-types";




export const fetchCities= ()=> async (dispatch)=>{
    const response= await cityApi.get('/locations');
    dispatch({type:ActionTypes.SET_CITIES,payload:response.data.data})
  }

  export const fetchCity= (id)=> async (dispatch)=>{
    const response= await cityApi.get(`/locations/${id}`);
    dispatch({type:ActionTypes.FETCH_CITY,payload:response.data.data})
  }


// we will build three arrow functions for action types,
//which return an object with types and payload.

export const setCities=(cities)=>{
    return{
    type:ActionTypes.SET_CITIES,
    payload:cities
    }
}

export const selectedCity=(city)=>{
    return{
    type:ActionTypes.SELECTED_CITY,
    payload:city
    }
}

export const removeSelectedCity=()=>{
    return{
    type:ActionTypes.REMOVE_SELECTED_CITY,
    
    }
}



