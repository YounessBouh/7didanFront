// the reducer create the initial state and the action

import { ActionTypes } from "../constants/action-types";

const initialState={
    cities:[]
}

export const cityReducer=(state=initialState,{type,payload})=>{
    switch(type)
    {
     case ActionTypes.SET_CITIES:
         return {...state,cities:payload};
     
         case ActionTypes.FETCH_CITIES:
            return {...state,cities:payload};    
         default :
         return state;
    }
}

export const selectedCityReducer=(state={},{type,payload})=>{
         switch(type){
          case ActionTypes.SELECTED_CITY:
              return {...state,...payload};

          case ActionTypes.FETCH_CITY:
             return {...state,...payload};   

         case ActionTypes.REMOVE_SELECTED_CITY:
                return {}

              default :
              return state;
              
         }
}