import categoryApi from "../../api/contextAPI";
import { ActionTypes } from "../constants/action-types";




export const fetchCategories= ()=> async (dispatch)=>{
    const response= await categoryApi.get('/categories');
    dispatch({type:ActionTypes.SET_CATEGORIES,payload:response.data.data})
  }

  export const fetchCategory= (id)=> async (dispatch)=>{
    const response= await categoryApi.get(`/categories/${id}`);
    dispatch({type:ActionTypes.FETCH_CATEGORY,payload:response.data.data})
  }


// we will build three arrow functions for action types,
//which return an object with types and payload.

export const setCategories=(categories)=>{
    return{
    type:ActionTypes.SET_CATEGORIES,
    payload:categories
    }
}

export const selectedCategory=(category)=>{
    return{
    type:ActionTypes.SELECTED_CATEGORY,
    payload:category
    }
}

export const removeSelectedCategory=()=>{
    return{
    type:ActionTypes.REMOVE_SELECTED_CATEGORY,
    
    }
}



