import "./Loader.css";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <PropagateLoader
                    color={"#0f172a"}
                    size={15}
                    speedMultiplier={1.5}
                />
            </div>
        </div>
    );
};

export default Loader;
