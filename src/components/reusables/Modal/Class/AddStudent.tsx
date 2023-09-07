import { useEffect, useState } from "react";
import { HttpDelete, HttpGet, HttpPost } from "../../../../config/api";
import { toast } from "react-toastify";
import TextButton from "../../Button/TextButton";
import { InputSingleField } from "../../Field/InputField";
import { DropdownField } from "../../Field/DropdownField";

function AddStudentModal({ open, onClick, id }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [gender, setGender] = useState("");
    const [sponsors, setSponsors] = useState([]);
    const [data, setData] = useState([]);

    async function submit() {
        try {
            await HttpPost(`internal/classes/assign-user/${id}`, {
                name: name,
                email,
                phone,
                sponsor,
                gender,
            }, null);

            await fetchDetail();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function remove({
        id
    }) {
        try {
            await HttpDelete(`internal/classes/remove-user/${id}`, null);

            fetchDetail();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchDetail() {
        try {
            const res = await HttpPost(`internal/classes/assigned-user/${id}?limit=50&page=0`, {
                name: "",
            }, null);

            setData(res.rows);
            setName("");
            setEmail("");
            setGender("");
            setPhone("");
            setSponsor("");
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchSponsor() {
        try {
            const res = await HttpGet(`sponsors/class/${id}`, null);

            setSponsors(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        if (open) {
            fetchSponsor();
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
                        Upload Class Student
                    </h3>
                    <div className="mt-2 px-4 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Please upload Class Student information below:
                        </p>
                    </div>
                    <div className="my-4 text-black">
                        <div className="mb-3 flex items-end gap-5">
                            <div className="w-full">
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Name"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Phone"}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <DropdownField
                                    colorLabel={"black"}
                                    label={"Gender"}
                                    collectionList={[{
                                        name: "Male",
                                        value: "male",
                                    }, {
                                        name: "Female",
                                        value: "female",
                                    }]}
                                    keyField={"name"}
                                    valueField={"value"}
                                    labelField={"name"}
                                    value={gender}
                                    placeholder="Gender"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <DropdownField
                                    colorLabel={"black"}
                                    label={"Sponsorship"}
                                    collectionList={sponsors}
                                    keyField={"id"}
                                    valueField={"id"}
                                    labelField={"name"}
                                    value={sponsor}
                                    placeholder="Sponsorship"
                                    onChange={(e) => setSponsor(e.target.value)}
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
                                    data.length > 0 && data?.map((data, i) => {
                                        return (
                                            <tr key={data.id}>
                                                <td className="px-2 border">{i + 1}.</td>
                                                <td className="px-2 border">
                                                    <div>
                                                        <p className="mb-3 font-semibold">{data?.account?.information?.name}</p>
                                                        <p className="mb-1">{data?.account?.email} / {data?.account?.phone}</p>
                                                        <p>Sponsor: {data?.sponsor ? data.sponsor.name : 'N/A'}</p>
                                                    </div>
                                                </td>
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

export default AddStudentModal;
