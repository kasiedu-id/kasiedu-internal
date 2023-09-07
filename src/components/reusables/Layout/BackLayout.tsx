import { BsChevronCompactLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import KasiEduLogo from '../../../assets/logo/Logo-KasiEdu.png';

interface BackLayoutProps {
    navigation : any
}

function BackLayout({
    navigation
} : BackLayoutProps) {
    const navigate = useNavigate();

  return (
    <p
      className="flex bg-gradient-to-tl from-[#ffcd56] to-[#07638d] justify-start items-center text-xs py-4 font-semibold border-b-[1px] px-3 border-white cursor-pointer"
      onClick={() => navigate(navigation)}
    >
      <BsChevronCompactLeft size={20} /> 
      <img
          src={KasiEduLogo}
          alt={"Logo Kasi Edu"}
          className="block h-[30px] mt-[-10px] mx-auto pl-5"
        />
    </p>
  );
}

export default BackLayout;