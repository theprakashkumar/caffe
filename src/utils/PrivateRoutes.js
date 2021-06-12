import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoutes = ({path, ...props}) => {
    const { isUserLogin } = useContext(AuthContext);

    return isUserLogin ? (
        <Route to={path} {...props} />
        ) : (
        <Navigate state={{from: path}} to="/login" />
        );   
}

export default PrivateRoutes;