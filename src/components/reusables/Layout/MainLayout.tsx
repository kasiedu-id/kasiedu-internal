import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import { useEffect } from "react";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    
    if (!token) navigate("/auths/sign-in");
  }, [location]);

  return (
    <div className="max-w-[550px] mx-auto">
      <div>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default MainLayout;
