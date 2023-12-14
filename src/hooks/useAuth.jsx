import { useEffect, useState } from "react";
import supabase from "../supabase/client";

function useAuth(){
    const [session, setSession] = useState(null);

    useEffect(()=> {
        supabase.auth.getSession().then(({data: { session } })=> {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, []);

    return { 
        session
     }
}

export default useAuth;