import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import formReducer from './formSlice'
import questionsReducer from './questionsSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)
const persistedFormReducer = persistReducer(persistConfig, formReducer)
const persistQuestionsReducer = persistReducer(persistConfig, questionsReducer)

export const store = configureStore({
  reducer: {
    user : persistedUserReducer,
    form : persistedFormReducer,
    questions : persistQuestionsReducer,
  },
})

export const persistor = persistStore(store)

