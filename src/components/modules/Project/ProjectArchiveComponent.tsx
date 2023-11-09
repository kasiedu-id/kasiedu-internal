import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getProjectsArchive } from "../../../config/api/services/projects";
import { useQuery } from "../../../utils/query";
import TextButton from "../../reusables/Button/TextButton";
import { InputSingleField } from "../../reusables/Field/InputField";
import truncate from "../../../utils/function";
import { thousandSeparator } from "../../../utils/ThousandSeparator";
import RecoveryProjectModal from "../../reusables/Modal/Project/RecoveryProject";

function ProjectArchiveComponent() {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();
    const query: any = useQuery();

    const [modalRecoverytOpen, setModalRecoveryOpen] = useState(false);
    const [modalProjectId, setModalProjectId] = useState("");
    const [modalProjectName, setModalProjectName] = useState("");

    // Function
    async function fetchProject() {
        try {
            let res = await getProjectsArchive({
                page: Number(query?.get('page') || 1),
                limit: Number(query?.get('limit') || 10),
                name: query?.get('name') || '',
                code: query?.get('code') || '',
                classId: '',
            });

            const result = res.rows.map((data) => {
                let gatheredMoney = 0;

                for (let payment of data.payments) {
                    if (payment.status === 'paid')
                        gatheredMoney += Number(payment.amount)
                }

                return {
                    ...data,
                    gatheredMoney
                }
            });

            setProjects(result);
            setTotalCount(res.count);
            setPage(query?.get('page') || 1);
            setLimit(query?.get('limit') || 10)
            setName(query?.get('name') || '')
            setCode(query?.get('code') || '')
        } catch (error) {
            toast(error.message);
        }
    }

    useEffect(() => {
        fetchProject();
    }, [query]);

    return (
        <div>
            <RecoveryProjectModal
                open={modalRecoverytOpen}
                onAccept={() => {
                    toast(`Success recover project ${modalProjectName}`)
                    setModalRecoveryOpen(false);
                    setModalProjectId("");
                    setModalProjectName("");
                    navigate(`/projects?page=1&limit=${query?.get('limit') || 20}`);
                }}
                onCancel={() => {
                    setModalRecoveryOpen(false);
                    setModalProjectId("");
                    setModalProjectName("");
                }}
                id={modalProjectId}
                projectName={modalProjectName}
            />
            <div className="p-4">
                <div className="flex justify-between items-center gap-10 mb-4">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Project Name"} />
                        <InputSingleField required={false} value={code} onChange={(e) => setCode(e.target.value)} placeholder={"Project Code"} />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <TextButton
                            title="Search"
                            onClick={() => navigate(`/projects/archive?page=1&limit=${query?.get('limit') || 20}&name=${name}&code=${code}`)}
                            disable={false}
                        />
                        <TextButton
                            title="Reset"
                            onClick={() => navigate(`/projects/archive?page=1&limit=${limit}&name=&code=`)}
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
                                            <p className="text-xl font-bold min-w-[350px] max-w-[350px] wrap text-white">{data.title} / <span className="font-normal">{data?.projectCode}</span></p>
                                            <div className="border h-full rounded-full px-3 py-1 text-center">
                                                <p className="text-sm capitalize text-white">{data.isActive ? "On going" : "Non Active"}</p>
                                            </div>
                                        </div>
                                        <p className="text-white text-sm">{truncate(data.description, 150)}</p>
                                        <div className="grid grid-cols-2 gap-4 my-5">
                                            <div className="my-5">
                                                <p className="font-bold text-white">Sponsor</p>
                                                <p className="text-white">{data?.sponsor?.name || '-'}</p>
                                            </div>
                                            <div className="my-5">
                                                <p className="font-bold text-white">Capacity</p>
                                                <p className="text-white">{data?.sponsor?.maxCapacity || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="font-bold text-white">Project Start</p>
                                                <p className="text-white">{data.startDate ? moment.unix(data.startDate).format("DD MMMM YYYY") : '-'}</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">Project End</p>
                                                <p className="text-white">{data.closeDate ? moment.unix(data.closeDate).format("DD MMMM YYYY") : '-'}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-white">Pengumpulan Dana</p>
                                                <p className="text-white">Rp. {thousandSeparator(String(data.gatheredMoney))} / Rp. {thousandSeparator(String(data.totalAmount))}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 h-full">
                                        <button
                                            onClick={null}
                                            className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
                                        >
                                            <span>View Detail</span>
                                        </button>
                                        
                                        <button
                                            onClick={() => {
                                                setModalProjectId(data.id);
                                                setModalRecoveryOpen(true);
                                                setModalProjectName(data?.title)
                                            }}
                                            className="text-white bg-green-400 font-bold px-4 rounded h-[46px] inline-flex items-center"
                                        >
                                            <span>Recovery</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-rows justify-between px-4 mt-5">
                {
                    page > 1 ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/projects/archive?page=${(Number(query?.get('page') || 2) - 1) || 1}&limit=${query?.get('limit') || 20}&name=${name}&code=${code}`)}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page} of {Math.ceil(totalCount / limit)}</p> : <div></div>
                }
                {
                    page < totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/projects/archive?page=${(Number(query?.get('page') || 1) + 1) || 1}&limit=${query?.get('limit') || 20}&name=${name}&code=${code}`)}>Next</p> : <div></div>
                }
            </div>
        </div>
    );
}

export default ProjectArchiveComponent;
