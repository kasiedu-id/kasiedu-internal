import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPost } from "../../../../config/api";
import BackLayout from "../../../../components/reusables/Layout/BackLayout";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";
import TextButton from "../../../../components/reusables/Button/TextButton";
import AddFloatingBtn from "../../../../components/reusables/Button/AddFloatingButton";
import CreateUpdateCategoryModal from "../../../../components/reusables/Modal/CreateUpdateCategory";
import { BiTrash, BiEdit } from "react-icons/bi";
import DeleteCategoryModal from "../../../../components/reusables/Modal/DeleteCategory";

function CategoryList() {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [sectionModal, setSectionModal] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function
  async function getCategory() {
    try {
      let res = await HttpPost("categories", {
        limit: 20,
        start: 0,
        method: 'all',
        name
      }, null);

      setCategory(res);
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
    getCategory();
  }, []);

  return (
    <div>
      <BackLayout navigation={-1} />
      <div className="p-4">
        <AddFloatingBtn
          onClick={() =>
            changeModalSetting({
              open: true,
              section: "create",
              categoryId: null,
              categoryName: "",
            })
          }
        />
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

            getCategory();
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

            getCategory();
          }}
        />
        <div className="flex gap-2 mb-4">
          <InputSingleField
            required={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Category Name"}
          />
          <div className="pt-2">
            <TextButton title="Search" onClick={() => null} disable={false} />
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
      </div>
    </div>
  );
}

export default CategoryList;
