import { useState } from "react";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AppSidebar from "../components/AppSidebar";
import FetchGames from "../components/FetchGames";

export default function Homepage(){
const [games, setGames] = useState([]);
const [error, setError] = useState([]);
const [loading, setLoading] = useState([]);
const [search, setSearch] = useState([]);
const [pagination, setPagination] = useState(1);
    
    // SEARCH
    const handleSearch = (event) => {
        setSearch(event.currentTarget.value);
      }

    return (
        <>
        <AppSidebar/>

        <div className="container mx-auto">
        <h1 className="text-6xl font-bold text-center text-gray-400">New and Treding</h1>
        <p className="text-center text-gray-400">Based on player counts and release date</p>

        <div className="form-control flex justify-center items-center text-gray-400">
            <input onChange={handleSearch} type="text" placeholder="Search..." 
              className="sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px]  
                         pl-3 input-bordered h-10 hover:bg-white mt-7
                        transition duration-300 hover:text-black rounded-full
                        colorSearch"
            />
          </div>
 
        <FetchGames
            search={search}
            pagination={pagination}
            setGames={setGames}
            setError={setError}
            setLoading={setLoading}
        />

        {/* PAGINATION */}
        <div className="join m-7 flex justify-center">
            <button
                disabled={pagination===1}
                onClick={()=> setPagination((prevState) => prevState-1)}
                className="join-item btn btn-outline text-gray-400">
                    Previous
            </button>
            <button disabled className="join-item btn">{pagination}</button>
            <button
                onClick={()=> setPagination((prevState)=> prevState+1)}
                className="join-item btn btn-outline text-gray-400">
                    Next
            </button>
        </div>

        {error && <Error error={error}/>}
        
        {loading && <Loading/>}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8 sm:grid-cols-2">
                {games && games.map((game) => ( 
                    <Card key={game.id} game={game}/>
               ))}      
                </div>
               
        </div>        
        </>
      )
}