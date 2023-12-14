import { Outlet } from "react-router-dom";

function AppLayout(){
    return (
        <div className="mt-5 pb-[2.5rem]">
            <Outlet/>
        </div>
    )
}

export default AppLayout;