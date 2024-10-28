import { createSlice } from "@reduxjs/toolkit";

const pollSlice = createSlice({
    name:"poll",
    initialState:{
        question:null,
        options:[],
        userChoice:[],
        
        
    },reducers:{
        setQuestion(state,action){
            state.question = action.payload;
        },
        setOptions(state,action){
            state.options = action.payload;
        },
        setuserChoice(state,action){
            state.userChoice = action.payload;
        },

    }
})
export const {setQuestion,setOptions,setuserChoice} = pollSlice.actions;
export default pollSlice.reducer;
