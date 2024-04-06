import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const  initialState = {
    totalItems:localStorage.getItem("totalItems") ? 
    JSON.parse(localStorage.getItem("totalItems")):0,

};

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducer:{
        setTotalItems(state,value){
            state.totalItems = value.payload;
        }
        // addtocart
        // removeCart
        // resetCart

    }
})

export const{setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;