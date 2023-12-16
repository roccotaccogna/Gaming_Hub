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
            <div className='dropdown-content mr-6'>
              <div className="dropdown">
                <div tabIndex={0} className="btn btn-ghost m-1 text-lg text-white bg-transparent border-none no-underline" role="button">
                  {session.user.user_metadata.username || session.user.email}           
                  <IoIosArrowDown className="bg-transparent"/>
                </div> 
                 <ul className="dropdown-content p-2 w-60 text-white">
                    <li className="text-lg text-gray-400">
                      <Link to={{ pathname:"/account" }} className="hover:text-white flex">
                        <MdOutlineAccountCircle size={26} className="ml-1"/>
                        Account Page
                      </Link>
                    </li>
                    <li className="text-lg text-gray-400">
                      <Link to={{ pathname:"/settings" }} className="hover:text-white flex mt-2">
                        <CiSettings size={26} className="ml-1"/>
                        Settings Page
                      </Link>
                    </li>
                    <button onClick={handleSignOut} 
                        className="cursor-pointer mt-2 ml-6 hover:text-red-500 uppercase text-lg" >
                          Sign out
                    </button>
                  </ul> 
              </div>
            </div>
          ): (
              <ul className="menu-horizontal">
                <li className="mr-8"><Link to="/login" className="uppercase hover:text-white text-gray-400 text-sm">Login</Link></li>
                <li><Link to="/register" className="uppercase hover:text-white text-gray-400 text-sm">Register</Link></li>
              </ul>
            )}
        </div>
    )
}