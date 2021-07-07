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

function App() {
    const { setData } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // get data from the server
        const getData = async () => {
            try {
                const response = await axios.get(
                    "/products"
                );
                if (response) {
                    setData(response.data.product);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

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
