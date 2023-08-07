import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineCastForEducation,
  MdGroups,
  MdAttachMoney,
} from "react-icons/md";

function VocationHomeDashboard() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 text-center text-white text-sm">
        <div className="h-[100px] bg-[#07638d] rounded-md" onClick={() => navigate('/vocations/list')}>
          <MdOutlineCastForEducation
            color="currentColor"
            size={40}
            className="my-2 mx-auto"
          />
          <p>Vocation List</p>
        </div>
        <div className="h-[100px] bg-[#07638d] rounded-md">
          <MdGroups color="currentColor" size={40} className="my-2 mx-auto" />
          <p>Class List</p>
        </div>
        <div className="h-[100px] bg-[#07638d] rounded-md">
          <MdAttachMoney
            color="currentColor"
            size={40}
            className="my-2 mx-auto"
          />
          <p>Withdrawal List</p>
        </div>
      </div>
    </div>
  );
}

export default VocationHomeDashboard;
