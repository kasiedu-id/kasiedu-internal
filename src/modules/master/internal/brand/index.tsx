import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPost } from "../../../../config/api";
import BackLayout from "../../../../components/reusables/Layout/BackLayout";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";
import TextButton from "../../../../components/reusables/Button/TextButton";
import NameAvatar from "../../../../components/reusables/Avatar/NameAvatar";
import { useNavigate } from "react-router-dom";
import PhotoAvatar from "../../../../components/reusables/Avatar/PhotoAvatar";
import BrandCreateUpdateModal from "../../../../components/reusables/Modal/BrandCreateUpdate";
import truncate from "../../../../utils/function";
import { BiTrash } from "react-icons/bi";
import DeleteBrandModal from "../../../../components/reusables/Modal/DeleteBrand";

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [brandId, setBrandId] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  // Function
  async function getBrands({
    page,
  }) {
    try {
      let res = await HttpPost("brands", {
        limit: limit,
        start: page,
        method: 'partial',
        name
      }, null);

      setBrands(res.rows);
      setTotalCount(res.count);
      setPage(page)
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
    getBrands({
      page: 0
    });
  }, []);

  return (
    <div>
      {/* <BackLayout navigation={-1} /> */}
      <div className="p-4">
        <div className="max-w-[100px] ml-auto">
          <TextButton
            title="Add"
            disable={false}
            onClick={() =>
              setModalCreateUpdateOpen(true)
            }
          />
        </div>
        <BrandCreateUpdateModal
          open={modalCreateUpdateOpen}
          id={null}
          section={"create"}
          onClick={() => {
            getBrands({
              page: 0,
            });
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

            getBrands({
              page: 0,
            });
          }}
        />
        <div className="flex justify-between items-center gap-10 mb-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <InputSingleField
              required={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"Brand Name"}
            />
          </div>
          <div className="pt-2">
            <TextButton title="Search" onClick={() => getBrands({
              page: 0,
            })} disable={false} />
          </div>
        </div>
        {brands.map((data) => {
          return (
            <div
              key={data?.id}
              className="bg-[#07638d] rounded-lg text-white my-2 py-3 px-5"

            >
              <div className="flex items-center cursor-pointer">
                {data?.logo ? (
                  <PhotoAvatar name={data?.logo} middle={false} />
                ) : (
                  <NameAvatar name={data.name} middle={false} />
                )}
                <div className="w-3/4" onClick={() => navigate(`/settings/brands/${data.id}`)}>
                  <p className="font-black text-sm">{data.name}</p>
                  <p>{truncate(data?.description ?? "", 100)}</p>
                </div>
                <div>
                  <BiTrash
                    className="cursor-pointer"
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
      <div className="flex flex-rows justify-between px-4 mt-5">
        {
          page > 0 ? <p className="cursor-pointer font-semibold" onClick={() => getBrands({
            page: page - 1,
          })}>Previous</p> : <div></div>
        }
        {
          totalCount > 0 ? <p>Page {page + 1} of {Math.ceil(totalCount / limit)}</p> : <div></div>
        }
        {
          page + 1 <= totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => getBrands({
            page: page + 1,
          })}>Next</p> : <div></div>
        }
      </div>
    </div>
  );
}

export default BrandList;
