import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AppSidebar from "../components/AppSidebar";

export default function GenrePage(){
 const [errorGenre, SetErrorGenre] = useState('');
 const [loadingGenre, setLoadingGenre] = useState(false);
 const { genre } = useParams();
 const [genreGames, setGenreGames] = useState([]);

 useEffect(() => {
    SetErrorGenre('');
    setLoadingGenre(true);

    async function getGenre(){
        try{
              const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre}`);
              if(response.ok){
                  const json = await response.json();  
                  setGenreGames(json.results);
              }else{
                SetErrorGenre('Not Found');
              }
        }catch(errorGenre){
            SetErrorGenre('Not Found');
        }
        setLoadingGenre(false);
    }
    getGenre();
     }, [genre]);

    return (
        <>
        <AppSidebar/>
        <div className="container mx-auto">
        <h1 className="text-6xl font-bold text-center capitalize">{genre} Games</h1>
        <p className="text-center">
        A videogame genre is a specific category of games related by similar gameplay characteristics. 
        Video game genres are not usually defined by the setting or story of the game or its medium of play, 
        but by the way the player interacts with the game. For example; a first-person shooter is still a 
        first-person shooter regardless of whether it takes place in a science fiction, western, fantasy, or 
        military setting; so long as it features a camera mimicking the perspective of the protagonist 
        (first-person) and gameplay centered around the use of ranged weaponry.
        </p>


        {errorGenre && <Error error={errorGenre}/>}
        
        {loadingGenre && <Loading/>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
                {genreGames && genreGames.map((game) => ( 
                    <Card key={game.id} game={game}/>
               ))}      
        </div>
        </div>
        </>
    )
}