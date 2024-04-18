import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/layouts/layout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import ProtectedRoute from "@/auth/ProtectedRoute.tsx";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage.tsx";
import SearchPage from "@/pages/SearchPage.tsx";
import DetailPage from "@/pages/DetailPage.tsx";
import OrderStatusPage from "@/pages/OrderStatusPage.tsx";

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

            <Route element={<ProtectedRoute/>}>
                <Route path="/order-status" element={<Layout><OrderStatusPage/></Layout> }/>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/auth-callback" element={<AuthCallbackPage/>}/>

            <Route path="/search/:city" element={<Layout showHero={false}><SearchPage/></Layout>}/>
            <Route path="/detail/:restaurantId" element={<Layout showHero={false}><DetailPage/></Layout>}/>

        </Routes>
    )
}

export default AppRoutes