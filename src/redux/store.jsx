import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import formReducer from './formSlice'
import questionsReducer from './questionsSlice'
import colorReducer from './colorSlice'
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
const persistedColorReducer = persistReducer(persistConfig, colorReducer);

export const store = configureStore({
  reducer: {
    user : persistedUserReducer,
    form : persistedFormReducer,
    questions : persistQuestionsReducer,
    color : persistedColorReducer,
  },
})

export const persistor = persistStore(store)

