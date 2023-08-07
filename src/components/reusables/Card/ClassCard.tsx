import moment from "moment";

function ClassCard({
  categories,
  title,
  openRegis,
  closeRegis,
  startClass,
  totalStudent,
  duration,
  crowdfunding,
  detailClick,
  deleteClick,
}: any) {
  return (
    <div className="bg-[#07638d] p-4 text-white rounded-xl">
      <div className="mb-2">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-xl">{title}</p>
            <div className="mt-2 flex">
              {categories.map((data: any) => {
                return (
                  <div
                    className="rounded-full p-2 bg-gray-400 mr-1 capitalize"
                    key={data.id}
                  >
                    <p className="italic text-white text-center">{data.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {/* <div className="rounded p-2 bg-green-500 capitalize text-end">
              <p className="italic text-white text-center">Open Registration</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-5 justify-between">
        {/* <div className="flex"> */}
          <div>
            <div>
              <p className="font-bold">Registrasi Dimulai</p>
              <p>{openRegis ? moment(openRegis).format("L") : "N/A"}</p>
            </div>
          </div>
          <div>
            <div>
              <p className="font-bold">Registrasi Ditutup</p>
              <p>{closeRegis ? moment(closeRegis).format("L") : "N/A"}</p>
            </div>
          </div>
          <div>
            <div>
              <p className="font-bold">Kelas Dimulai</p>
              <p>{startClass ? moment(startClass).format("L") : "N/A"}</p>
            </div>
          </div>
      </div>
      <div className="grid grid-cols-3 mt-5 justify-between">
          <div>
            <div className="mt-3">
              <p className="font-bold">Total Peserta</p>
              <p>{totalStudent}</p>
            </div>
          </div>
          <div>
          <div className="mt-3">
              <p className="font-bold">Durasi Belajar</p>
              <p>{duration ?? "N/A"}</p>
            </div>
          </div>
          <div>
            <div className="mt-3">
              <p className="font-bold">Crowd Project</p>
              <p>{crowdfunding ?? "N/A"}</p>
            </div>
          </div>
      </div>
      <div className="mt-5">
          <div className="grid grid-cols-3 gap-1 justify-end items-center mb-2">
             <button className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center">
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
          </div>
        </div>
    </div>
  );
}

export default ClassCard;
