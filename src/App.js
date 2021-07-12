import "./App.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { DataContext } from "./contexts/DataContext";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import { AuthContext } from "./contexts/AuthContext";
import { WishlistContext } from "./contexts/WishlistContext";
import { CartContext } from "./contexts/CartContext";

function App() {
    const { setData } = useContext(DataContext);
    const { isUserLogin, token, userId } = useContext(AuthContext);
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { dispatch: cartDispatch } = useContext(CartContext);

    // get data from the server
    const getData = async () => {
        try {
            const response = await axios.get("/products");
            if (response.data.success) {
                setData(response.data.product);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // get cart data from server
    const getCart = async () => {
        try {
            const response = await axios.get(`/cart/${userId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.data.success) {
                cartDispatch({
                    type: "SYNC_CART",
                    payload: {
                        product: response.data.cart.cartItems,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // load data from the server
    const getWishlist = async () => {
        try {
            const response = await axios.get(`/wishlist/${userId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.data.success) {
                wishlistDispatch({
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.wishlist.wishlistItems,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
        if (isUserLogin) {
            getWishlist();
            getCart();
        }
    }, []);
    useEffect(() => {
        if (isUserLogin) {
            getWishlist();
            getCart();
        }
    }, [isUserLogin]);

    return (
        <div className="App">
            <header className="App-header">
                <Nav />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <PrivateRoutes path="/wishlist" element={<Wishlist />} />
                    <PrivateRoutes path="/cart" element={<Cart />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;
