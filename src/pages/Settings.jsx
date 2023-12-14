import { useContext, useState } from "react";
import supabase from "../supabase/client";
import { useEffect } from "react";
import AppContext from "../contexts/AppContext";
import Avatar from "../components/Avatar";

function Settings(){
const { session } = useContext(AppContext); 
const [loading, setLoading] = useState(true);
const [username, setUsername] = useState(null);
const [first_name, setFirstName] = useState(null);
const [last_name, setLastName] = useState(null);
const [avatar_url, setAvatarUrl] = useState(null);

useEffect(()=> {
    let ignore = false;
    async function getProfile(){
        setLoading(true);
        const { user } = session;

        const { data, error } = await supabase
            .from('profiles')
            .select(`username, first_name, last_name, avatar_url`)
            .eq('id', user.id)
            .single();

        if(!ignore) {
            if(error) {
                console.warn(error);
            } else if(data){
                setUsername(data.username);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setAvatarUrl(data.avatar_url);
            }
        }

        setLoading(false);
    }
    getProfile();

    return () => {
        ignore = true;
    };
},[session]);

async function updateProfile(event, avatarUrl) {
    event.preventDefault();
    setLoading(true);
    const { user } = session;

    const updates = {
        id: user.id,
        username,
        first_name,
        last_name,
        avatar_url,
        updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
        alert(error.message);
    } else {
        setAvatarUrl(avatarUrl);
    }
    setLoading(false);
}


    return (
        <div className="container max-w-md mx-auto relative overflow-hidden 
                        z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 
                        before:h-24 before:absolute before:bg-purple-600 
                        before:rounded-full before:-z-10 before:blur-2xl after:w-32 
                        after:h-32 after:absolute after:bg-sky-400 after:rounded-full 
                        after:-z-10 after:blur-xl after:top-24 after:-right-12">
        <h1 className="text-center font-bold text-3xl text-gray-400 bg-transparent">Settings User Page</h1>

          <form onSubmit={updateProfile} className="bg-transparent">
            <div className="mb-4 bg-transparent">
                <div className="rounded-full text-center bg-transparent">
                    <Avatar
                        url={avatar_url}
                        size={150}
                        onUpload={(event, url) => {updateProfile(event, url);}}
                    />
                </div>
            </div>

            <div className="mb-4 bg-transparent">
                <label htmlFor="first_name"
                       className="block text-sm font-medium text-gray-300 bg-transparent">
                    First Name
                </label>
                <input type="text"
                       className="mt-1 p-2 w-full bg-gray-700 border 
                                border-gray-600 rounded-md text-white"
                       id="first_name"
                       name="first_name"
                       value={first_name || ''}
                       onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="mb-4 bg-transparent">
                <label htmlFor="last_name"
                       className="block text-sm font-medium text-gray-300 bg-transparent">
                    Last Name
                </label>
                <input type="text"
                       className="mt-1 p-2 w-full bg-gray-700 border 
                                border-gray-600 rounded-md text-white"
                       id="last_name"
                       name="last_name"
                       value={last_name || ''}
                       onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="mb-4 bg-transparent">
                <label htmlFor="email"
                       className="block text-sm font-medium text-gray-300 bg-transparent">
                    Email
                </label>
                <input type="text"
                       value={session.user.email}
                       className="mt-1 p-2 w-full bg-gray-900 border 
                                border-gray-600 rounded-md text-white"
                       disabled
                />
            </div>
            <div className="mb-4 bg-transparent">
                <label htmlFor="username"
                       className="block text-sm font-medium text-gray-300 bg-transparent">
                    Username
                </label>
                <input type="text"
                       className="mt-1 p-2 w-full bg-gray-700 border 
                                border-gray-600 rounded-md text-white"
                       id="username"
                       name="username"
                       required
                       value={username || ''}
                       onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            
            <div className="flex justify-end bg-transparent">
                <button
                    className="bg-gradient-to-r from-purple-600 via-purple-400 
                             to-blue-500 text-white px-4 py-3 font-bold 
                               rounded-md hover:opacity-80"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Update Profile'}
                </button>
            </div>
            <div className="flex justify-end mt-2 bg-transparent ">
                <button className="btn btn-outline text-gray-400"
                        type="button"
                        onClick={() => supabase.auth.signOut()}
                >
                    Sign out
                </button>
            </div>
          </form>
        </div>
    )
}

export default Settings;