import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPost } from "../../../config/api";
import { InputSingleField } from "../../../components/reusables/Field/InputField";
import TextButton from "../../../components/reusables/Button/TextButton";
import NameAvatar from "../../../components/reusables/Avatar/NameAvatar";
import { useNavigate } from "react-router-dom";
import PhotoAvatar from "../../../components/reusables/Avatar/PhotoAvatar";
import VocationCreateUpdateModal from "../../../components/reusables/Modal/VocationCreateUpdate";
import UploadVocationCsvFile from "../../../components/reusables/Modal/UploadCsvVocation";

function VocationList() {
  const [vocations, setVocations] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
  const [openCsvUpload, setOpenCsvUpload] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [vocationId, setVocationId] = useState("");
  const [vocationName, setVocationName] = useState("");

  // Function
  async function getVocations({
    page
  }) {
    try {
      let res = await HttpPost("vocations", {
        limit: limit,
        start: page,
        method: 'partial',
        name
      }, null);


      setVocations(res.rows);
      setTotalCount(res.count);
      setPage(page)
    } catch (error) {
      toast(error.message);
    }
  }

  useEffect(() => {
    getVocations({
      page: 0
    });
  }, []);

  return (
    <div>
      {/* <BackLayout navigation={"/vocations"} /> */}
      <UploadVocationCsvFile
        open={openCsvUpload}
        onCancel={() => setOpenCsvUpload(false)}
        onAccept={() => {
          getVocations({ page: 0 });
          setOpenCsvUpload(false);
        }}
      />
      <VocationCreateUpdateModal
        open={modalCreateUpdateOpen}
        onClick={() => {
          setModalCreateUpdateOpen(false)
          getVocations({
            page: 0
          });
        }}
        id={vocationId}
        section={"create"}
      />
      <div className="p-4">
        <div className="flex gap-5 ml-auto justify-end">
          {/* <div className="w-[100px]">
            <TextButton title="Import" onClick={() => setOpenCsvUpload(true)} disable={false} />
          </div> */}
          <div className="w-[100px]">
            <TextButton
              title="Add"
              disable={false}
              onClick={() =>
                setModalCreateUpdateOpen(true)
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-10 mb-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Vocation Name"} />
          </div>
          <div className="pt-2">
            <TextButton
              title="Search"
              onClick={() => getVocations({
                page: 0
              })}
              disable={false}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 overflow-auto max-h-[65vh]">
          {vocations.map((data) => {
            return (
              <div key={data?.id} className="min-h-[150px] bg-[#07638d] rounded-lg text-white py-3 px-5 mb-5" onClick={() => navigate(`/vocations/${data.id}`)}>
                <div className="flex items-center">
                  <div className="min-w-[20%]">
                  {
                    data?.photoProfile ? <PhotoAvatar name={data?.photoProfile} middle={false} /> : <NameAvatar name={data.name} middle={false} />
                  }
                  </div>
                  <div>
                    <p className="font-black text-sm">{data.name} {data?.customerCode ? '/' : ''}{data?.customerCode}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {data?.categories?.map((category) => {
                        return (
                          <div className="rounded-full py-1 px-3 bg-slate-400">
                            <p className="capitalize text-xs">{category?.category?.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-bold">PIC Name</p>
                      <p className="text-xs">{data.cpName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">PIC Phone</p>
                      <p className="text-xs">{data.cpPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">PIC Email</p>
                      <p className="text-xs">{data.cpEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Vocation Email</p>
                      <p className="text-xs">{data.emailVocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-rows justify-between px-4 mt-5">
        {
          page > 0 ? <p className="cursor-pointer font-semibold" onClick={() => getVocations({
            page: page - 1,
          })}>Previous</p> : <div></div>
        }
        {
          totalCount > 0 ? <p>Page {page + 1} of {Math.ceil(totalCount / limit)}</p> : <div></div>
        }
        {
          page + 1 <= totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => getVocations({
            page: page + 1,
          })}>Next</p> : <div></div>
        }
      </div>
    </div>
  );
}

export default VocationList;
