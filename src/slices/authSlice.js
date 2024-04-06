// Here we are creating slice for authentication 
// Where we taking token from localStorage in oure initial State.
// Then we are changing the the value of token through state by 
//  creating a reducers where we pass state and value.
// We will change the state by taking the value from value.payload.

import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    token: localStorage.getItem("token") ? 
    JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        }
    }
});

export const {setToken} = authSlice.actions;
export default authSlice.reducer;