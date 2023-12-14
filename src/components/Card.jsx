import { Link } from "react-router-dom";
import "../styles/card.css";

export default function Card({game}){

 return (
    <div className="card bg-slate-700 overflow-visible m-2" key={game.id}> 
    <figure><img src={game.background_image} alt="game image"/></figure>
    <div className="card-body">
      <h4  className="card-title text-white">{game.name}</h4>  
        <p className="text-sm text-slate-400">{game.genres.map((genre) => genre.name).join(', ')}</p>
        <div className="card-action justify-center mt-2">
          <Link to={`/game/${game.slug}`} className="btn btn-neutral uppercase w-24">
            Details
          </Link>
        </div>
    </div>
    </div>  
 )
}