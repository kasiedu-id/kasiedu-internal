import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpGet, HttpPost } from "../../../../config/api";
import BackLayout from "../../../../components/reusables/Layout/BackLayout";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";
import TextButton from "../../../../components/reusables/Button/TextButton";
import AddFloatingBtn from "../../../../components/reusables/Button/AddFloatingButton";
import CreateUpdateCategoryModal from "../../../../components/reusables/Modal/CreateUpdateCategory";
import { BiTrash, BiEdit } from "react-icons/bi";
import DeleteCategoryModal from "../../../../components/reusables/Modal/DeleteCategory";

function CategoryList() {
  const limit = 10;
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [sectionModal, setSectionModal] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function
  async function getCategory({
    page,
    name
  }) {
    try {
      let res = await HttpPost("categories", {
        limit: limit,
        start: page,
        method: 'partial',
        name
      }, null);

      console.log(res);
      setCategory(res.rows);
      setTotalCount(res.count);
      setPage(page)
    } catch (error) {
      toast(error.message);
    }
  }

  function changeModalSetting({ open, section, categoryId, categoryName }) {
    setCategoryId(categoryId);
    setSectionModal(section);
    section === "delete"
      ? setDeleteModalOpen(open)
      : setModalCreateUpdateOpen(open);
    setCategoryName(categoryName);
  }

  useEffect(() => {
    getCategory({
      page,
      name
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
              changeModalSetting({
                open: true,
                section: "create",
                categoryId: null,
                categoryName: "",
              })
            }
          />
        </div>
        <CreateUpdateCategoryModal
          open={modalCreateUpdateOpen}
          categoryId={categoryId}
          section={sectionModal}
          categoryName={categoryName}
          onCancel={() =>
            changeModalSetting({
              open: false,
              section: "create",
              categoryId: null,
              categoryName: "",
            })
          }
          onAccept={() => {
            changeModalSetting({
              open: false,
              section: "create",
              categoryId: null,
              categoryName: "",
            });

            getCategory({
              page: 0,
              name
            });
          }}
        />
        <DeleteCategoryModal
          open={deleteModalOpen}
          onCancel={() =>
            changeModalSetting({
              open: false,
              section: "delete",
              categoryId: null,
              categoryName: "",
            })
          }
          categoryId={categoryId}
          categoryName={categoryName}
          onAccept={() => {
            changeModalSetting({
              open: false,
              section: "delete",
              categoryId: null,
              categoryName: "",
            });

            getCategory({
              page: 0,
              name
            });
          }}
        />
        <div className="flex justify-between items-center gap-10 mb-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <InputSingleField
              required={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"Category Name"}
            />
          </div>
          <div className="pt-2">
            <TextButton title="Search" onClick={() => getCategory({
              page: 0,
              name
            })} disable={false} />
          </div>
        </div>
        {category.map((data) => {
          return (
            <div
              key={data?.id}
              className="bg-[#07638d] rounded-lg text-white py-2 px-3 mb-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm capitalize">{data.name}</p>
                </div>
                <div className="flex items-center">
                  <BiEdit
                    color="green"
                    className="mr-3"
                    size={20}
                    onClick={() =>
                      changeModalSetting({
                        open: true,
                        section: "update",
                        categoryId: data?.id,
                        categoryName: data?.name,
                      })
                    }
                  />
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

        <div className="flex flex-rows justify-between px-4 mt-5">
          {
            page > 0 ? <p className="cursor-pointer font-semibold" onClick={() => getCategory({
              page: page - 1,
              name
            })}>Previous</p> : <div></div>
          }
          {
            totalCount > 0 ? <p>Page {page + 1} of {Math.ceil(totalCount / limit)}</p> : <div></div>
          }
          {
            page + 1 <= totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => getCategory({
              page: page + 1,
              name
            })}>Next</p> : <div></div>
          }
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
