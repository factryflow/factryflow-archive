import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/es/integration/react";

import App from "./App.tsx";
import { store, persistor } from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
