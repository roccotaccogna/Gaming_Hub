import { Outlet } from "react-router-dom";

function AppLayout(){
    return (
        <div className="mt-5">
            <Outlet/>
        </div>
    )
}

export default AppLayout;