import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPost } from "../../../../config/api";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";
import TextButton from "../../../../components/reusables/Button/TextButton";
import { useParams } from "react-router-dom";
import Select from "react-select";
import ProjectCreateUpdateModal from "../../../../components/reusables/Modal/ProjectCreateUpdate";
import moment from "moment";
import DeleteProjectModal from "../../../../components/reusables/Modal/Project/DeleteProject";
import AddParticipantModal from "../../../../components/reusables/Modal/Project/AddParticipant";
import ExtendProjectModal from "../../../../components/reusables/Modal/Project/ExtendProject";
import ActivationProjectModal from "../../../../components/reusables/Modal/Project/ActivateOrDeactivate";
import EditProjectModal from "../../../../components/reusables/Modal/Project/EditProject";

function ProjectList() {
    const [classes, setClasses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [classId, setClassId] = useState(null);
    const [page, setPage] = useState(0);
    const limit = 10;
    const [totalCount, setTotalCount] = useState(0);
    const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
    const [modalAddParticipantOpen, setModalAddParticipantOpen] = useState(false);
    const [modalExtendOpen, setModalExtendOpen] = useState(false);
    const [modalActivationOpen, setModalActivationOpen] = useState(false);
    const [modalEditeOpen, setModalEditeOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalProjectId, setModalProjectId] = useState("");
    const [modalProjectName, setModalProjectName] = useState("");
    const param = useParams();

    // Function
    async function getClasses() {
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
            toast(error.message);
        }
    }

    function handleSelectClassId(data) {
        setClassId(data);
    }

    async function getProjects({
        page
    }) {
        try {
            let res = await HttpPost(`internal/projects/get?page=${page + 1}&limit=${limit}`, {
                name,
                title,
                classId,
                accountId: ""
            }, null);
            
            const result = res.rows.map((data) => {
                let gatheredMoney = 0;

                for (let payment of data.payments) {
                    if(payment.status === 'paid')
                    gatheredMoney += Number(payment.amount)
                }

                return {
                    ...data,
                    gatheredMoney
                }
            });

            setProjects(result);
            setTotalCount(res.count);
            setPage(page)
        } catch (error) {
            toast(error.message);
        }
    }

    useEffect(() => {
        getClasses();
        getProjects({
            page: 0
        })
    }, []);

    return (
        <div>
            <ProjectCreateUpdateModal
                open={modalCreateUpdateOpen}
                onClick={() => {
                    getProjects({ page: 0 });
                    setModalCreateUpdateOpen(false)
                }}
                id={null}
            />
            <AddParticipantModal
                open={modalAddParticipantOpen}
                id={modalProjectId}
                onClick={() => {
                    setModalProjectId("");
                    setModalAddParticipantOpen(false);
                    getProjects({ page: page });
                }}
            />
            <ExtendProjectModal
                projectId={modalProjectId}
                projectName={modalProjectName}
                onCancel={() => {
                    setModalProjectId("");
                    setModalProjectName("");
                    setModalExtendOpen(false);
                }}
                onAccept={() => {
                    setModalProjectId("");
                    setModalProjectName("");
                    setModalExtendOpen(false);
                    getProjects({ page: page });
                }}
                open={modalExtendOpen}
            />
            <ActivationProjectModal
                open={modalActivationOpen}
                onCancel={() => {
                    setModalProjectId("");
                    setModalProjectName("");
                    setModalActivationOpen(false);
                }}
                onAccept={() => {
                    setModalProjectId("");
                    setModalProjectName("");
                    setModalActivationOpen(false);
                    getProjects({ page: page });
                }}
                id={modalProjectId}
                projectName={modalProjectName}
            />
            <EditProjectModal
                open={modalEditeOpen}
                onAccept={() => {
                    getProjects({ page: 0 });
                    setModalEditeOpen(false);
                    setModalProjectId("");
                    setModalProjectName("");
                }}
                onCancel={() => {
                    setModalEditeOpen(false);
                    setModalProjectId("");
                    setModalProjectName("");
                }}
                projectId={modalProjectId}
                projectName={modalProjectName}
            />
            <DeleteProjectModal
                open={modalDeleteOpen}
                onAccept={() => {
                    getProjects({ page: 0 });
                    setModalDeleteOpen(false);
                    setModalProjectId("");
                    setModalProjectName("");
                }}
                onCancel={() => {
                    setModalDeleteOpen(false);
                    setModalProjectId("");
                    setModalProjectName("");
                }}
                id={modalProjectId}
                projectName={modalProjectName}
            />
            {/* <BackLayout navigation={"/vocations"} /> */}
            <div className="p-4">
                <div className="flex gap-5 ml-auto justify-end">
                    {/* <div className="w-[100px]">
                        <TextButton title="Import" onClick={() => setOpenCsvUpload(true)} disable={false} />
                    </div> */}
                    <div className="w-[100px]">
                        <TextButton
                            title="Add"
                            disable={false}
                            onClick={() => {
                                setClassId("")
                                setModalCreateUpdateOpen(true)
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-10 mb-4">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <InputSingleField required={false} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"Project Title"} />
                        <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Account Name"} />
                        <div className="pt-2">
                            <Select
                                options={classes}
                                placeholder="Select Class"
                                value={classId}
                                onChange={handleSelectClassId}
                                isSearchable={true}
                                isMulti={false}
                                className="outline-none"
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <TextButton
                            title="Search"
                            onClick={() => getProjects({
                                page: 0
                            })}
                            disable={false}
                        />
                    </div>
                </div>
                <div className="flex flex-col overflow-auto max-h-[65vh] gap-5">
                    {
                        projects.map((data) => {
                            return (
                                <div className="grid grid-cols-2 gap-5 rounded bg-[#07638d] text-white py-3 px-5 mb-5">
                                    <div>
                                        <div className="flex gap-5 mb-3">
                                            <p className="text-2xl font-bold">{data.title}</p>
                                            <div className="border rounded-full px-3 py-1 text-center">
                                                <p className="text-sm capitalize">{data.isActive ? "On going" : "Non Active"}</p>
                                            </div>
                                        </div>
                                        <p>{data.description}</p>
                                        <div className="grid grid-cols-2 gap-4 my-5">
                                            <div className="my-5">
                                                <p className="font-bold">Sponsor</p>
                                                <p>{data?.sponsor?.name || '-'}</p>
                                            </div>
                                            <div className="my-5">
                                                <p className="font-bold">Capacity</p>
                                                <p>{data?.sponsor?.maxCapacity || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="font-bold">Project Start</p>
                                                <p>{moment.unix(data.startDate).format("DD MMMM YYYY")}</p>
                                            </div>
                                            <div>
                                                <p className="font-bold">Project End</p>
                                                <p>{moment.unix(data.closeDate).format("DD MMMM YYYY")}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold">Pengumpulan Dana</p>
                                                <p>Rp. {data.gatheredMoney} / Rp.{data.totalAmount}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 h-full">
                                        <button
                                            onClick={() => {
                                                setModalAddParticipantOpen(true);
                                                setModalProjectId(data.id)
                                            }}
                                            className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
                                        >
                                            <span>Lihat Peserta</span>
                                        </button>
                                        <button
                                            onClick={null}
                                            className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
                                        >
                                            <span>View Detail</span>
                                        </button>
                                        {data.payments > 0 ? null : (
                                            <button
                                                onClick={() => {
                                                    setModalDeleteOpen(true);
                                                    setModalProjectId(data.id);
                                                    setModalProjectName(data.title)
                                                }}
                                                className="text-white bg-red-500 font-bold px-4 rounded h-[46px] inline-flex items-center"
                                            >
                                                <span>Hapus</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                setModalProjectId(data.id);
                                                setModalProjectName(data.title)
                                                setModalEditeOpen(true);
                                            }}
                                            className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
                                        >
                                            <span>Edit Class</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setModalProjectId(data.id);
                                                setModalProjectName(data.title)
                                                setModalExtendOpen(true);
                                            }}
                                            className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
                                        >
                                            <span>Extend Project</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setModalProjectId(data.id);
                                                setModalProjectName(data.title)
                                                setModalActivationOpen(true);
                                            }}
                                            className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
                                        >
                                            <span>Activation</span>
                                        </button>
                                        <div className="h-[46px]"></div>
                                        <div className="h-[46px]"></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-rows justify-between px-4 mt-5">
                {
                    page > 0 ? <p className="cursor-pointer font-semibold" onClick={() => getProjects({
                        page: page - 1,
                    })}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page + 1} of {Math.ceil(totalCount / limit)}</p> : <div></div>
                }
                {
                    page + 1 <= totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => getProjects({
                        page: page + 1,
                    })}>Next</p> : <div></div>
                }
            </div>
        </div>
    );
}

export default ProjectList;
