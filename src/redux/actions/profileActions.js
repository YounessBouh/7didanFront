import profileApi from "../../api/contextAPI";
import { ActionTypes } from "../constants/action-types";




export const fetchProfiles= (cityId,zoneId,categoryId)=> async (dispatch)=>{
    const response= await profileApi.get(`/index?cityId=${cityId}&zoneId=${zoneId}&categoryId=${categoryId}`);
    dispatch({type:ActionTypes.SET_PROFILES,payload:response.data.data})
  }

  export const fetchProfile= (id)=> async (dispatch)=>{
    const response= await profileApi.get(`/index/${id}`);
    dispatch({type:ActionTypes.FETCH_PROFILE,payload:response.data.data})
  }


// we will build three arrow functions for action types,
//which return an object with types and payload.

export const setProfiles=(profiles)=>{
    return{
    type:ActionTypes.SET_PROFILES,
    payload:profiles
    }
}

export const selectedProfile=(profile)=>{
    return{
    type:ActionTypes.SELECTED_PROFILE,
    payload:profile
    }
}

export const removeSelectedProfile=()=>{
    return{
    type:ActionTypes.REMOVE_SELECTED_PROFILE,
    
    }
}



