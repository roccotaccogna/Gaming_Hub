import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AppSidebar from "../components/AppSidebar";
import Card from "../components/Card";

export default function PlatformPage(){
    const { platform } = useParams();
    const [errorPlatform, SetErrorPlatform] = useState('');
    const [loadingPlatform, setLoadingPlatform] = useState(false);
    const [platformGames, setPlatformGames] = useState([]);
    const [platformDetail, setPlatformDetail] = useState([]);

    useEffect(() => {
      SetErrorPlatform('');
      setLoadingPlatform(true);

   
        async function getPlatform(){
            try{
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platform}`);
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}platforms/${platform}?key=${import.meta.env.VITE_API_KEY}`);
                if(response.ok && res.ok){
                    const json = await response.json();
                    const data = await res.json();
                    setPlatformGames(json.results);
                    setPlatformDetail(data);
                    console.log(json.results);
                }else{
                  SetErrorPlatform('Not Found');
                }
          }catch(errorPlatform){
              SetErrorPlatform('Not Found');
          }
          setLoadingPlatform(false);
        }
        getPlatform();
     }, [platform]);

     return (
      <>
        <AppSidebar/>
        <div className="container mx-auto">
        <h1 className="text-6xl font-bold text-center"> {platformDetail.name} Games</h1>
        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quo.</p>


        {errorPlatform && <Error error={errorPlatform}/>}
        
        {loadingPlatform && <Loading/>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
                {platformGames && platformGames.map((game) => ( 
                    <Card key={game.id} game={game}/>
               ))}      
        </div>
        </div>
      </>
     )
}