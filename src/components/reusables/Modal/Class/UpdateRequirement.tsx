import { useEffect, useState } from "react";
import { HttpDelete, HttpGet, HttpPost } from "../../../../config/api";
import { toast } from "react-toastify";
import TextButton from "../../Button/TextButton";
import { InputSingleField } from "../../Field/InputField";

function RequirementUpdateModal({ open, onClick, id }) {
    const [selected, setSelected] = useState("");
    const [data, setData] = useState([]);

    async function submit() {
        try {
            await HttpPost(`internal/requirements/${id}`, {
                name: selected
            }, null)

            await fetchDetail();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function remove({
        id
    }) {
        try {
            await HttpDelete(`internal/requirements/${id}`, null);

            fetchDetail();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchDetail() {
        try {
            const res = await HttpGet(`internal/requirements/${id}`, null);

            setData(res);
            setSelected("");
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        if (open) {
            fetchDetail();
        }
    }, [open]);

    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        >
            <div className="relative mx-auto p-5 border w-[90%] max-w-[550px] shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
                        Upload Class Requirement
                    </h3>
                    <div className="mt-2 px-4 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Please upload Class Requirment information below:
                        </p>
                    </div>
                    <div className="mt-4 text-black">
                        <div className="mb-3 flex items-end gap-5">
                            <div className="w-full">
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Title"}
                                    value={selected}
                                    onChange={(e) => setSelected(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextButton
                                    onClick={() => submit()}
                                    title="Add"
                                    disable={false}
                                />
                            </div>
                        </div>
                        <p className="pt-17 mb-3 font-semibold">List Requirement</p>
                        <table>
                            <thead className="table-auto">
                                <tr className="text-white">
                                    <td className="px-2 border bg-slate-600">No</td>
                                    <td className="px-2 border bg-slate-600 text-center min-w-[410px]">Title</td>
                                    <td className="px-2 border bg-slate-600">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((data, i) => {
                                        return (
                                            <tr key={data.id}>
                                                <td className="px-2 border">{i + 1}.</td>
                                                <td className="px-2 border">{data.name}</td>
                                                <td className="px-2 border text-center">
                                                    <span onClick={() => {
                                                        remove({
                                                            id: data.id
                                                        })
                                                    }}>X</span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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

export default RequirementUpdateModal;
