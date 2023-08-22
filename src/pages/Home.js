import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <header className="home">
            <div className="heading heading--h2 home-heading">
                Brewing Starts Here!
            </div>
            <Link className="btn home-btn" to="/products">
                Explore Products
            </Link>
        </header>
    );
};

export default Home;
