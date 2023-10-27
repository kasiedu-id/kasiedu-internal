import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/reusables/Field/InputField";
import TextButton from "../../../components/reusables/Button/TextButton";
import { useNavigate } from "react-router-dom";
import ClassCard from "../../../components/reusables/Card/ClassCard";
import ClassDetailModal from "../../reusables/Modal/Class/ClassDetail";
// import Select from "react-select";
import { getArchiveClasses } from "../../../config/api/services/classes";
import { useQuery } from "../../../utils/query";
import RecoveryClassModal from "../../reusables/Modal/Class/ClassRecovery";

function ClassArchiveComponent() {
    const [classes, setClasses] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    // const [vocation, setVocation] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();
    const query: any = useQuery();

    // Modal
    const [openDetail, setOpenDetail] = useState(false);
    const [openRecovery, setOpenRecovery] = useState(false);
    const [classId, setClassId] = useState("");
    const [className, setClassName] = useState("");

    // const [vocations, setVocations] = useState([]);
    // Function
    async function fetchClass() {
        try {
            let res = await getArchiveClasses({
                page: Number(query?.get('page') || 1),
                limit: Number(query?.get('limit') || 10),
                vocationId: query?.get('vocationId') || '',
                name: query?.get('name') || '',
                code: query?.get('code') || '',
                categories: '',
                province: '',
                city: ''
            });

            setClasses(res.rows);
            setTotalCount(res.count);
            setPage(query?.get('page') || 1);
            setLimit(query?.get('limit') || 10)
            setName(query?.get('name') || '')
            setCode(query?.get('code') || '')
            // setVocation(query?.get('vocationId') || '')
        } catch (error) {
            toast(error.message);
        }
    }

    // async function fetchVocation() {
    //     try {
    //         let res = await HttpPost(`vocations/`, {
    //             limit: 20,
    //             start: 0,
    //             method: 'all',
    //             name: '',
    //         }, null);

    //         setVocations(res.map(data => {
    //             return {
    //                 value: data.id,
    //                 label: data.name.toUpperCase()
    //             }
    //         }));
    //     } catch (error) {
    //         toast(error?.message);
    //     }
    // }

    // function handleSelectVocation(data) {
    //     setVocation(data);
    // }

    // useEffect(() => {
    //     fetchVocation();
    // }, []);

    useEffect(() => {
        fetchClass();
    }, [query])

    return (
        <div>
            <ClassDetailModal
                open={openDetail}
                onClick={() => setOpenDetail(false)}
                id={classId}
            />
            <RecoveryClassModal
                id={classId}
                open={openRecovery}
                name={className}
                onAccept={() => {
                    setOpenRecovery(false);
                    navigate(`/classes?page=1&limit=${query?.get('limit') || 20}`)
                }}
                onCancel={() => {
                    setOpenRecovery(false);
                }}
            />
            <div className="p-4">
            <div className="flex justify-between items-center gap-10 mb-4">
                    <div className="grid lg:grid-cols-3 gap-2 mb-4">
                        <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Class Name"} />
                        <InputSingleField required={false} value={code} onChange={(e) => setCode(e.target.value)} placeholder={"Class Code"} />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <TextButton
                            title="Search"
                            onClick={() => navigate(`/classes/archive?page=1&limit=${query?.get('limit') || 20}&name=${name}&code=${code}`)}
                            disable={false}
                        />
                        <TextButton
                            title="Reset"
                            onClick={() => navigate(`/classes/archive?page=1&limit=${query?.get('limit') || 20}&name=&code=`)}
                            disable={false}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5 overflow-auto max-h-[65vh]">
                    {
                        classes.map((data) => {
                            return (
                                <ClassCard
                                    key={data?.id}
                                    editMode={false}
                                    maxStudent={data.maxPerson}
                                    isPrivate={data.isPrivate}
                                    price={data.price}
                                    title={data.name}
                                    duration={`${data.duration} ${data.durationType}`}
                                    openRegis={data.openRegis}
                                    closeRegis={data.closeRegis}
                                    startClass={data.classStart}
                                    crowdfunding={0}
                                    totalStudent={data.accounts.length}
                                    categories={data.categories}
                                    classCode={data?.classCode}
                                    detailClick={() => {
                                        setClassId(data.id);
                                        setOpenDetail(true);
                                    }}
                                    recoveryClick={() => {
                                        setClassId(data.id);
                                        setOpenRecovery(true);
                                        setClassName(data?.name)
                                    }}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-rows justify-between px-4 mt-5">
                {
                    page > 1 ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/classes/archive?page=${(Number(query?.get('page') || 2) - 1) || 1}&limit=${query?.get('limit') || 1}`)}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page} of {Math.ceil(totalCount / limit)}</p> : <div></div>
                }
                {
                    page < totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/classes/archive?page=${(Number(query?.get('page') || 1) + 1) || 1}&limit=${query?.get('limit') || 20}`)}>Next</p> : <div></div>
                }
            </div>
        </div>
    );
}

export default ClassArchiveComponent;
