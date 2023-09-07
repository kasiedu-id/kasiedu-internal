import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    
    if (!token) navigate("/auths/sign-in");
  }, [location]);

  return (
    <div>
      <div className="h-screen overflow-hidden">
        <Sidebar />
      </div>
    </div>
  );
}

export default MainLayout;
