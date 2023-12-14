import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/Gaming_Hub.png';
import AppContext from "../contexts/AppContext";
import supabase from "../supabase/client";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import "../styles/dropdownNav.css";

export default function AppNavbar(){
  const { session } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

    return (
        <div className="navbar bg-fixed flex justify-around">
          <Link to="/">
          <img src={logo} className="logo mr-5 sm:w-40 md:w-48 xl:w-48 lg:w-40"/>
          </Link>

          {session ? (
            <div className='dropdown-content'>
              <div className="dropdown">
                <div tabIndex={0} className="btn m-1 text-lg text-white" role="button">
                  {session.user.user_metadata.username || session.user.email}           
                  <IoIosArrowDown/>
                </div> 
                 <ul className="menu shadow dropdown-content p-2 w-60 bg-base-200 text-white">
                    <li className="text-lg">
                      <Link to="/account" className="hover:text-white">
                        <MdOutlineAccountCircle size={26} className="ml-1"/>
                        Account Page
                      </Link>
                    </li>
                    <li className="text-lg">
                      <Link to="/settings" className="hover:text-white">
                        <CiSettings size={26} className="ml-1"/>
                        Settings Page
                      </Link>
                    </li>
                    <button onClick={handleSignOut} 
                        className="cursor-pointer mt-1 mr-4 hover:text-red-500 uppercase text-lg" >
                          Sign out
                    </button>
                  </ul> 
              </div>
            </div>
          ): (
              <ul className="menu menu-horizontal">
                <li className="mr-1"><Link to="/login" className="uppercase hover:text-white">Login</Link></li>
                <li><Link to="/register" className="uppercase hover:text-white">Register</Link></li>
              </ul>
            )}
        </div>
    )
}