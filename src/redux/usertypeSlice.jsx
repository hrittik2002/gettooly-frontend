import { createSlice } from "@reduxjs/toolkit"

const usertypeSlice = createSlice({
    name : "user",
    initialState : {
        userType : "",
    },
    reducers : {
        setUserType : (state, action) => {
            state.userType = action.payload;
        },
    }
});

export const { setUserType } = usertypeSlice.actions;
export default usertypeSlice.reducer;