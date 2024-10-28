import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';    
import { combineReducers } from 'redux';
import pollSlice from "./pollSlice.js";
import userSlice from "./userSlice.js";
 const persistConfig = {
    key: 'root',
    storage,
  version:1,
  };
  const rootReducer = combineReducers({
    poll:pollSlice,   
    user:userSlice ,
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);
  export { store, persistor };
  
