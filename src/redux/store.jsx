import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import formReducer from './formSlice'
import questionsReducer from './questionsSlice'

export const store = configureStore({
  reducer: {
    user : userReducer,
    form : formReducer,
    questions : questionsReducer,
  },
})
