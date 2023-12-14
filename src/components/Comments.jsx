import { useEffect, useState } from "react";
import supabase from "../supabase/client";
import formatMessageDate from '../utils/formatMessageDate';

function Comments({ game }) {
    const [comments, setComments] = useState([]);

    useEffect(()=> {
        const getComments = async () => {
            let {data, error} = await supabase 
            .from('comments')
            .select('*, profile: profiles(username)')
            .eq('game_id',game.id);
                if(error){
                    alert(error.message);
                } else {
                    setComments(data);
                }
        };
        getComments();
    }, [comments]);

        return (
            <>       
            {comments.length !==0 ? (
                <div className="flex justify-center">
                    <div className="justify-center">
                        <h1 className="text-center text-slate-200 text-xl 
                                       font-bold col-span-6 mt-2 italic mb-12">
                                            {game.name} Reviews
                        </h1>
                    {comments.map((comment) => (
                        <div className="bg-slate-500 text-black ml-2 lg:w-[900px] xl:w-[1000px] 
                                        placeholder:text-slate-600 placeholder:opacity-50 border 
                                        border-slate-200 col-span-6 resize-none outline-none 
                                          p-4 duration-300 focus:border-slate-600 m-2"
                             key={comment.id}>
                                <p className="text-center font-semibold text-xl bg-transparent">{comment.comment_title}</p>
                                <p className="text-lg bg-transparent">{comment.comment_content}</p>
                                <p className="text-right italic mt-2 bg-transparent">Published by: {comment.profile.username || comment.profile.email}</p>
                                <p className="text-right italic bg-transparent">{formatMessageDate(comment.created_at)}</p>
                        </div>
                     ))}
                    </div>
                </div>

            ) : (
                <div className="mb-72">
                    <p className="text-center italic text-xl text-gray-400"> There are not Review </p>
                </div>
            ) }
            </>
        )
}

export default Comments;