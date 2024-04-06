import {useAuth0} from "@auth0/auth0-react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth0();

    if(isLoading){
        return <span className="m-2">Loading...</span>;
    }

    if(isAuthenticated){
        // Outlet -> children
        return <Outlet/>;
    }

    return <Navigate to="/" replace/>;
};

export default ProtectedRoute;