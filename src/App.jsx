import { RouterProvider } from 'react-router-dom';
import AppContext from "./contexts/AppContext";
import router from './routes/Routing';
import useAuth from './hooks/useAuth';

function App() {
const data = useAuth();

  return (
    <>
    <AppContext.Provider value={data}>
    <RouterProvider router={router}/>
    </AppContext.Provider>
    </>
  )
}

export default App;
