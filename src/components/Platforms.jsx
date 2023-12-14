import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export default function Platforms({platforms}){
    return (
        <>
        <div className="dropdown text-gray-400">
          <div tabIndex={0} className="btn btn-ghost m-1 text-xl font-semibold" role="button">
             Platforms
             <IoIosArrowDown className="bg-transparent"/>
          </div>
          <ul tabIndex={0} className="dropdown-content p-2 shadow
                                      rounded-box w-52 over"
          >
          {platforms.map((platform) => {
            return (
            <li className="m-3 p-1 hover:bg-gray-700 hover:rounded-md" key={platform.id}>
              <Link to={`/platforms/${platform.id}`} className="bg-transparent">
                 {platform.name}
              </Link>
            </li>  
            )
          }
          )}
          </ul>
        </div>
        </>
    )
}