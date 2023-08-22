import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer">
                <div className="footer-left">
                    <div className="footer-nav-logo">Caffè</div>
                    <div className="footer-left__link-container">
                        <Link to="/">
                            <div className="footer__link mt-0-5">Home</div>
                        </Link>
                        <Link to="/wishlist">
                            <div className="footer__link mt-1">Wishlist</div>
                        </Link>
                        <Link to="/cart">
                            <div className="footer__link mt-0-5">Cart</div>
                        </Link>
                    </div>
                </div>
                <div className="footer-right">
                    <form className="footer-right__form">
                        <input
                            type="text"
                            placeholder="Your Email"
                            className="footer-right__input"
                        ></input>
                        <button className="footer-right__button">
                            Subscribe
                        </button>
                    </form>
                    <div className="footer-right__social-container mt-2">
                        <a
                            href="https://www.facebook.com/"
                            className="footer-right__social-container__link"
                        >
                            <i className="fab fa-facebook-f mr-2"></i>
                        </a>
                        <a
                            href="https://www.twitter.com/theprakashkumar"
                            className="footer-right__social-container__link"
                        >
                            <i className="fab fa-twitter mr-2"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/"
                            className="footer-right__social-container__link"
                        >
                            <i className="fab fa-instagram mr-2"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/theprakashkumar"
                            className="footer-right__social-container__link"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
