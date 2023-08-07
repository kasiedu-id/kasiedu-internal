import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPost } from "../../../../config/api";
import BackLayout from "../../../../components/reusables/Layout/BackLayout";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";
import TextButton from "../../../../components/reusables/Button/TextButton";
import NameAvatar from "../../../../components/reusables/Avatar/NameAvatar";
import { useNavigate } from "react-router-dom";
import PhotoAvatar from "../../../../components/reusables/Avatar/PhotoAvatar";
import AddFloatingBtn from "../../../../components/reusables/Button/AddFloatingButton";
import BrandCreateUpdateModal from "../../../../components/reusables/Modal/BrandCreateUpdate";
import truncate from "../../../../utils/function";
import { BiTrash } from "react-icons/bi";
import DeleteBrandModal from "../../../../components/reusables/Modal/DeleteBrand";

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  // Function
  async function getBrands() {
    try {
      let res = await HttpPost("brands", {
        limit: 20,
        start: 0,
        method: 'partial',
        name
      }, null);

      setBrands(res);
    } catch (error) {
      toast(error.message);
    }
  }

  function changeModalSetting({ open, section, categoryId, categoryName }) {
    setBrandId(categoryId);
    section === "delete"
      ? setDeleteModalOpen(open)
      : setModalCreateUpdateOpen(open);
    setBrandName(categoryName);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div>
      <BackLayout navigation={-1} />
      <div className="p-4">
        <AddFloatingBtn onClick={() => setModalCreateUpdateOpen(true)} />
        <BrandCreateUpdateModal
          open={modalCreateUpdateOpen}
          id={null}
          section={"create"}
          onClick={() => {
            getBrands();
            setModalCreateUpdateOpen(false)
          }}
        />
        <DeleteBrandModal
          open={deleteModalOpen}
          brandId={brandId}
          brandName={brandName}
          onCancel={() =>
            changeModalSetting({
              open: false,
              section: "delete",
              categoryId: null,
              categoryName: "",
            })
          }
          onAccept={() => {
            changeModalSetting({
              open: false,
              section: "delete",
              categoryId: null,
              categoryName: "",
            });

            getBrands();
          }}
        />
        <div className="flex gap-2 mb-4">
          <InputSingleField
            required={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Brand Name"}
          />
          <div className="pt-2">
            <TextButton title="Search" onClick={() => getBrands()} disable={false} />
          </div>
        </div>
        {brands.map((data) => {
          return (
            <div
              key={data?.id}
              className="bg-[#07638d] rounded-lg text-white my-2 py-3 px-5"
              
            >
              <div className="flex items-center">
                {data?.logo ? (
                  <PhotoAvatar name={data?.logo} middle={false} />
                ) : (
                  <NameAvatar name={data.name} middle={false} />
                )}
                <div className="w-3/4" onClick={() => navigate(`/masters/brands/${data.id}`)}>
                  <p className="font-black text-sm">{data.name}</p>
                  <p>{truncate(data?.description ?? "")}</p>
                </div>
                <div>
                  <BiTrash
                    color="red"
                    size={20}
                    onClick={() =>
                      changeModalSetting({
                        open: true,
                        section: "delete",
                        categoryId: data?.id,
                        categoryName: data?.name,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BrandList;
