import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Auth0Provider
        domain="dev-1w1egc5y.us.auth0.com"
        clientId="mv0SmaV7wa25axSRRVJ3LVFBJgBIy7j7"
        redirectUri={window.location.origin}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </ChakraProvider>
  </BrowserRouter>
);
