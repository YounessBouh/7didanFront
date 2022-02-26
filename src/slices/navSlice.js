import { createSlice } from '@reduxjs/toolkit'



const initialState={
    category:null,
    city:null,
    zone:null,
    profile:null,
    box:null
}


export const navSlice = createSlice({

 name:'nav',
 initialState,
 reducers:{
     setCategory:(state,action)=>{
         state.category=action.payload
     },
     setCity:(state,action)=>{
        state.city=action.payload
    },
    setZone:(state,action)=>{
        state.zone=action.payload
    },
    setProfile:(state,action)=>{
        state.profile=action.payload
    },
    setBox:(state,action)=>{
        state.box=action.payload
    },
 }
});

// export actions
export const {setCategory,setCity,setZone,setProfile,setBox}=navSlice.actions;

// export selectors
export const selectCategory=(state)=>state.nav.category;
export const selectCity=(state)=>state.nav.city;
export const selectZone=(state)=>state.nav.zone;
export const selectProfile=(state)=>state.nav.profile;
export const selectBox=(state)=>state.nav.box;
export default navSlice.reducer;
