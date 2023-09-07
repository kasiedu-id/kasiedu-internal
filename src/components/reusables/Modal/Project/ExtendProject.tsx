import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPut } from "../../../../config/api";
import { InputSingleField } from "../../Field/InputField";

function ExtendProjectModal({
    open,
    projectId,
    projectName,
    onCancel,
    onAccept,
}) {
    const [projectStart, setProjectStart] = useState("");
    const [projectClose, setProjectClose] = useState("");

    async function extend() {
        try {
            await HttpPut(`internal/projects/extend/${projectId}`, {
                startDate: projectStart,
                closeDate: projectClose,
            }, null)

            toast("Success extend project!");
            onAccept();
        } catch (error) {
            toast(error.message)
        }
    }

    useEffect(() => {
        if (open) {
            setProjectClose("");
            setProjectStart("");
        }
    }, [open])

    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mx-auto`}
        >
            <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg max-w-[550px] rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
                        Extend Project
                    </h3>
                    <h2 className="text-2xl mt-3 text-center leading-6 font-bold text-gray-700">
                        {projectName}
                    </h2>
                    <div className="mt-2 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Are you sure want to extend this project ?
                        </p>
                    </div>
                    <div>
                        <InputSingleField
                            required={false}
                            placeholder={""}
                            type={"date"}
                            textColor={"black"}
                            label={"Project Start"}
                            value={projectStart}
                            onChange={(e) => setProjectStart(e.target.value)}
                        />
                        <InputSingleField
                            required={false}
                            placeholder={""}
                            type={"date"}
                            textColor={"black"}
                            label={"Project End"}
                            value={projectClose}
                            onChange={(e) => setProjectClose(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            className="items-center mt-3 py-3 text-center"
                            onClick={() => extend()}
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

export default ExtendProjectModal;
