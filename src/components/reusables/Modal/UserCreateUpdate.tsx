import { useEffect, useState } from "react";
import { InputSingleField } from "../Field/InputField";
import { HttpGet, HttpPost, HttpPut } from "../../../config/api";
import { toast } from "react-toastify";
import { DropdownField } from "../Field/DropdownField";
import Select from "react-select";
import LoadingModal from "../Loading/Loading";

function UserCreateUpdateModal({ open, onClick, id, section }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [vocation, setVocation] = useState(null);
    const [interest, setInterest] = useState(null);
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const [interests, setInterests] = useState([]);
    const [vocations, setVocations] = useState([]);

    async function submit() {
        try {
            setLoading(true);

            if (section !== "update") {
                if (role === 'vocation') {
                    if (!vocation) throw ({
                        message: 'Vocation need to be choosen'
                    });
                }

                await HttpPost(`internal/users/create`, {
                    name,
                    email,
                    phone,
                    interest: interest?.map((data) => data.label.toLowerCase().replace(/ /g, '-'))?.toString() ?? null,
                    gender,
                    vocationId: vocation ? vocation?.value : null,
                    roleType: role,
                }, null);
                toast("Success create a new user");
            } else {
                await HttpPut(
                    `internal/users/update/${id}`,
                    {
                        name,
                        email,
                        phone,
                        interest: interest?.map((data) => data.label.toLowerCase().replace(/ /g, '-'))?.toString() ?? null,
                        gender,
                    },
                    null
                );
                toast("Success update a user");
            }

            setLoading(false);
            onClick();
        } catch (error) {
            setLoading(false);
            toast(error?.message);
        }
    }

    async function fetchDetail() {
        try {
            let res = await HttpGet(`internal/users/${id}`, null);

            const interestUser = res?.information?.interest?.toUpperCase().replace(/-/g, ' ').split(',');

            let interest = [];

            if (interestUser)
                for (let data of interests) {
                    if (interestUser.length > 0 && interestUser.includes(data.label)) {
                        interest.push(data);
                    }
                }

            setEmail(res?.email);
            setPhone(res?.phone);
            setName(res?.information?.name);
            setInterest(interest);
            setGender(res?.information?.gender);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchVocation() {
        try {
            let res = await HttpPost(`vocations/`, {
                limit: 20,
                start: 0,
                method: 'all',
                name: '',
            }, null);

            setVocations(res.map(data => {
                return {
                    value: data.id,
                    label: data.name.toUpperCase()
                }
            }));
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchInterest() {
        try {
            let res = await HttpPost(`categories/`, {
                limit: 20,
                start: 0,
                method: 'all',
                name: '',
            }, null);

            setInterests(res.map(data => {
                return {
                    value: data.id,
                    label: data.name.toUpperCase()
                }
            }));
        } catch (error) {
            toast(error?.message);
        }
    }

    function handleSelect(data) {
        setInterest(data);
    }

    function handleSelectVocation(data) {
        setVocation(data);
    }

    function reset() {
        setInterest(null);
        setName("");
        setEmail("");
        setPhone("");
        setGender("");
        setRole("");
        setVocation(null);
    }

    useEffect(() => {
        fetchInterest();
        fetchVocation()

        if (section === "create") reset();
        else if (id) fetchDetail();
    }, [open]);

    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        >
            <div className="relative mx-auto p-5 border w-[90%] max-w-[550px] shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
                        Upload User
                    </h3>
                    <div className="mt-2 px-4 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Please Upload User information below:
                        </p>
                    </div>
                    <div className="mt-4 text-black">
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
                            <InputSingleField
                                required={false}
                                placeholder={"john@doe.com"}
                                type={"text"}
                                textColor={"black"}
                                label={"Email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <InputSingleField
                                required={false}
                                placeholder={"081234567"}
                                type={"text"}
                                textColor={"black"}
                                label={"Phone"}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
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
                        </div>
                        {
                            id ? null : <div className="mb-3">
                                <p
                                    className={`block tracking-wide text-black text-sm font-bold mb-2`}
                                >
                                    Vocation
                                </p>
                                <Select
                                    options={vocations}
                                    placeholder="Select Vocation or Skipped it"
                                    value={vocation}
                                    onChange={handleSelectVocation}
                                    isSearchable={true}
                                    className="outline-none"
                                />
                            </div>
                        }
                        <div className="mb-3">
                            <p
                                className={`block tracking-wide text-black text-sm font-bold mb-2`}
                            >
                                Interest
                            </p>
                            <Select
                                options={interests}
                                placeholder="Select Interest"
                                value={interest}
                                onChange={handleSelect}
                                isSearchable={true}
                                isMulti
                                className="outline-none"
                            />
                        </div>
                        {
                            id ? null : <div className="mb-3">
                                <DropdownField
                                    colorLabel={"black"}
                                    label={"Role"}
                                    collectionList={[{
                                        name: "Internal",
                                        value: "internal",
                                    }, {
                                        name: "Vocation",
                                        value: "vocation",
                                    }, {
                                        name: "User",
                                        value: "user",
                                    },]}
                                    keyField={"name"}
                                    valueField={"value"}
                                    labelField={"name"}
                                    value={role}
                                    placeholder="Role"
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                        }
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

            <LoadingModal open={loading} />
        </div>
    );
}

export default UserCreateUpdateModal;
