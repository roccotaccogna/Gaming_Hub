import { useEffect, useState } from "react";
import supabase from "../supabase/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { IoHomeOutline } from "react-icons/io5";

function CommentPage(){
    const [success, setSuccess] = useState(false);
    const [game, setGames] = useState([]);
    const {game_name} = useParams();

    useEffect(()=> {
        async function getGames(){
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}games/${game_name}?key=${import.meta.env.VITE_API_KEY}`);
                const json = await response.json();
                setGames(json);
     }
     getGames();
    }, []);


    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const commentForm = event.currentTarget;
        const { title, content } = Object.fromEntries(new FormData(commentForm));
        if(
            typeof title == 'string' &&
            typeof content == 'string'&&
            title.trim().length !== 0 &&
            content.trim().length !== 0 
        ) {
            const { error } = await supabase  
                        .from('comments')
                        .insert([
                            {
                                game_id: game.id,
                                game_name: game.name,
                                comment_title: title,
                                comment_content: content
                            },
                        ])
                        .select();
                    if(error) {
                        alert(error.message);
                    } else {
                        commentForm.reset();
                        setSuccess(true);
                    }
        }
    }

    return (
        <div className="container max-w-xl mx-auto relative overflow-hidden 
                        z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 
                        before:h-24 before:absolute before:bg-green-600 
                        before:rounded-full before:-z-10 before:blur-2xl after:w-32 
                        after:h-32 after:absolute after:bg-blue-600 after:rounded-full 
                        after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h1 className="text-center font-bold text-3xl text-gray-400 bg-transparent">Write a comment about</h1>
            <h1 className="text-center font-bold text-3xl text-white mt-2 bg-transparent">{game.name}</h1>
            <form onSubmit={handleCommentSubmit} className="bg-transparent">
            <div className="mb-6 mt-6 bg-transparent">
                <label htmlFor="title"
                       className="text-md font-medium text-gray-300 bg-transparent">
                    Title
                </label>
                <input type="text"
                       className="mt-1 p-2 w-full bg-gray-700 border 
                                border-gray-600 rounded-md text-white"
                       id="title"
                       name="title"
                />
            </div>

            <div className="mb-4 bg-transparent">
                <label htmlFor="content"
                       className="text-md font-medium text-gray-300 bg-transparent">
                    Comment text
                </label>
                <textarea type="text"
                       className="mt-1 h-32 p-2 w-full bg-gray-700 border 
                                border-gray-600 rounded-md text-white"
                       id="content"
                       name="content"
                />
            </div>

            
            <div className="flex justify-center bg-transparent">
                <button
                    className="bg-gradient-to-r from-blue-500 via-blue-700 
                             to-blue-900 text-white px-4 py-3 font-bold 
                               rounded-md hover:opacity-80"
                    type="submit"
                >
                    Publish
                </button>
            </div>
            </form>

                   {success ? (
                   <dialog open className="modal sm:modal-middle">
                    <div className="modal-box 
                                    container max-w-xl mx-auto relative overflow-hidden 
                                    z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 
                                    before:h-24 before:absolute before:bg-green-600 
                                    before:rounded-full before:-z-10 before:blur-2xl after:w-32 
                                    after:h-32 after:absolute after:bg-blue-600 after:rounded-full 
                                    after:-z-10 after:blur-xl after:top-24 after:-right-12"
                    >
                        <div className="flex justify-center bg-transparent">
                        <h3 className="font-bold text-lg text-green-500 text-center mr-2 bg-transparent">
                        Review inviata con successo!
                        </h3>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-green-500 bg-transparent" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="modal-action mt-12 flex justify-center bg-transparent">
                            <form method="dialog">
                                <button className="btn btn-outline pt-1 bg-transparent border-green-500 text-green-500 hover:text-gray-400 hover:border-gray-400">
                                    <Link to="/" className="bg-transparent">
                                        Back Home
                                        <IoHomeOutline size={22} className="ml-6 mt-1"/>
                                    </Link>
                                </button>
                            </form>
                        </div>
                    </div>
                   </dialog> 
                   ) :  (
                       ''
                   )}
        </div>
    )
}

export default CommentPage;