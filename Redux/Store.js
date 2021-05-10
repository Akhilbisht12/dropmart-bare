import { createStore } from "redux";
import RootReducer from "./RootReducer";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = AsyncStorage;
const persistConfig = {
    key: 'root',
    storage: Storage,
    whitelist : ['cart','user', 'wishlist']
   };

const pReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
