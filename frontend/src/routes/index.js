import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Farmer from '../pages/Farmer';
import Industry from '../pages/Industry';
import Order from '../pages/Order';
import Listing from '../pages/Listing';
import Industry_Order from '../pages/Industry_Order';
import Industry_Listing from '../pages/Industry_Listing';
import MarketplaceSection from '../pages/Marketplace';
import GovSchemes from '../pages/GovSchemes';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import AI from '../pages/AI';
import SuccessPage from '../pages/SuccesPage';
import Logistics from '../pages/Logistics';
import AnalyticsDashboard from '../pages/Analytics';
import FarmerOrderTracking from '../pages/FarmerOrderTrack';



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "farmer-dashboard",
                element: <Farmer />
            },
            {
                path: "industry-dashboard",
                element: <Industry />
            },
            {
                path: "orders-farmer",
                element: <Order />
            },
            {
                path: "orders-industry",
                element: <Industry_Order />
            },
            {
                path: "lists-farmer",
                element: <Listing />
            },
            {
                path: "lists-industry",
                element: <Industry_Listing />
            },
            {
                path: "marketplace",
                element: <MarketplaceSection />
            },
            {
                path: "schemes",
                element: <GovSchemes />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "ai-insights",
                element: <AI />
            },
            {
                path: "success",
                element: <SuccessPage />
            },
            {
                path: "logistics",
                element: <Logistics />
            },
            {
                path: "analytics",
                element: <AnalyticsDashboard />
            },
            {
                path: "farmer-track-order",
                element: <FarmerOrderTracking />
            },

            


            
        ]
    }
])

export default router;