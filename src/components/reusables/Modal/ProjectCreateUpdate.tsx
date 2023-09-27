import { useEffect, useState } from "react";
import { InputSingleField } from "../Field/InputField";
import { TextAreaField } from "../Field/TextAreaField";
import { HttpGet, HttpPost, HttpPut } from "../../../config/api";
import { toast } from "react-toastify";
import Select from "react-select";
import TextButton from "../Button/TextButton";
import { DropdownField } from "../Field/DropdownField";
import moment from "moment";

function ProjectCreateUpdateModal({ open, onClick, id }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [projectStart, setProjectStart] = useState("");
    const [projectClose, setProjectClose] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [account, setAccount] = useState(null);
    const [vocationClass, setVocationClass] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [classes, setClasses] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [sponsors, setSponsors] = useState([]);

    async function submit() {
        try {
            setLoading(true);
            if (!id) {
                await HttpPost(`internal/projects/create`, {
                    accountId: accounts,
                    classId: vocationClass?.value,
                    sponsorId: sponsor,
                    startDate: projectStart ? moment(projectStart).valueOf() / 1000 : null,
                    closeDate: projectClose ? moment(projectClose).valueOf() / 1000 : null,
                    title: name,
                    description: description,
                }, null);

                reset();
                toast("Success create a new project");
            } else {

                reset();
                toast("Success update class");
            }

            setLoading(false);
            onClick();
        } catch (error) {
            setLoading(false);
            toast(error?.message);
        }
    }

    async function fetchSponsor({ id }) {
        try {
            const res = await HttpGet(`sponsors/class/${id}`, null);

            setSponsors(res.map((data) => {
                return {
                    label: data.name,
                    value: data.id
                }
            }));
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchClass() {
        try {
            let res = await HttpPost(`classes/`, {
                limit: null,
                start: null,
                name: "",
                method: 'all-no-limit',
                vocationId: ""
            }, null);

            const result = res.rows.map((data) => {
                return {
                    label: data.name,
                    value: data.id
                }
            });

            setClasses(result);
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

            setAccountList(res.rows.map(data => {
                return {
                    value: data.account.id,
                    label: data.account.information.name.toUpperCase()
                }
            }));
        } catch (error) {
            toast(error?.message);
        }
    }

    function reset() {
        setName("");
        setDescription("");
        setProjectStart("");
        setProjectClose("");
        setSponsor("");
        setAccount(null);
        setVocationClass(null);
        setAccounts([]);
    }

    function handleSelectVocationClass(data) {
        setVocationClass(data);
        fetchSponsor({
            id: data.value
        });
    }

    function handleSelectAccountClass(data) {
        setAccount(data);
    }

    function handleSelectSponsorClass(data) {
        setSponsor(data);
    }

    useEffect(() => {
        if (open) {
            if (!id) reset();
            fetchAccount();
            fetchClass();
        }
    }, [open]);

    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        >
            <div className="relative mx-auto p-5 border w-[90%] shadow-lg max-w-[550px] overflow-auto rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
                        Upload Project
                    </h3>
                    <div className="mt-2 px-4 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Please upload project information below:
                        </p>
                    </div>
                    <div className="mt-4 text-black">
                        <div className="mb-2">
                            <p className="font-bold text-lg">Project Detail</p>
                        </div>
                        <div className="mb-3">
                            <div className="mb-3">
                                <p
                                    className={`block tracking-wide text-black text-sm font-bold mb-2`}
                                >
                                    Class
                                </p>
                                <Select
                                    options={classes}
                                    placeholder="Select Class"
                                    value={vocationClass}
                                    onChange={handleSelectVocationClass}
                                    isSearchable={true}
                                    isMulti={false}
                                    className="outline-none"
                                />
                            </div>
                            <div>
                                <p
                                    className={`block tracking-wide text-black text-sm font-bold mb-2`}
                                >
                                    Sponsorship
                                </p>
                                <Select
                                    options={sponsors}
                                    placeholder="Select User"
                                    value={sponsor}
                                    onChange={handleSelectSponsorClass}
                                    isSearchable={true}
                                    isMulti={false}
                                    className="outline-none"
                                />
                            </div>
                            <div className="mb-3">
                                <InputSingleField
                                    required={false}
                                    placeholder={"Fullstack Immersive"}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Title"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <TextAreaField
                                    label={"Description"}
                                    value={description}
                                    textColor={"black"}
                                    onChange={(e) => setDescription(e.target.value)}
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
                            <div className="mb-3">
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"date"}
                                    textColor={"black"}
                                    label={"Project Close"}
                                    value={projectClose}
                                    onChange={(e) => setProjectClose(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-10 mb-2">
                            <p className="font-bold text-lg">Project Participant</p>
                        </div>
                        <div>
                            <div className="mb-4 flex items-center gap-5">
                                <div className="mb-3 w-full">
                                    <div className="mb-3">
                                        <p
                                            className={`block tracking-wide text-black text-sm font-bold mb-2`}
                                        >
                                            Account
                                        </p>
                                        <Select
                                            options={accountList}
                                            placeholder="Select User"
                                            value={account}
                                            onChange={handleSelectAccountClass}
                                            isSearchable={true}
                                            isMulti={false}
                                            className="outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <TextButton
                                        onClick={() => {
                                            let req = accounts;

                                            req.push(account);

                                            setAccounts(req);
                                            setAccount(null);
                                        }}
                                        title="Add"
                                        disable={false}
                                    />
                                </div>
                            </div>
                            <table>
                                <thead className="table-auto">
                                    <tr className="text-white">
                                        <td className="px-2 border bg-slate-600">No</td>
                                        <td className="px-2 border bg-slate-600 text-center min-w-[410px]">Name</td>
                                        <td className="px-2 border bg-slate-600">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        accounts.map((data, i) => {
                                            return (
                                                <tr>
                                                    <td className="px-2 border">{i + 1}.</td>
                                                    <td className="px-2 border">{data.label}</td>
                                                    <td className="px-2 border text-center">
                                                        <span onClick={() => {
                                                            accounts.splice(i, 1);
                                                            setAccounts([...accounts]);
                                                        }}>X</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        className="items-center mt-10 pt-3 text-center"
                        onClick={() => submit()}
                    >
                        <div
                            id="ok-btn"
                            className={`cursor-pointer px-4 py-2 bg-[#07638d] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#07638d] focus:outline-none focus:ring-2 focus:ring-[#07638d]`}
                        >
                            <p>
                                {
                                    loading ? "Loading..." : 'Submit'
                                }
                            </p>
                        </div>
                    </div>
                    <div
                        className="items-center py-3 text-center"
                        onClick={onClick}
                    >
                        <div
                            className={`cursor-pointer px-4 py-2 bg-[transparent] text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-[transparent] focus:outline-none focus:ring-2 focus:ring-[transparent]`}
                        >
                            <p>
                                Close
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCreateUpdateModal;
