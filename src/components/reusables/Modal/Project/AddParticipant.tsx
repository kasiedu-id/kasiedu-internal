import { useEffect, useState } from "react";
import { HttpDelete, HttpGet, HttpPost } from "../../../../config/api";
import { toast } from "react-toastify";
import TextButton from "../../Button/TextButton";
import Select from "react-select";

function AddParticipantModal({ open, onClick, id }) {
    const [participant, setParticipant] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [data, setData] = useState([]);

    async function submit() {
        try {
            await HttpPost(`internal/projects/add-participant/${id}`, {
                accountId: participant.value,
            }, null);

            await fetchParticipant();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function remove({
        accountClassId
    }) {
        try {
            await HttpDelete(`internal/projects/remove-participant/${accountClassId}`, null);

            toast('Success remove participant');

            fetchParticipant();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchAccount() {
        try {
            let res = await HttpPost(`internal/users?rt=user&limit=20`, {
                name: "",
                email: "",
                phone: "",
                all: true
            }, null);

            setData(res.rows.map(data => {
                return {
                    value: data.account.id,
                    label: data.account.information.name.toUpperCase()
                }
            }));
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchParticipant() {
        try {
            const res = await HttpGet(`internal/projects/participants/${id}`, null);

            console.log(res);

            setParticipants(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    function handleSelectAccountClass(data) {
        setParticipant(data);
    }

    useEffect(() => {
        if (open) {
            setParticipant(null);
            fetchParticipant();
            fetchAccount();
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
                        Upload Project Participant
                    </h3>
                    <div className="mt-2 px-4 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Please upload Project Participant information below:
                        </p>
                    </div>
                    <div className="my-4 text-black">
                        <div className="mb-3 flex items-center gap-5">
                            <div className="w-full">
                            <div className="mb-3">
                                        <p
                                            className={`block tracking-wide text-black text-sm font-bold mb-2`}
                                        >
                                            Account
                                        </p>
                                        <Select
                                            options={data}
                                            placeholder="Select User"
                                            value={participant}
                                            onChange={handleSelectAccountClass}
                                            isSearchable={true}
                                            isMulti={false}
                                            className="outline-none"
                                        />
                                    </div>
                            </div>
                            <div className="mt-5">
                                <TextButton
                                    onClick={() => submit()}
                                    title="Add"
                                    disable={false}
                                />
                            </div>
                        </div>
                        <p className="pt-17 mb-3 font-semibold">List Student</p>
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
                                    participants.length > 0 && participants?.map((data, i) => {
                                        return (
                                            <tr key={data.id}>
                                                <td className="px-2 border">{i + 1}.</td>
                                                <td className="px-2 border">
                                                    <div>
                                                        <p className="mb-2 font-semibold">{data?.account?.information?.name}</p>
                                                        <p className="mb-1">{data?.account?.email} {data?.account?.phone && data?.account?.email ? '/' : ""} {data?.account?.phone}</p>
                                                        <p className="captilize">Gender: {data?.account?.information?.gender ? data?.account?.information?.gender : 'N/A'}</p>
                                                    </div>
                                                </td>
                                                <td className="px-2 border text-center">
                                                    <span onClick={() => {
                                                        remove({
                                                            accountClassId: data.id
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

export default AddParticipantModal;
