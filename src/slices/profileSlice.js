// Here we are creating the slice of profile
// in initialState we are taking user as null, since user has not 
// done login or signup
// After it will give the value therough payload then we are going to
// put the value in user

import { createSlice } from "@reduxjs/toolkit"

const initalState = {
    user:null,
}

const profileSlice = createSlice({
    name:"profile",
    initialState:initalState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        }
    }
});

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;