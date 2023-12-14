import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Homepage from "../pages/Homepage";
import GenrePage from "../pages/GenrePage";
import PlatformPage from "../pages/PlatformPage";
import Details from "../pages/Details";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Account from "../pages/Account";
import ProtectedRoute from "../components/ProtectedRoute";
import Settings from "../pages/Settings";
import CommentPage from "../pages/CommentPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <Homepage/>,
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path:"/",
                element: <ProtectedRoute/>,
                children: [
                    {
                        path: "/account",
                        element: <Account/>
                    },
                    {
                        path: "/settings",
                        element: <Settings/>
                    },
                ]
            },
            {
                path: "/games/:genre",
                element: <GenrePage/>
            },
            {
                path: "/platforms/:platform",
                element: <PlatformPage/>
            },
            {
                path: "/game/:game_name",
                element: <Details/>,
            },
            {
                path: "/game/:game_name/comment",
                element: <CommentPage/>,
            }
        ],
    },

]);

export default router;