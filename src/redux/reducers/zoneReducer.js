// the reducer create the initial state and the action

import { ActionTypes } from "../constants/action-types";

const initialState={
    zones:[]
}

export const zoneReducer=(state=initialState,{type,payload})=>{
    switch(type)
    {
     case ActionTypes.SET_ZONES:
         return {...state,zones:payload};
     
         case ActionTypes.FETCH_ZONES:
            return {...state,zones:payload};    
         default :
         return state;
    }
}

export const selectedZoneReducer=(state={},{type,payload})=>{
         switch(type){
          case ActionTypes.SELECTED_ZONE:
              return {...state,...payload};

          case ActionTypes.FETCH_ZONE:
             return {...state,...payload};   

         case ActionTypes.REMOVE_SELECTED_ZONE:
                return {}

              default :
              return state;
              
         }
}