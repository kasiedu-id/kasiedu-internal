import { useEffect, useState } from "react";
import { TextAreaField } from "../../Field/TextAreaField";
import { HttpPost } from "../../../../config/api";
import { toast } from "react-toastify";
import Select from "react-select";
import TextButton from "../../Button/TextButton";
import moment from "moment";
import SidebarModal from "../SidebarModal";
import { IconField } from "../../Field/IconField";
import GeneralButton from "../../Button/GeneralButton";
import { getClasses } from "../../../../config/api/services/classes";
import { getSponsors } from "../../../../config/api/services/sponsor";
import { createProject, getProjectDetail, updateProject } from "../../../../config/api/services/projects";

function ProjectCreateUpdateModal({ open, onClose, onAccept, id }) {
    const [name, setName] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [description, setDescription] = useState("");
    const [projectStart, setProjectStart] = useState("");
    const [projectClose, setProjectClose] = useState("");
    const [sponsor, setSponsor] = useState(null);
    const [account, setAccount] = useState(null);
    const [vocationClass, setVocationClass] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [classes, setClasses] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [sponsors, setSponsors] = useState([]);

    async function submit() {
        try {
            setLoading(true);

            if (!id) {
                await createProject({
                    accountId: accounts,
                    classId: vocationClass?.value,
                    sponsorId: sponsor?.value || null,
                    startDate: projectStart ? moment(projectStart).valueOf() / 1000 : null,
                    closeDate: projectClose ? moment(projectClose).valueOf() / 1000 : null,
                    title: name,
                    synopsis,
                    description: description,
                });

                toast("Success create a new project");
            } else {
                await updateProject({
                    id,
                    classId: vocationClass?.value,
                    sponsorId: sponsor?.value || null,
                    startDate: projectStart ? moment(projectStart).valueOf() / 1000 : null,
                    closeDate: projectClose ? moment(projectClose).valueOf() / 1000 : null,
                    title: name,
                    synopsis,
                    description: description,
                });

                toast("Success update class");
            }

            onAccept();
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchSponsor() {
        try {
            const res = await getSponsors({
                page: 1,
                limit: 100,
                name: '',
                classId: '',
                brandId: '',
            });

            const data = res.rows.map(data => {
                return {
                    value: data.id,
                    label: data.name.toUpperCase()
                }
            });

            data.unshift({
                value: '',
                label: 'Select sponsor'
            })

            setSponsors(data);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchDetail() {
        try {
            const res = await getProjectDetail({
                projectId: id
            });

            setName(res.title);
            setDescription(res.description);
            setSynopsis(res.synopsis);
            setProjectStart(res.startDate ? moment.unix(res.startDate).format('YYYY-MM-DD') : '');
            setProjectClose(res.closeDate ? moment.unix(res.closeDate).format('YYYY-MM-DD') : '');
            setVocationClass({
                value: res.class.id,
                label: res.class.name
            });
            if(res.sponsorId) {
                setSponsor({
                    value: res.sponsor.id,
                    label: res.sponsor.name
                });
            }
        } catch (error) {
            toast(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function fetchClass() {
        try {
            let res = await getClasses({
                page: 1,
                limit: 100,
                vocationId: '',
                name: '',
                code: '',
                categories: '',
                province: '',
                city: '',
                date: Math.ceil(moment().valueOf() / 1000).toString(),
            });

            setClasses(res.rows.map((data) => {
                return {
                    label: data.name,
                    value: data.id
                }
            }));
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
                    label: data.account.information?.name.toUpperCase()
                }
            }));
        } catch (error) {
            toast(error?.message);
        }
    }

    function reset() {
        setName("");
        setSynopsis("");
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
    }

    function handleSelectAccountClass(data) {
        setAccount(data);
    }

    function handleSelectSponsorClass(data) {
        setSponsor(data);
    }

    useEffect(() => {
        if (!id) {
            reset();
            fetchAccount();
        } else {
            fetchDetail();
        }
        fetchClass();
        fetchSponsor();
    }, [id]);

    return (
        <SidebarModal sidebarOpen={open} setSidebarOpen={onClose} label={id ? 'Update Project' : 'Create Project'}>
            <div className="mt-3">
                <div className="mb-4 text-black">
                    <div className="mb-3">
                        <div className="mb-3">
                            <p className={`block tracking-wide text-black text-sm font-bold mb-2`}>
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
                        <div className="mb-3">
                            <p className={`block tracking-wide text-black text-sm font-bold mb-2`}>
                                Sponsorship
                            </p>
                            <Select
                                options={sponsors}
                                placeholder="Select Sponsor"
                                value={sponsor}
                                onChange={handleSelectSponsorClass}
                                isSearchable={true}
                                isMulti={false}
                                className="outline-none"
                            />
                        </div>
                        <div className="mb-3">
                            <IconField
                                placeholder={"Fullstack Immersive"}
                                type={"text"}
                                labelColor={""}
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
                            <IconField
                                placeholder={""}
                                type={"date"}
                                labelColor={""}
                                label={"Project Start"}
                                value={projectStart}
                                onChange={(e) => setProjectStart(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <IconField
                                placeholder={""}
                                type={"date"}
                                labelColor={""}
                                label={"Project Close"}
                                value={projectClose}
                                onChange={(e) => setProjectClose(e.target.value)}
                            />
                        </div>
                    </div>
                    {
                        id ? null : <>
                            <div className="mt-10 mb-2">
                                <p className="font-bold text-lg">Project Participant</p>
                            </div>
                            <div>
                                <div className="mb-4 flex items-center gap-5">
                                    <div className="mb-3 w-full">
                                        <div className="mb-3">
                                            <p className={`block tracking-wide text-black text-sm font-bold mb-2`}>
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
                                    <div>
                                        <TextButton
                                            onClick={() => {
                                                if (account) {
                                                    let req = accounts;

                                                    req.push(account);

                                                    setAccounts(req);
                                                    setAccount(null);
                                                }
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
                        </>
                    }
                </div>
                <GeneralButton
                    onClick={() => submit()}
                    title={id ? "Update" : "Create"}
                    disable={loading}
                    bgColor="bg-green-500"
                    textColor="text-white"
                    icon={null}
                />
            </div>
        </SidebarModal>
    );
}

export default ProjectCreateUpdateModal;
