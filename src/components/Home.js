import "./Home.css";
import { Link } from "react-router-dom";
import LandingPhoto from "../assets/LandingPhoto.jpg";

const Home = () => {
    return (
        <div className="home">
            <img className="home__img" src={LandingPhoto} alt="landing-photo" />
            <div className="home__description-container">
                <div class="heading heading--h2">Brewing Starts Here!</div>
                <Link className="btn" to="/products">
                    Explore Products
                </Link>
            </div>
        </div>
    );
};

export default Home;
