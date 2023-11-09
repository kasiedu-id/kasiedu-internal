import { Outlet } from "react-router-dom";

const BlankLayout = () => (
  <div className="bg-gradient-to-tl from-[#ffcd56] to-[#07638d] p-[50px] h-[100vh] flex items-center justify-center">
    <div className="border bg-white rounded w-full lg:max-w-[1440px]">
      <Outlet />
    </div>
  </div>
);

export default BlankLayout;
