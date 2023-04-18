import { createSlice } from "@reduxjs/toolkit"

const colorSlice = createSlice({
    name : "color",
    initialState : {
        backgroundColor : "red"
    },
    reducers : {
       
    }
});

export const {  } = colorSlice.actions;
export default colorSlice.reducer;