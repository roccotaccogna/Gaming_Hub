import { useEffect, useState, useRef } from "react";
import supabase from "../supabase/client";
import formatMessageDate from '../utils/formatMessageDate';

function Messages({ game }){
    const [chat, setChat] = useState([]);
    const chatDivRef = useRef(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);


    const getMessages = async() => {
        let { data, error } = await supabase 
                    .from('messages')
                    .select('*, profile: profiles(username)')
                    .eq('game_id', game.id);
            if(error){
                alert(error.message);
            }else{
                setChat(data);               
            }
    };

    useEffect(()=>{
        getMessages();
        const subscription = supabase
                .channel('messages')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public'
                    },
                    () => getMessages()
                )
                .subscribe();

            return () => {
                subscription.unsubscribe();
            };
        }, [chat]);

        const scrollToBottom = () => {
            if(chatDivRef.current){
                chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
            }
        };

        const handleScroll = () => {
            if (chatDivRef.current) {
                if (chatDivRef.current.scrollTop + chatDivRef.current.clientHeight === chatDivRef.current.scrollHeight) {
                    setIsUserScrolling(false);
                } else {
                        setIsUserScrolling(true);
                }
            }
        };

        useEffect(()=> {
            if(!isUserScrolling){
                scrollToBottom();
            }
        }, [chat, isUserScrolling]);

        useEffect(() => {
            if (chatDivRef.current) {        
                chatDivRef.current.addEventListener('scroll', handleScroll);        
            }       

            return () => {
                if (chatDivRef.current) {
                    chatDivRef.current.removeEventListener('scroll', handleScroll);
                }   
            };
        }, []);

    return (
        <div className="messages ml-4" ref={chatDivRef}>
        {chat && chat.map((message) => (
            <>
                <div key={message.id} className="chat chat-start mt-2">
                    <div className="chat-header text-lg text-white">
                            {message.profile.username}
                        <time className="text-xs opacity-50 ml-1">
                            {formatMessageDate(message.created_at)} 
                        </time>
                    </div>
                    <div className="chat-bubble">
                        {message.content}
                    </div>
                </div>
            </>
            ))}
        </div>
    )
}

export default Messages;