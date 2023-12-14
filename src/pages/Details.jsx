import AppContext from "../contexts/AppContext";
import { useContext } from "react";
import useProfile from "../hooks/useProfile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "../components/Messages";
import AppSidebar from "../components/AppSidebar";
import supabase from "../supabase/client";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";

import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { RiComputerLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { BiBookmarks } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import "../styles/formChat.css";
import "../styles/imageDetail.css";
import "../styles/btnFavourites.css";


export default function Details() {
    const { session } = useContext(AppContext);
    const {game_name} = useParams();
    const { profile } = useProfile();
    const [detailGames, setDetailGames] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [genres, setGenres] = useState([]);
    const [developers, setDevelopers] = useState([]);

    const [loadingDetail, setLoadingDetail] = useState(true);
    const [errorDetail, setErrorDetail] = useState('');
    const [fav, setFav] = useState([]);

    useEffect(()=> {
        async function getDetail(){
            try{
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}games/${game_name}?key=${import.meta.env.VITE_API_KEY}`);
              if(response.ok){
                  const json = await response.json();
                  setDetailGames(json);
                  setPlatforms(json.platforms.map(platform => platform.platform.name));
                  setPublishers(json.publishers.map(pub => pub.name));
                  setGenres(json.genres.map(genre => genre.name));
                  setDevelopers(json.developers.map(developer=> developer.name));
              }else{
                setErrorDetail('Not Found');
              } 
            }catch(errorDetail){
                setErrorDetail('Not Found');
            }
            setLoadingDetail(false);         
     }
     getDetail();
 },[]);

 const getFavGame = async () => {
    const { data, error } = await supabase
                .from('favourites')
                .select("*")
                .eq('game_id', detailGames.id)
                .eq('profile_id', session.user.id);
        if(error){
            alert(error.message);
        } else {
            setFav(()=> [...data]);
        }
};

 const addToFavourites = async () => {
    const { error } = await supabase
                .from('favourites')
                .insert([
                    {
                        game_id: detailGames.id,
                        game_name: detailGames.name
                    },
                ])
                .select();
        if(error){
            alert(error.message);
        } else {
            getFavGame();
        }
};

 const removeFromFavourites = async () => {
    const { error } = await supabase
                .from('favourites')
                .delete()
                .eq('game_id', detailGames.id)
                .eq('profile_id', session.user.id);
        if(error){
            alert(error.message);
        } else {
            getFavGame();
        }
};

 const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputForm = event.currentTarget;
    const { message } = Object.fromEntries(
        new FormData(inputForm)
    )
    if(typeof message === 'string' && message.trim().length !== 0){
        const { error} = await supabase
                    .from('messages')
                    .insert([{
                        content: message,
                        profile_id: profile.id,
                        game_id: detailGames.id
                    }])
                    .select();
        if(error){
            alert(error.message);
        } else {
            inputForm.reset();
        }
     }
    }

    useEffect(()=> {
        if (session) {
            getFavGame();
          }
    }, [getFavGame]);

    return (
        <>
        <AppSidebar/>
    
        <div className="container mx-auto">
            {errorDetail && <Error error={errorDetail}/>}
        
            {loadingDetail &&  <Loading/> }

               <h1 className="text-6xl font-bold text-center">{detailGames.name}</h1>
               <div className="detail lg:flex">
                
                {/* CONDITION IF NOT LOGIN */}
                {!profile && 
                <div className="lg:w-[800px] mb-12 md:w-[600px] sm:w-[500px] 
                                xl:ml-48 lg:ml-24 2xl:ml-60"
                >
               <img src={detailGames.background_image} alt="image game" className="rounded-md" />
                </div>
                }
                
                {/* CONDITION IF LOGIN*/}
                {/* CHAT AREA*/}
                {profile && 
                <>
                <div className="imageDetail mb-12 xl:ml-16 lg:w-[800px] lg:ml-16
                                md:w-[600px] md:ml-16 sm:w-[500px] sm:ml-16 min-w-[400px]"
                >
               <img src={detailGames.background_image} alt="image game" className="rounded-md" />
                </div>
               <div className="md:ml-16 sm:ml-16 lg:ml-16 space">
                <Messages profile={profile} game={detailGames}/>

               <div className="containerChat">
                <div className="nav-bar font-semibold uppercase text-white">
                    <p>Chat live with gamers</p>
                </div>

                <div className="sender-area">
                    <div className="input-place">
                        <form className="flex"
                              onSubmit={handleMessageSubmit}>
                        <input 
                            type="text" 
                            name="message"
                            placeholder="type your message..."
                            className="send-input"
                        />
                        <div className="tooltip tooltip-right" data-tip="Send">
                        <button>
                        <IoMdSend size={26} className="ml-28 mt-2"/>
                        </button>
                        </div>
                        </form>
                    </div>
                </div>
               </div>
               </div>
                </>
               }
               </div>

               {/* FAVOURITES */}
               {profile && 
               <>
               <div className="m-2 ml-4 flex justify-start items-center">
                {fav.length !==0 ? (
                <button 
                    type="button"
                    className="remove m-4 rounded-lg flex items-center"
                    onClick={removeFromFavourites}
                >
                    Remove from Favourites
                    <MdDelete size={30}/>
                </button>
               ) : (
                <button 
                    type="button"
                    className="rounded-lg m-4 favourites flex items-center"
                    onClick={addToFavourites}
                >
                    Add to Favourites
                    <FaRegHeart size={25}/>
                </button>
               )}
               <Link to={`/game/${detailGames.slug}/comment`}>
               <button className="review flex items-center">
                    Write a Review
                    <FaPenAlt size={20} className="ml-1 mr-1"/>
                </button>               
               </Link>

               </div>
               </>
               }



                {/* RATINGS */}
               <div className="stats shadow mt-4 ml-2 xl:ml-8 lg:ml-8 border-2 border-slate-600">
                <div className="status">
                    <div className="stat-figure text-white">
                        <FaRegStar size={24} className="inline-block w-8 h-8 stroke-current"/>
                    </div>
                        <div className="font-semibold stat-title uppercase text-center">Ratings</div>
                        <div className="stat-value text-slate-300">{detailGames.rating}</div>
                </div>

                {/* RELEASE DATE */}
               <div className="status">
                <div className="stat-figure text-white">
                    <FaRegClock size={24} className="inline-block w-8 h-8 stroke-current" />
                </div>
                <div className="font-semibold stat-title uppercase text-center">Release Date:</div>
                <div className="stat-value text-slate-300">{detailGames.released}</div>
               </div>
               </div>

               {/* PLATFORMS */}
               <div className="flex mt-5 ml-3 xl:ml-8 lg:ml-8">
               <RiComputerLine size={28} className="mr-3 text-white"/>
                <h2 className="uppercase font-semibold text-xl mr-4 text-white">Platforms:</h2>
               <div className="text-xl">{platforms.map(plat => plat).join(', ')}</div>
               </div>

               {/* PUBLISHERS */}
               <div className="flex mt-5 ml-3 xl:ml-8 lg:ml-8">
               <TbWorld size={28} className="mr-3 text-white"/>
                <h2 className="uppercase font-semibold text-xl mr-4 text-white">Publishers:</h2>
               <div className="text-xl">{publishers}</div>
               </div>

               {/* GENRES */}
               <div className="flex mt-5 ml-3 xl:ml-8 lg:ml-8">
               <BiBookmarks size={28} className="mr-3 text-white"/>
                <h2 className="uppercase font-semibold text-xl mr-4 text-white">Genres:</h2>
               <div className="text-xl">{genres.join(', ')}</div>
               </div>

               {/* DEVELOPERS */}
               <div className="flex mt-5 ml-3 xl:ml-8 lg:ml-8">
               <IoSettingsSharp size={28} className="mr-3 text-white"/>
                <h2 className="uppercase font-semibold text-xl mr-4 text-white">Developers:</h2>
               <div className="text-xl">{developers.join(', ')}</div>
               </div>

               {/* ABOUT */}
               <div className="container mx-auto mb-28">
               <h5 className="text-center font-semibold text-4xl mt-9 uppercase">About</h5>
               <h6 className="text-center xl:mr-4">{detailGames.description_raw}</h6>
               </div>

               {/* COMMMENTS */}
               <Comments game={detailGames}/>
        </div>
        </>
    )
}

