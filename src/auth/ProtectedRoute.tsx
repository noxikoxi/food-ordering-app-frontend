import {useAuth0} from "@auth0/auth0-react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth0();

    // Outlet -> children
    return isAuthenticated ? (<Outlet/>) : (<Navigate to="/" replace/>);
};

export default ProtectedRoute;