import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"User",
    initialState:{
       
       userInfo:null,
        choicesId:null,
        
        
    },reducers:{
        
        setuserChoiceId(state,action){
            state.choicesId = action.payload;
        },
        setuserInfo(state,action){
            state.userInfo = action.payload;
        },

    }
})
export const {setuserChoiceId,setuserInfo} = userSlice.actions;
export default userSlice.reducer;
