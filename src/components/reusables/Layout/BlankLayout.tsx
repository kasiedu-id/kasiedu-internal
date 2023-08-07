import { Outlet } from "react-router-dom";

const BlankLayout = () => (
  <div className="max-w-[550px] mx-auto bg-gradient-to-tl from-[#ffcd56] to-[#07638d] min-h-screen text-white">
    <Outlet />
  </div>
);

export default BlankLayout;
