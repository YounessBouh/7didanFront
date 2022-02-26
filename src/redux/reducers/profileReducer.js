// the reducer create the initial state and the action

import { ActionTypes } from "../constants/action-types";

const initialState={
    profiles:[]
}

export const profileReducer=(state=initialState,{type,payload})=>{
    switch(type)
    {
     case ActionTypes.SET_PROFILES:
         return {...state,profiles:payload};
     
         case ActionTypes.FETCH_PROFILE:
            return {...state,profiles:payload};    
         default :
         return state;
    }
}

export const selectedProfileReducer=(state={},{type,payload})=>{
         switch(type){
          case ActionTypes.SELECTED_PROFILE:
              return {...state,...payload};

          case ActionTypes.FETCH_CATEGORY:
             return {...state,...payload};   

         case ActionTypes.REMOVE_SELECTED_PROFILE:
                return {}

              default :
              return state;
              
         }
}