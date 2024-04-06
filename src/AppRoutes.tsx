import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/layouts/layout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import ProtectedRoute from "@/auth/ProtectedRoute.tsx";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage.tsx";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout showHero={true}><HomePage/></Layout>} />

            <Route element={<ProtectedRoute/>}>
                <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout> }/>
            </Route>

            <Route element={<ProtectedRoute/>}>
                <Route path="/manage-restaurant" element={<Layout><ManageRestaurantPage/></Layout> }/>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        </Routes>
    )
}

export default AppRoutes