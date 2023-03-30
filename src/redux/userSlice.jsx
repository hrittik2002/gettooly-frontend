import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "user",
    initialState : {
        currentUser : null,
        isFetching : false,
        error : false
    },
    reducers : {
        loginStart : (state) => {
            state.isFetching = true;
        },
        loginSuccess : (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure : (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
        setUserData : (state , action) =>{
            state.currentUser = action.payload;
           // console.log(state.currentUser);
        }
    }
});

export const { loginStart, loginSuccess, loginFailure , setUserData } = userSlice.actions;
export default userSlice.reducer;