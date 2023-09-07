import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlineHomeWork, MdOutlineCategory } from "react-icons/md";

function InternalDashboard() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 text-center text-white text-sm">
        <div
          className="h-[100px] bg-[#07638d] rounded-md"
          onClick={() => navigate("/masters/brands")}
        >
          <MdOutlineHomeWork
            color="currentColor"
            size={40}
            className="my-2 mx-auto"
          />
          <p>Brand List</p>
        </div>
        <div
          className="h-[100px] bg-[#07638d] rounded-md"
          onClick={() => navigate("/admins")}
        >
          <HiUserGroup
            color="currentColor"
            size={40}
            className="my-2 mx-auto"
          />
          <p>User List</p>
        </div>
        <div
          className="h-[100px] bg-[#07638d] rounded-md"
          onClick={() => navigate("/masters/categories")}
        >
          <MdOutlineCategory
            color="currentColor"
            size={40}
            className="my-2 mx-auto"
          />
          <p>Category List</p>
        </div>
      </div>
    </div>
  );
}

export default InternalDashboard;
