import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { InputSingleField } from "../Field/InputField";
import { DropdownField } from "../Field/DropdownField";
import { HttpPost } from "../../../config/api";

function UploadImageModal({ open, onClick, vocationId, fileId, type }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [path, setPath] = useState(null);
  const types = [
    {
      name: "KTP",
      path: "identification",
    },
    {
      name: "Desain Sertifikat",
      path: "certificate-design",
    },
    {
      name: "Legal Dokumen",
      path: "legal-document",
    },
    {
      name: "Photo Profil",
      path: "photo-profile",
    },
  ];

  async function submit() {
    try {
        const payload = new FormData();

        payload.append('document-vocation', image);
        payload.append('name', name);
        payload.append('documentType', path);

        await HttpPost(`internal/vocations/upload-document/${vocationId}`, payload, null);

        onClick()
    } catch (error) {
      toast(error?.message);
    }
  }

  useEffect(() => {
    setImage(null);
    setName("");

    let index = types.findIndex((data) => data.name === type);

    setPath(types[index]?.path);
  }, [open])

  return (
    <div
      className={`fixed ${
        open ? "" : "hidden"
      } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
    >
      <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
            Upload File
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500 text-center">
              Please upload your file below:
            </p>
          </div>
          <div className="mt-4 text-black">
            <div className="border h-[150px] w-[150px] mx-auto mb-5">
              {image ? (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-${type.replace(/ /g, '-')}`}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </label>
              ) : (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-${type.replace(/ /g, '-')}`}
                >
                  Document
                </label>
              )}
              <input type="file" accept=".png,.jpg,.pdf" hidden id={`file-${type.replace(/ /g, '-')}`} onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="mb-2">
              <InputSingleField
                placeholder={"KTP"}
                required={true}
                label={"Nama File"}
                value={name}
                type={"text"}
                textColor={"black"}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
            <DropdownField
              collectionList={types}
              value={path || ""}
              label={"File Type"}
              keyField={"name"}
              labelField={"name"}
              valueField={"path"}
              required={true}
              textColor={"black"}
              placeholder={"Pilih tipe file..."}
              onChange={(e) => setPath(e.target.value)}
            />
          </div>
          <div className="items-center mt-3 py-3 text-center" onClick={() => submit()}>
            <div
              id="ok-btn"
              className={`cursor-pointer px-4 py-2 bg-[#07638d] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#07638d] focus:outline-none focus:ring-2 focus:ring-[#07638d]`}
            >
              <p>Submit</p>
            </div>
          </div>
          <div className="items-center mt-3 py-3 text-center" onClick={onClick}>
            <div
              id="ok-btn"
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

export default UploadImageModal;
