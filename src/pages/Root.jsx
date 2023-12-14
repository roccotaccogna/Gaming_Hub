import AppNavbar from '../components/AppNavbar';
import AppLayout from '../layouts/AppLayout';
import AppFooter from '../components/AppFooter';

function Root(){
    return (
        <div className="container">
        <AppNavbar/>
        <AppLayout/>
        <AppFooter/>
        </div>
    )
}

export default Root;