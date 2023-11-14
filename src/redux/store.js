import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// importa tus reducers aquí
// import { reducer as exampleReducer } from './exampleSlice';
import authReducer from "./slices/AuthSlice";
import homeReducer from "./slices/HomeSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'home'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  // otros reducers aquí
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [...getDefaultMiddleware({ thunk })]; // Actualización de la firma

export const store = configureStore({
  reducer: {
    persistedData: persistedReducer,
    // otros reducers aquí
  },
  middleware,
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
