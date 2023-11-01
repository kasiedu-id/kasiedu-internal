import { useEffect, useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { toast } from "react-toastify";
import { InputSingleField } from "../Field/InputField";
import { TextAreaField } from "../Field/TextAreaField";
import { HttpGet, HttpPost, HttpPut } from "../../../config/api";
import { settings } from "../../../config/theme/constants";

function UploadEvent({ open, onClick, vocationId, id, section }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  async function submit() {
    try {
      const payload = new FormData();

      payload.append('gallery-vocation', image);
      payload.append('name', name);
      payload.append('description', description);
      payload.append('date', eventDate);
      payload.append('vocationId', vocationId);

      if (section === 'create') {
        await HttpPost('internal/galleries', payload, null)
      } else if (section === 'update') {
        await HttpPut(`internal/galleries/${id}`, payload, null)
      }

      onClick()
    } catch (error) {
      toast(error?.message);
    }
  }

  async function fetchDetail() {
    try {
      let res = await HttpGet(`galleries/${id}`, null);

      console.log(res);

      setImage(res);
      setEventDate(res.date);
      setName(res.name);
      setDescription(res.description);
    } catch (error) {
      toast(error?.message);
    }
  }

  function reset() {
    setImage(null);
    setName("");
    setDescription("");
    setEventDate("");
  }

  useEffect(() => {
    section === 'update' ? fetchDetail() : reset();
  }, [open]);

  return (
    <div
      className={`fixed ${open ? "" : "hidden"
        } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
    >
      <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg max-w-[550px] rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
            Upload Event
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500 text-center">
              Please upload your event below:
            </p>
          </div>
          <div className="mt-4 text-black">
            <div className="border h-[150px] w-[150px] mx-auto mb-5">
              {image ? (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-event-photo`}
                >
                  <img
                    src={image?.image ? `${settings.baseUrl}${image?.image?.replace('public/', '')}` : URL.createObjectURL(image)}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </label>
              ) : (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-event-photo`}
                >
                  <AiOutlineFileImage className="mr-[10px]" />
                  Photo
                </label>
              )}
              <input
                type="file"
                accept=".png,.jpg,.pdf"
                hidden
                id={`file-event-photo`}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="mb-2">
              <InputSingleField
                placeholder={"Webinar"}
                required={true}
                label={"Nama Acara"}
                value={name}
                type={"text"}
                textColor={"black"}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <TextAreaField
                labelWeight={""}
                label={"Deskripsi"}
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                labelColor={""}
              />
            </div>
            <div className="mb-2">
              <InputSingleField
                placeholder={"21 Juni 2020"}
                required={true}
                label={"Tanggal Acara"}
                value={eventDate}
                type={"text"}
                textColor={"black"}
                onChange={(e: any) => setEventDate(e.target.value)}
              />
            </div>
          </div>
          <div
            className="items-center mt-3 py-3 text-center"
            onClick={() => submit()}
          >
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

export default UploadEvent;
