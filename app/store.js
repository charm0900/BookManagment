import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import { createStore } from 'redux';
// import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import bookSlice from './bookSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'


/**
 * config for persist redux, whitlist tell the bookReducer to persist in local sotrage
 */
const persistConfig = {
    key: "books",
    storage: storage,
    whitelist: ['booksReducer']
}

/**
 * normal reducer to point to bookSlice, the file that sets up the state and state interactions
 */
const rootReducer = combineReducers({
    booksReducer:  bookSlice
});

/**
 * persistedReducer made with its config and the rootreducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);


/**
 * configure the store which holds the reducers, and handles state that 
 * will be accesbile by whatever function tap into it
 */
export const store = configureStore({
    reducer: {
      bookList: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  })

/**
 * persistor store that needs to be handed to a PersistGate wrapped around the app, so the whol app has access to it
 */
export const persistor = persistStore(store);