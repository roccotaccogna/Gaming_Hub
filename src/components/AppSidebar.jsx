import { useEffect, useState } from "react";
import Genres from "./Genres";
import Platforms from './Platforms';


export default function AppSidebar(){
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    
    useEffect(()=> {

        //CALLING API GENRES
        async function getGenres(){
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGenres(json.results);
        }

        //CALLING API PLATFORMS
        async function getPlatforms(){
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}platforms?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setPlatforms(json.results);
        }   
        getGenres();   
        getPlatforms();
    },[]);

    return (
        <div className="flex justify-center mb-8">
        <Genres genres={genres}/>
        <Platforms platforms={platforms}/>
        </div>
    )
}