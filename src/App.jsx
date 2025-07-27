import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}));
      }
      else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false));
  }, [dispatch])

  if(loading) return null;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <Outlet /> {/* Page components render honge yahan */}
    </div>
  );
}

export default App;
