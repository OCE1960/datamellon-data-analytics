import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import salesDataReducer from './features/salesDataSlice';
import storage from "redux-persist/lib/storage";
import { combineReducers } from 'redux';
import { persistReducer,  FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER, } from "redux-persist";

/* export const store = configureStore({
  reducer: {
    salesDatas: salesDataReducer,
  },
}); */

const reducers = combineReducers({
  salesDatas: salesDataReducer,
})

const persistConfig = {
key: 'root',
storage,
version: 1,
whitelist: ['salesDatas']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
reducer: persistedReducer,
devTools: process.env.NODE_ENV !== 'production',
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({
serializableCheck: {
ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
},
}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
