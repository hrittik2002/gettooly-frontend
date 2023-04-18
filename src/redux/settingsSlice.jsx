import { createSlice } from "@reduxjs/toolkit"

const settingsSlice = createSlice({
    name : "settings",
    initialState : {
        collect_email : false ,
        authenticated_responder : false,
        edit_after_submit : false,
        confirmation_message : "",
        is_quiz : false,
        allow_view_score : false,
    },
    reducers : {
       set_collect_email : (state , action) =>{
        state.collect_email = action.payload;
       },
       set_authenticated_responder : (state , action) =>{
        state.authenticated_responder = action.payload;
       },
       set_edit_after_submit : (state , action) =>{
        state.edit_after_submit = action.payload;
       },
       set_confirmation_message : (state , action) =>{
        state.confirmation_message = action.payload;
       },
       set_is_quiz : (state , action) =>{
        state.is_quiz = action.payload;
       },
       set_allow_view_score : (state , action) =>{
        state.allow_view_score = action.payload;
       }

    }
});

export const { 
    set_collect_email,
    set_authenticated_responder,
    set_edit_after_submit,
    set_confirmation_message,
    set_is_quiz,
    set_allow_view_score
 } = settingsSlice.actions;
export default settingsSlice.reducer;