import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import formReducer from './formSlice'
import questionsReducer from './questionsSlice'
import settingsReducer from './settingsSlice'
import usertypeReducer from './usertypeSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

 const persistedUsertypeReducer = persistReducer(persistConfig, usertypeReducer)
const persistedFormReducer = persistReducer(persistConfig, formReducer)
const persistQuestionsReducer = persistReducer(persistConfig, questionsReducer)
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);

export const store = configureStore({
  reducer: {
    user : userReducer,
    form : persistedFormReducer,
    questions : persistQuestionsReducer,
    settings : persistedSettingsReducer,
    usertype : persistedUsertypeReducer,
  },
})

export const persistor = persistStore(store)

