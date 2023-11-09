import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpGet, HttpPut } from "../../../../config/api";
import { InputSingleField } from "../../Field/InputField";
import { DropdownField } from "../../Field/DropdownField";
import { TextAreaField } from "../../Field/TextAreaField";
import moment from "moment";

function EditProjectModal({
    open,
    projectId,
    projectName,
    onCancel,
    onAccept,
}) {
    const [name, setName] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState("");
    const [isExtend, setIsExtend] = useState("");
    const [projectStart, setProjectStart] = useState("");
    const [projectClose, setProjectClose] = useState("");

    async function update() {
        try {
            await HttpPut(`internal/projects/${projectId}`, {
                title: name,
                synopsis,
                description,
                isActive: active,
                extend: isExtend,
                startDate: projectStart,
                closeDate: projectClose,
            }, null)

            toast("Success update project!");
            onAccept();
        } catch (error) {
            toast(error.message)
        }
    }

    async function detail() {
        try {
            const res = await HttpGet(`internal/projects/${projectId}`, null);

            setActive(res.isActive);
            setName(res.title);
            setDescription(res.description);
            setSynopsis(res.synopsis);
            setProjectStart(res.startDate ? moment.unix(res.startDate).format('YYYY-MM-DD') : '');
            setProjectClose(res.closeDate ? moment.unix(res.closeDate).format('YYYY-MM-DD') : '');
        } catch (error) {
            toast(error.message)
        }
    }

    useEffect(() => {
        if (open) {
            detail();
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
                            Are you sure want to edit this project ?
                        </p>
                    </div>
                    <div>
                        <div className="mb-3">
                            <InputSingleField
                                required={false}
                                placeholder={""}
                                type={"text"}
                                textColor={"black"}
                                label={"Title"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <TextAreaField
                                labelWeight={""}
                                label={"Synopsis"}
                                value={synopsis}
                                labelColor={""}
                                onChange={(e) => setSynopsis(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <TextAreaField
                                labelWeight={""}
                                label={"Description"}
                                value={description}
                                labelColor={""}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <DropdownField
                                colorLabel={"black"}
                                label={"Activation"}
                                collectionList={[{
                                    name: "Active",
                                    value: true,
                                }, {
                                    name: "Deactive",
                                    value: false,
                                }]}
                                keyField={"name"}
                                valueField={"value"}
                                labelField={"name"}
                                value={active}
                                placeholder="Activation"
                                onChange={(e) => setActive(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <DropdownField
                                colorLabel={"black"}
                                label={"Is Extended ?"}
                                collectionList={[{
                                    name: "Extend",
                                    value: true,
                                }, {
                                    name: "No Extend",
                                    value: false,
                                }]}
                                keyField={"name"}
                                valueField={"value"}
                                labelField={"name"}
                                value={isExtend}
                                placeholder="Is Extend ?"
                                onChange={(e) => setIsExtend(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                required={false}
                                placeholder={""}
                                type={"date"}
                                textColor={"black"}
                                label={"Project Start"}
                                value={projectStart}
                                onChange={(e) => setProjectStart(e.target.value)}
                            />
                        </div>
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
                            onClick={() => update()}
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

export default EditProjectModal;
