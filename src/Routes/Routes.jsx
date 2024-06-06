import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllProperties from "../Pages/AllProperties/AllProperties";
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import Login from "../Pages/Login/Login";
import SignUp from '../Pages/SignUp/SignUp'
import PrivateRoute from "./PrivateRoute";
import AdvertisementDetails from "../Pages/DetailsPage/AdvertisementDetails";
import AllPropertiesDetails from "../Pages/DetailsPage/AllPropertiesDetails";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/Common/MyProfile";
import AddProperty from "../Pages/Dashboard/Agent/AddProperty";
import MyAddedProperties from "../Pages/Dashboard/Agent/MyAddedProperties";
import MySoldProperties from "../Pages/Dashboard/Agent/MySoldProperties";
import RequestedProperties from "../Pages/Dashboard/Agent/RequestedProperties";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allProperties',
                element: <AllProperties></AllProperties>
            },
            {
                path: '/advertisement/:id',
                element: <AdvertisementDetails></AdvertisementDetails>,
            },
            {
                path: '/allProperties/:id',
                element: <AllPropertiesDetails></AllPropertiesDetails>,
            },

        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                index: true,
                element: <MyProfile></MyProfile>
            },
            {
                path: 'add-property',
                element: <AddProperty></AddProperty>
            },
            {
                path: 'my-added-properties',
                element: <MyAddedProperties></MyAddedProperties>
            },
            {
                path: 'my-sold-properties',
                element: <MySoldProperties></MySoldProperties>
            },
            {
                path: 'requested-properties',
                element: <RequestedProperties></RequestedProperties>
            },
        ],
    }
]);