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
import AddProperty from "../Pages/Dashboard/Agent/AddProperty";
import MyAddedProperties from "../Pages/Dashboard/Agent/MyAddedProperties";
import MySoldProperties from "../Pages/Dashboard/Agent/MySoldProperties";
import RequestedProperties from "../Pages/Dashboard/Agent/RequestedProperties";
import Profile from "../Pages/Dashboard/Common/Profile";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";



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
                element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
            },
            {
                path: '/advertisement/:id',
                element: <PrivateRoute><AdvertisementDetails></AdvertisementDetails></PrivateRoute>,
            },
            {
                path: '/allProperties/:id',
                element: <PrivateRoute><AllPropertiesDetails></AllPropertiesDetails></PrivateRoute>,
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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Profile></Profile>
            },
            // agent
            {
                path: 'add-property',
                element:
                    <PrivateRoute>
                        <AgentRoute>
                            <AddProperty></AddProperty>
                        </AgentRoute>
                    </PrivateRoute>
            },
            {
                path: 'my-added-properties',
                element:
                    <PrivateRoute>
                        <AgentRoute>
                            <MyAddedProperties></MyAddedProperties>
                        </AgentRoute>
                    </PrivateRoute>
            },
            {
                path: 'my-sold-properties',
                element:
                    <PrivateRoute>
                        <AgentRoute>
                            <MySoldProperties></MySoldProperties>
                        </AgentRoute>
                    </PrivateRoute>
            },
            {
                path: 'requested-properties',
                element:
                    <PrivateRoute>
                        <AgentRoute>
                            <RequestedProperties></RequestedProperties>
                        </AgentRoute>
                    </PrivateRoute>
            },
            // admin
            {
                path: 'manage-users',
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <ManageUsers></ManageUsers>
                        </AdminRoute>
                    </PrivateRoute>
            },
        ],
    }
]);