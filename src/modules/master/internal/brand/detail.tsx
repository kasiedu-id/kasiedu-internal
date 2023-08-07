import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HttpGet } from "../../../../config/api";
import BackLayout from "../../../../components/reusables/Layout/BackLayout";
import NameAvatar from "../../../../components/reusables/Avatar/NameAvatar";
import { settings } from "../../../../config/theme/constants";
import { BiEdit } from "react-icons/bi";
import BrandCreateUpdateModal from "../../../../components/reusables/Modal/BrandCreateUpdate";

function BrandDetail() {
  const param = useParams();
  const [brand, setBrand] = useState(null);
  const [brandId, setBrandId] = useState(0);
  const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);

  async function getBrandInfo() {
    try {
      let res = await HttpGet(`brands/${param.id}`, null);

      setBrand(res);
    } catch (error) {
      toast(error?.message);
    }
  }

  function changeModalSetting({ open, categoryId, categoryName }) {
    setBrandId(categoryId);
    setModalCreateUpdateOpen(open);
  }

  useEffect(() => {
    getBrandInfo();
  }, []);

  return (
    <div>
      <BackLayout navigation={-1} />
      <BrandCreateUpdateModal
        open={modalCreateUpdateOpen}
        id={brandId}
        section={"update"}
        onClick={() =>{
          changeModalSetting({
            open: false,
            categoryId: null,
            categoryName: "",
          });

          getBrandInfo();
        }}
      />
      <div className="p-4">
        <div>
          {brand?.logo ? (
            <img
              src={`${settings.baseUrl}${brand?.logo.replace('public/', "")}`}
              className="h-[90px] w-[90px] rounded-full bg-center object-cover mx-auto"
              alt={`Profile ${brand?.name}`}
            />
          ) : (
            <NameAvatar name={brand?.name ?? ""} middle={true} />
          )}
        </div>
        <div className="my-3">
          <div className="flex justify-center">
            <p className="text-center font-bold mr-2">{brand?.name}</p>
            <BiEdit
              color="green"
              size={15}
              onClick={() =>
                changeModalSetting({
                  open: true,
                  categoryId: brand?.id,
                  categoryName: brand?.name,
                })
              }
            />
          </div>
          <div className="my-2 text-xs text-center">
            <a href={`https://${brand?.url}`} target="_blank" rel="noreferrer" className="text-[blue] underline">Visit Website</a>
          </div>
        </div>
        <div>
          <p className="font-[300] text-sm">{brand?.description}</p>
        </div>
        <div className="my-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold">Sponsor Activity</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[blue]">Show All</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandDetail;
