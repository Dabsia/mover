import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n";
import { HelmetProvider } from "react-helmet-async";
import { APIProvider } from "@vis.gl/react-google-maps";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({});
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HelmetProvider>
            <BrowserRouter>
              <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <App />
              </APIProvider>
            </BrowserRouter>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
