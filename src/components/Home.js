import "./Home.css";
import { Link } from "react-router-dom";
import LandingPhoto from "../assets/LandingPhoto.jpg";

const Home = () => {
    return (
        <header className="home">
            <div class="heading heading--h2">Brewing Starts Here!</div>
            <Link className="btn" to="/products">
                Explore Products
            </Link>
        </header>
    );
};

export default Home;
