import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FilterProvider } from "./contexts/FilterContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import axios from "axios";

axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL ||
    "https://Caffe-Backend.theprakashkumar.repl.co";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <DataProvider>
                    <CartProvider>
                        <WishlistProvider>
                            <FilterProvider>
                                <App />
                            </FilterProvider>
                        </WishlistProvider>
                    </CartProvider>
                </DataProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
