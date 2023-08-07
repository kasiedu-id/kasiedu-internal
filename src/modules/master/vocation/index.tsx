import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPost } from "../../../config/api";
import BackLayout from "../../../components/reusables/Layout/BackLayout";
import { InputSingleField } from "../../../components/reusables/Field/InputField";
import TextButton from "../../../components/reusables/Button/TextButton";
import NameAvatar from "../../../components/reusables/Avatar/NameAvatar";
import { useNavigate } from "react-router-dom";
import PhotoAvatar from "../../../components/reusables/Avatar/PhotoAvatar";
import VocationCreateUpdateModal from "../../../components/reusables/Modal/VocationCreateUpdate";
import AddFloatingBtn from "../../../components/reusables/Button/AddFloatingButton";

function VocationList() {
  const [vocations, setVocations] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [vocationId, setVocationId] = useState("");
  const [vocationName, setVocationName] = useState("");

  // Function
  async function getVocations() {
    try {
      let res = await HttpPost("vocations", {
        limit: 20,
        start: 0,
        method: 'partial',
        name
      }, null);

      console.log(res);

      setVocations(res);
    } catch (error) {
      toast(error.message);
    }
  }

  function changeModalSetting({ open, section, categoryId, categoryName }) {
    setVocationId(categoryId);
    section === "delete"
      ? setDeleteModalOpen(open)
      : setModalCreateUpdateOpen(open);
    setVocationName(categoryName);
  }

  useEffect(() => {
    getVocations();
  }, []);

  return (
    <div>
      <BackLayout navigation={"/vocations"} />
      <VocationCreateUpdateModal 
        open={modalCreateUpdateOpen}
        onClick={() => {
          setModalCreateUpdateOpen(false)
          getVocations();
        }}
        id={vocationId}
        section={"create"}
      />
      <AddFloatingBtn onClick={() => setModalCreateUpdateOpen(true)} />
      <div className="p-4">
        <div className="flex gap-2 mb-4">
            <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Vocation Name"} />
            <div className="pt-2">
                <TextButton title="Search" onClick={() => null} disable={false} />
            </div>
        </div>
        {vocations.map((data) => {
            let profile = null;
             data.documents.forEach((data) => {
                if(data?.document_type === "photo-profile") profile = data;
            });

          return (
            <div key={data?.id} className="min-h-[150px] bg-[#07638d] rounded-lg text-white py-3 px-5" onClick={() => navigate(`/vocations/${data.id}`)}>
              <div className="flex items-center">
                {
                    profile ? <PhotoAvatar name={profile?.image} middle={false} /> : <NameAvatar name={data.name} middle={false} />
                }
                <div>
                  <p className="font-black text-sm">{data.name}</p>
                  <div className="flex gap-2 mt-3">
                    {data?.category?.map((category) => {
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
  );
}

export default VocationList;
