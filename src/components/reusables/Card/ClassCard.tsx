import moment from "moment";
import { thousandSeparator } from "../../../utils/ThousandSeparator";

function ClassCard({
  categories,
  title,
  openRegis,
  closeRegis,
  startClass,
  totalStudent,
  duration,
  crowdfunding,
  price,
  isPrivate,
  maxStudent,
  editMode,
  editCategoryClick,
  listStudentClick,
  addSponsorClick,
  editRequirementClick,
  editCurriculumClick,
  editClassClick,
  detailClick,
  deleteClick,
  classCode,
  deletedAt,
  recoveryClick,
}: any) {
  let total = Array(3).fill(0);

  return (
    <div className="bg-[#07638d] p-4 text-white rounded-xl w-full">
      <div className={`grid grid-cols-2 gap-10 justify-between items-center`}>
        <div>
          <div className="mb-2">
            <div className="flex justify-between">
              <div className="max-w-[60%]">
                <p className="font-bold text-xl text-white">{title} / <span className="font-normal">{classCode}</span></p>
                <div className="mt-2 flex flex-wrap gap-3 max-h-[50px] overflow-hidden">
                  {categories.length > 2 ? total.map((_, i) => {
                    if (i === 2) return (
                      <div
                        className="rounded-full py-1 px-3 bg-gray-400 capitalize"
                        key={categories[i].id}
                      >
                        <p className="italic text-white text-center text-sm">+{categories.length - 2}</p>
                      </div>
                    )
                    return (
                      <div
                        className="rounded-full py-1 px-3 bg-gray-400 capitalize"
                        key={categories[i].id}
                      >
                        <p className="italic text-white text-center text-sm">{categories[i]?.category.name}</p>
                      </div>
                    )
                  }) : categories.map((data: any) => {
                    return (
                      <div
                        className="rounded-full py-1 px-2 bg-gray-400 capitalize"
                        key={data.id}
                      >
                        <p className="italic text-white text-center text-sm">{data?.category.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="">
                <div className="border rounded-full p-2 text-center">
                  <p className="text-sm text-white">{isPrivate ? "Private" : "Public"}</p>
                </div>
                <div className="mt-3">
                  <p className="font-semibold text-white">Rp. {thousandSeparator(String(price))}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5 gap-10 justify-between">
            {/* <div className="flex"> */}
            <div>
              <div>
                <p className="font-bold text-white">Registrasi Dimulai</p>
                <p className="text-white">{openRegis ? moment.unix(openRegis).format("DD-MM-YYYY") : "N/A"}</p>
              </div>
            </div>
            <div>
              <div>
                <p className="font-bold text-white">Registrasi Ditutup</p>
                <p className="text-white">{closeRegis ? moment.unix(closeRegis).format("DD-MM-YYYY") : "N/A"}</p>
              </div>
            </div>
            <div>
              <div>
                <p className="font-bold text-white">Kelas Dimulai</p>
                <p className="text-white">{startClass ? moment.unix(startClass).format("DD-MM-YYYY") : "N/A"}</p>
              </div>
            </div>
          </div>
          <div className="flex mt-5 gap-10 justify-between">
            <div>
              <div className="mt-3">
                <p className="font-bold text-white">Total Peserta</p>
                <p className="text-white">{totalStudent} / {maxStudent}</p>
              </div>
            </div>
            <div>
              <div className="mt-3">
                <p className="font-bold text-white">Durasi Belajar</p>
                <p className="text-white">{duration ?? "N/A"}</p>
              </div>
            </div>
            <div>
              <div className="mt-3">
                <p className="font-bold text-white">Crowd Project</p>
                <p className="text-white">{crowdfunding ?? "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
        {
          editMode ? <div className="grid grid-cols-2 gap-1 justify-between items-center">
            <button
              onClick={listStudentClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
            >
              {/* <GroupsOutlinedIcon sx={{ marginRight: "10px" }} /> */}
              <span>Lihat Peserta</span>
            </button>
            <button
              onClick={detailClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
            >
              {/* <InfoIcon sx={{ marginRight: "5px" }} />  */}
              <span>View Detail</span>
            </button>
            {totalStudent > 0 ? null : (
              <button
                onClick={deleteClick}
                className="text-white bg-red-500 font-bold px-4 rounded h-[46px] inline-flex items-center"
              >
                {/* <DeleteOutlinedIcon sx={{ marginRight: "5px" }} />  */}
                <span>Hapus</span>
              </button>
            )}
            <button
              onClick={addSponsorClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center">
              {/* <GroupsOutlinedIcon sx={{ marginRight: "10px" }} /> */}
              <span>Add Sponsor</span>
            </button>
            <button
              onClick={editClassClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
            >
              {/* <GroupsOutlinedIcon sx={{ marginRight: "10px" }} /> */}
              <span>Edit Class</span>
            </button>
            <button
              onClick={editRequirementClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
            >
              {/* <GroupsOutlinedIcon sx={{ marginRight: "10px" }} /> */}
              <span>Edit Requirement</span>
            </button>
            <button
              onClick={editCurriculumClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
            >
              {/* <InfoIcon sx={{ marginRight: "5px" }} />  */}
              <span>Edit Curriculum</span>
            </button>
            <button
              onClick={editCategoryClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
            >
              {/* <DeleteOutlinedIcon sx={{ marginRight: "5px" }} />  */}
              <span>Edit Category</span>
            </button>
          </div> : <div className="grid grid-cols-2 gap-1 justify-between items-center">
            <button
              onClick={detailClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
            >
              {/* <InfoIcon sx={{ marginRight: "5px" }} />  */}
              <span>View Detail</span>
            </button>
            <button
              onClick={recoveryClick}
              className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
            >
              {/* <GroupsOutlinedIcon sx={{ marginRight: "10px" }} /> */}
              <span>Recovery</span>
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default ClassCard;
