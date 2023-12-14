import { Link } from "react-router-dom";
import "../styles/card.css";

export default function Card({game}){

 return (
    <div className="card card1 overflow-visible m-2" key={game.id}> 
    <figure><img src={game.background_image} alt="game image"/></figure>
    <div className="card-body bg-gray-800 rounded-b-xl">
      <h4  className="card-title text-white bg-transparent">{game.name}</h4>  
        <p className="text-sm text-slate-400 bg-transparent">{game.genres.map((genre) => genre.name).join(', ')}</p>
        <div className="card1-action justify-center mt-2 bg-transparent">
          <Link to={`/game/${game.slug}`} className="btn btn-neutral uppercase w-24">
            Details
          </Link>
        </div>
    </div>
    </div>  
 )
}