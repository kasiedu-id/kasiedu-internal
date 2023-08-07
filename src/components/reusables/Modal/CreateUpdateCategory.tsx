import { useEffect, useState } from "react";
import { InputSingleField } from "../Field/InputField";
import { toast } from "react-toastify";
import { HttpPost, HttpPut } from "../../../config/api";

function CreateUpdateCategoryModal({
  open,
  onCancel,
  categoryId,
  categoryName,
  section,
  onAccept,
}) {
  const [name, setName] = useState("");
  const [fixName, setFixName] = useState("Category");

  async function submit() {
    try {
      if (section === "create") {
        await HttpPost(
          "internal/categories",
          {
            name,
          },
          null
        );

        toast("Success create new category");
      } else {
        await HttpPut(
            `internal/categories/${categoryId}`,
            {
              name,
            },
            null
          );
  
          toast("Success update a category");
      }

      onAccept();
    } catch (error) {
      toast(error?.message);
    }
  }

  useEffect(() => {
    setName("");
    if (categoryId) {
        setFixName(categoryName);
        setName(categoryName);
    };
  }, [open]);

  return (
    <div
      className={`fixed ${
        open ? "" : "hidden"
      } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full max-w-[550px] mx-auto`}
    >
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-sm text-center leading-6 font-medium text-gray-900">
            {section === "create" ? "Create" : "Update"}
          </h3>
          <h2 className="text-base mt-2 text-center leading-4 font-bold text-gray-700 capitalize">
            {fixName}
          </h2>
          <div>
            <div className="mt-6 mb-3">
              <InputSingleField
                required={false}
                placeholder={"Design AI"}
                type={"text"}
                textColor={"black"}
                label={"Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div
              className="items-center py-3 text-center"
              onClick={() => submit()}
            >
              <div
                id="ok-btn"
                className={`cursor-pointer px-4 py-2 bg-[#07638d] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#07638d] focus:outline-none focus:ring-2 focus:ring-[#07638d]`}
              >
                <p>{section === "create" ? "Create" : "Update"}</p>
              </div>
            </div>
            <div
              className="items-center py-3 text-center"
              onClick={onCancel}
            >
              <div
                id="ok-btn"
                className={`cursor-pointer px-4 py-2 bg-[transparent] text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-[transparent] focus:outline-none focus:ring-2 focus:ring-[transparent]`}
              >
                <p>Cancel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUpdateCategoryModal;
