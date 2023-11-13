import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// importa tus reducers aquí
// import { reducer as exampleReducer } from './exampleSlice';
import authReducer from "./slices/AuthSlice";
import compensationsReducer from "./slices/CompensationsSlice";
import helpersReducer from "./slices/HelpersSlice";
import registerReducer from "./slices/RegisterSlice";
import resultsReducer from "./slices/ResultsSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'register'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  // otros reducers aquí
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [...getDefaultMiddleware({ thunk })]; // Actualización de la firma

export const store = configureStore({
  reducer: {
    persistedData: persistedReducer,
    // otros reducers aquí
    compensations: compensationsReducer,
    helpers: helpersReducer,
    results: resultsReducer,
  },
  middleware,
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
