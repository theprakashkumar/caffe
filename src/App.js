import "./App.css";
import axios from "axios";
import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import PrivateRoutes from "./utils/PrivateRoutes";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <PrivateRoutes path="/wishlist" element={<Wishlist />} />
                    <PrivateRoutes path="/cart" element={<Cart />} />
                </Routes>
                <Footer />
            </header>
        </div>
    );
}

export default App;
