import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SearchProvider } from "./context/Search";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
