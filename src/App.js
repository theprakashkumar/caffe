import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PrivateRoutes from "./utils/PrivateRoutes";
import Footer from "./components/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { WishlistContext } from "./contexts/WishlistContext";
import axios from "axios";
import { CartContext } from "./contexts/CartContext";
import Profile from "./pages/Profile";
import { AddressContext } from "./contexts/AddressContext";

function App() {
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { getAddress } = useContext(AddressContext);

    const { isUserLogin, userId, token } = useContext(AuthContext);

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
        if (isUserLogin) {
            getCart();
            getWishlist();
            getAddress();
        }
        // eslint-disable-next-line
    }, [isUserLogin]);

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
                    <PrivateRoutes path="/profile" element={<Profile />} />
                    <PrivateRoutes path="/checkout" element={<Checkout />} />
                </Routes>
                <Footer />
            </header>
        </div>
    );
}

export default App;
