import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user/UserSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, UserSlice)

export const Store = configureStore({
    reducer: {
        user:persistedReducer
    }
})

export const persistor = persistStore(Store)