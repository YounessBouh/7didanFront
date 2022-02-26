import zoneApi from "../../api/contextAPI";
import { ActionTypes } from "../constants/action-types";




export const fetchZones= (cityId)=> async (dispatch)=>{
    console.log("zoneaction",cityId)
    const response= await zoneApi.get(`/zones?cityId=${cityId._id}`);
    dispatch({type:ActionTypes.SET_ZONES,payload:response.data.data})
  }

  export const fetchZone= (id)=> async (dispatch)=>{
    const response= await zoneApi.get(`/zones/${id}`);
    dispatch({type:ActionTypes.FETCH_ZONE,payload:response.data.data})
  }


// we will build three arrow functions for action types,
//which return an object with types and payload.

export const setZones=(zones)=>{
    return{
    type:ActionTypes.SET_ZONES,
    payload:zones
    }
}

export const selectedZone=(zone)=>{
    return{
    type:ActionTypes.SELECTED_ZONE,
    payload:zone
    }
}

export const removeSelectedZone=()=>{
    return{
    type:ActionTypes.REMOVE_SELECTED_ZONE,
    
    }
}



