import { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { settings } from "../../../config/theme/constants";
import { InputSingleField } from "../Field/InputField";
import { TextAreaField } from "../Field/TextAreaField";
import { HttpGet, HttpPost, HttpPut } from "../../../config/api";
import { toast } from "react-toastify";

function BrandCreateUpdateModal({ open, onClick, id, section }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    try {
      const payload = new FormData();

      payload.append("brand", image);
      payload.append("name", name);
      payload.append("description", description);
      payload.append("url", url);

      if (section !== "update") {
        await HttpPost(`internal/brands/`, payload, null);
        toast("Success create a new brands");
      } else {
        await HttpPut(
          `internal/brands/${id}`,
          payload,
          null
        );
        toast("Success update a brands");
      }

      onClick();
    } catch (error) {
      toast(error?.message);
    }
  }

  async function fetchDetail() {
    try {
      let res = await HttpGet(`brands/${id}`, null);

      let brand = res;

      setImage(brand?.logo ? brand : null);
      setName(brand?.name);
      setDescription(brand?.description);
      setUrl(brand?.url);
    } catch (error) {
      toast(error?.message);
    }
  }

  function reset() {
    setImage(null);
    setName("");
    setUrl("");
    setDescription("");
  }

  useEffect(() => {
    if (section === "create") reset();
    else if (id) fetchDetail();
  }, [open]);

  return (
    <div
      className={`fixed ${
        open ? "" : "hidden"
      } z-40 inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
    >
      <div className="relative mx-auto p-5 border w-[90%] shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
            Upload Brand
          </h3>
          <div className="mt-2 px-4 py-3">
            <p className="text-sm text-gray-500 text-center">
              Please upload brand information below:
            </p>
          </div>
          <div className="mt-4 text-black">
            <div className="border h-[150px] w-[150px] mx-auto mb-5">
              {image ? (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-${"image"}`}
                >
                  <img
                    src={
                      image?.logo
                        ? `${settings.baseUrl}${image?.logo.replace("public/", "")}`
                        : URL.createObjectURL(image)
                    }
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </label>
              ) : (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-${"image".replace(/ /g, "-")}`}
                >
                  <MdFileUpload style={{ marginRight: "10px" }} />
                  Image
                </label>
              )}
              <input
                type="file"
                hidden
                id={"file-image"}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="mb-2">
              <InputSingleField
                required={false}
                placeholder={"Top One"}
                type={"text"}
                textColor={"black"}
                label={"Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <TextAreaField
                label={"Description"}
                value={description}
                textColor={"black"}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <InputSingleField
                required={false}
                placeholder={"https://google.com"}
                type={"text"}
                textColor={"black"}
                label={"Url"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div
            className="items-center mt-3 pt-3 text-center"
            onClick={() => submit()}
          >
            <div
              id="ok-btn"
              className={`cursor-pointer px-4 py-2 bg-[#07638d] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#07638d] focus:outline-none focus:ring-2 focus:ring-[#07638d]`}
            >
              <p>Submit</p>
            </div>
          </div>
          <div
            className="items-center py-3 text-center"
            onClick={() => onClick()}
          >
            <div
              id={`section`}
              className={`cursor-pointer px-4 py-2 bg-[transparent] text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-[transparent] focus:outline-none focus:ring-2 focus:ring-[transparent]`}
            >
              <p>Close</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandCreateUpdateModal;
