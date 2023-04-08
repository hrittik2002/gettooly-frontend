import { createSlice } from "@reduxjs/toolkit"

const formSlice = createSlice({
    name : "form",
    initialState : {
        code : "",
        title : "",
        creator : ""
    },
    reducers : {
        setFormCode : (state , action) => {
            state.code = action.payload;
        },
        setFormTitle : (state , action) => {
            state.title = action.payload;
        },
        setFormCreator : (state , action) => {
            state.creator = action.payload;
        }
        
    }
});

export const { setFormCode , setFormTitle , setFormCreator } = formSlice.actions;
export default formSlice.reducer;