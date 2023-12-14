import { Link } from "react-router-dom"

export default function Error({error}){
    return (
        <div className="text-center mt-20">
        <p className="text-red-700 text-7xl font-bold m-6 uppercase">{error}</p>
        <Link to="/" className="btn btn-neutral uppercase w-26 mt-4"> Go to Homepage</Link>
        </div>
    )
}