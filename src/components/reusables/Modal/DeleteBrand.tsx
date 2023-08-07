import { toast } from "react-toastify";
import { HttpDelete } from "../../../config/api";

function DeleteBrandModal({ open, onCancel, brandName, brandId, onAccept }) {
    async function submit(){
        try {
            await HttpDelete(`internal/brands/${brandId}`, null);

            onAccept();
        } catch (error) {
            toast(error?.message)
        }
    }


    return (
      <div
        className={`fixed ${
          open ? "" : "hidden"
        } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
      >
        <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-base text-center leading-6 font-medium text-gray-900">
              Delete Brand
            </h3>
            <h2 className="text-lg mt-3 text-center leading-6 font-bold text-gray-700 capitalize">
              {brandName}
            </h2>
            <div className="mt-2 py-3">
              <p className="text-sm text-gray-500 text-center">
                Are you sure want to delete this brand ?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="items-center mt-3 py-3 text-center"
                onClick={() => submit()}
              >
                <div
                  id="ok-btn"
                  className={`cursor-pointer px-4 py-2 bg-[#07638d] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#07638d] focus:outline-none focus:ring-2 focus:ring-[#07638d]`}
                >
                  <p>Yes</p>
                </div>
              </div>
              <div
                className="items-center mt-3 py-3 text-center"
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
  
  export default DeleteBrandModal;
  