import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export default function Genres({genres}){

    return (
        <>
        <div className="dropdown text-gray-400">
          <div tabIndex={0} className="btn btn-ghost m-1 text-xl font-semibold" role="button">
            Genres
            <IoIosArrowDown className="bg-transparent"/>
          </div>
          <ul tabIndex={0} className="dropdown-content p-2 shadow
                                       rounded-box w-52 over"
          >
          {genres.map((genre) => {
            return (
            <li className="m-3 p-1 hover:bg-gray-700 hover:rounded-md" key={genre.id}>
              <Link to={`/games/${genre.slug}`} className="bg-transparent">
                {genre.name}
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