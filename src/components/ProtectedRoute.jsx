import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(){
    const {session} = useContext(AppContext);
    if (!session){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}