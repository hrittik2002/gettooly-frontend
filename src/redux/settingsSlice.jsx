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
        available_time : '2023-05-16T18:30:00Z',
        exam_duration : 0,
        is_form_valid : true,
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
       },
       set_available_time : (state , action) =>{
        state.available_time = action.payload;
       },
       set_exam_duration : (state , action) =>{
        state.exam_duration = action.payload;
       },
       set_is_form_valid : (state , action) =>{
        state.is_form_valid = action.payload;
        console.log(action.payload)
       }
    }
});

export const { 
    set_collect_email,
    set_authenticated_responder,
    set_edit_after_submit,
    set_confirmation_message,
    set_is_quiz,
    set_allow_view_score,
    set_available_time,
    set_exam_duration,
    set_is_form_valid,
 } = settingsSlice.actions;
export default settingsSlice.reducer;