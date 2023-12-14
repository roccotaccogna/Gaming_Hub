import { useContext, useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import Loading from "../components/Loading";
import getProfileAvatar from "../utils/getProfileAvatar";
import supabase from "../supabase/client";
import formatMessageDate from "../utils/formatMessageDate";
import AppContext from "../contexts/AppContext";

import { MdCancel } from "react-icons/md";

function Account(){
    const { session } = useContext(AppContext);
    const {profile, loading}  = useProfile();
    const [comments, setComments] = useState([]);
    const [favourites, setFavourites] = useState([]);

    
        const getComments = async () => {
          const { data, error } = await supabase
            .from('comments')
            .select('*, profile: profiles(username)')
            .eq('profile_id', session.user.id);
          if (error) {
            alert(error.message);
          } else {
            setComments(data);
          }
        };
        getComments(); 

      const removeFromComments = async (id) => {
        const { error } = await supabase
                      .from('comments')
                      .delete()
                      .eq('id', id);
        if(error){
          alert(error.message);
        } else {
          getComments();
        }
      };

      useEffect(() => {
        getComments();
      }, []);

      useEffect(() => {
        const getFav = async () => {
          const { data, error } = await supabase
            .from('favourites')
            .select('*')
            .eq('profile_id', session.user.id);
          if (error) {
            alert(error.message);
          } else {
            setFavourites(data);
          }
        };
        getFav();
      }, []);
    
    if(loading) {
        return <Loading/>
    }
    
    if(!profile) {
        return <div>No profile data available</div>
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-center font-bold text-3xl text-gray-400"> Benvenuto {profile.first_name || profile.username}</h1>
            <div className="mt-6 flex justify-center">
            <img  className="imageAvatar rounded-full w-48 h-48" src={getProfileAvatar(profile.avatar_url)} />              
            </div>
            <div className="mx-auto list mt-14 text-gray-400">
            <div className="collapse collapse-arrow bg-slate-700 lg:w-[700px] xl:ml-44">
                <input type="checkbox" name="my-accordion-2"/> 
                <div className="collapse-title text-xl font-medium text-center">
                    My Favourites 
                </div>
                <div className="collapse-content"> 
                    {favourites.length !==0 ? (
                      favourites.map((favGame) => (
                        <>
                         <p key={favGame.id}>{favGame.game_name}</p>
                         <div className="divider divider-neutral"></div>
                        </>
                      ))
                    ) : (
                      <p className="text-center italic mb-2"> There are not favourite games </p>
                    )}
                </div>
            </div>
            <div className="collapse collapse-arrow bg-slate-700 mt-1 lg:w-[700px] xl:ml-44">
                <input type="checkbox" name="my-accordion-2" /> 
                <div className="collapse-title text-xl font-medium text-center">
                    My Reviews
                </div>
                <div className="collapse-content"> 
                {comments.length !==0 ? (            
                comments.map((c) =>(
                        <div key={c.id}>
                            <p className="font-semibold text-lg">{c.comment_title}</p>
                            <p className="mt-1">{c.comment_content}</p>
                            <p className="text-right italic mt-1">{formatMessageDate(c.created_at)}</p>
                            <div className="flex justify-center tooltip" data-tip="Remove"> 
                            <button onClick={()=> removeFromComments(c.id)} className="text-red-500">
                            <MdCancel size={20}/>
                            </button>
                            </div>
                            <div className="divider divider-neutral"></div>
                        </div>
                    ))
                ):(
                  <p className="text-center italic"> There are not reviews </p>
                )}
                </div>
            </div>
            </div>

        </div>
    )
}

export default Account;