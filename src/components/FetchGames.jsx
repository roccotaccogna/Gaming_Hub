import { useEffect } from "react";

const FetchGames = ({ search, pagination, setGames, setError, setLoading }) => {

    useEffect(() => {
       setError("");
       setGames([]);
       setLoading(true);
   
       //CALLING API
       const timeoutAPI = setTimeout(() => {
         async function fetchDataAPI() {
   
           try {
             const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=${pagination}&page_size=50&search=${search}`);
   
             if (response.ok) {
               const json = await response.json()
               setGames(json.results);
             } else {
               setError("Not Found");
             }
           } catch (error) {
             setError("Not Found");
           }
           setLoading(false);
         }
         fetchDataAPI();
       }, 1500);

       return () => {
         clearTimeout(timeoutAPI);
       };
    }, [search, pagination]);
   };
   
   
   export default FetchGames;