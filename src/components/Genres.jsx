import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export default function Genres({genres}){

    return (
        <>
        <div className="dropdown">
          <div tabIndex={0} className="btn m-1 text-xl font-semibold" role="button">
            Genres
            <IoIosArrowDown/>
          </div>
          <ul tabIndex={0} className="dropdown-content p-2 shadow
                                      bg-base-200 rounded-box w-52 over"
          >
          {genres.map((genre) => {
            return (
            <li className="m-3 p-1 hover:bg-gray-700 hover:rounded-md" key={genre.id}>
              <Link to={`/games/${genre.slug}`}>
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