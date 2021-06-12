import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { FilterProvider } from "./contexts/FilterContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
            <FilterProvider>
              <Nav />
              <Routes>
                <Route path="/" element={<ProductList />}/>
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <PrivateRoutes path="/wishlist" element={<Wishlist/>} />
                <PrivateRoutes path="/cart" element={<Cart/>} />
              </Routes>
            </FilterProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
