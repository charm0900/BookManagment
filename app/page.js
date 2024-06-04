'use client'
import Home from "@/Manager/Home";

import { Provider } from 'react-redux'
import { store } from './store'
import { persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate  persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>
    </>
  );
}
