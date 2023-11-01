import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/reusables/Field/InputField";
import TextButton from "../../../components/reusables/Button/TextButton";
import { useNavigate, useParams } from "react-router-dom";
// import UploadVocationCsvFile from "../../../components/reusables/Modal/UploadCsvVocation";
import ClassCreateUpdateModal from "../../../components/reusables/Modal/ClassCreateUpdate";
import ClassCard from "../../../components/reusables/Card/ClassCard";
import CategoryClassUpdateModal from "../../../components/reusables/Modal/Class/UpdateCategory";
import RequirementUpdateModal from "../../../components/reusables/Modal/Class/UpdateRequirement";
import CurriculumUpdateModal from "../../../components/reusables/Modal/Class/UpdateCurriculum";
import ClassDetailModal from "../../reusables/Modal/Class/ClassDetail";
import AddStudentModal from "../../../components/reusables/Modal/Class/AddStudent";
import AddSponsorModal from "../../../components/reusables/Modal/Class/AddSponsor";
// import Select from "react-select";
import { getClasses } from "../../../config/api/services/classes";
import { useQuery } from "../../../utils/query";
import DeleteClassModal from "../../reusables/Modal/Class/ClassDelete";

function ClassMainComponent() {
    const [classes, setClasses] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();
    const query: any = useQuery();

    // Modal
    const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
    const [openCsvUpload, setOpenCsvUpload] = useState(false);
    const [openCategoryClass, setOpenCategoryClass] = useState(false);
    const [openRequirementClass, setOpenRequirementClass] = useState(false);
    const [openCurriculumClass, setOpenCurriculumClass] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [addStudent, setAddStudent] = useState(false);
    const [addSponsor, setAddSponsor] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [classId, setClassId] = useState("");
    const [className, setClassName] = useState("");
    const param = useParams();

    // const [vocations, setVocations] = useState([]);
    // Function
    async function fetchClass() {
        try {
            let res = await getClasses({
                page: Number(query?.get('page') || 1),
                limit: Number(query?.get('limit') || 10),
                vocationId: query?.get('vocationId') || '',
                name: query?.get('name') || '',
                code: query?.get('code') || '',
                categories: '',
                province: '',
                city: '',
                date: '',
            });

            setClasses(res.rows);
            setTotalCount(res.count);
            setPage(query?.get('page') || 1);
            setLimit(query?.get('limit') || 10)
            setName(query?.get('name') || '')
            setCode(query?.get('code') || '')
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
            {/* <BackLayout navigation={"/vocations"} /> */}
            <ClassCreateUpdateModal
                open={modalCreateUpdateOpen}
                id={classId}
                onClick={() => {
                    navigate(`/classes?page=1&limit=${query?.get('limit') || 20}`)
                    setModalCreateUpdateOpen(false)
                }}
                vocationId={param.id}
            />
            <CategoryClassUpdateModal
                id={classId}
                open={openCategoryClass}
                onClick={() => setOpenCategoryClass(false)}
            />
            <RequirementUpdateModal
                id={classId}
                open={openRequirementClass}
                onClick={() => setOpenRequirementClass(false)}
            />
            <CurriculumUpdateModal
                id={classId}
                open={openCurriculumClass}
                onClick={() => setOpenCurriculumClass(false)}
            />
            <ClassDetailModal
                open={openDetail}
                onClick={() => setOpenDetail(false)}
                id={classId}
            />
            <AddStudentModal
                id={classId}
                open={addStudent}
                onClick={() => {
                    navigate(`/classes?page=1&limit=${query?.get('limit') || 20}`)
                    setAddStudent(false)
                }}
            />
            <AddSponsorModal
                id={classId}
                open={addSponsor}
                onClick={() => setAddSponsor(false)}
            />
            <DeleteClassModal
                id={classId}
                open={openDelete}
                name={className}
                onAccept={() => {
                    setOpenDelete(false);
                    navigate(`/classes?page=1&limit=${query?.get('limit') || 20}`)
                }}
                onCancel={() => {
                    setOpenDelete(false);
                }}
            />
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
                    <div className="grid lg:grid-cols-3 gap-2 mb-4">
                        <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Class Name"} />
                        <InputSingleField required={false} value={code} onChange={(e) => setCode(e.target.value)} placeholder={"Class Code"} />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <TextButton
                            title="Search"
                            onClick={() => navigate(`/classes?page=1&limit=${query?.get('limit') || 20}&name=${name}&code=${code}`)}
                            disable={false}
                        />
                        <TextButton
                            title="Reset"
                            onClick={() => navigate(`/classes?page=1&limit=${query?.get('limit') || 20}&name=&code=`)}
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
                                    editMode={true}
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
                                    listStudentClick={() => {
                                        setClassId(data.id);
                                        setAddStudent(true);
                                    }}
                                    addSponsorClick={() => {
                                        setClassId(data.id);
                                        setAddSponsor(true);
                                    }}
                                    deleteClick={() => {
                                        setClassId(data.id);
                                        setOpenDelete(true);
                                        setClassName(data?.name)
                                    }}
                                    editClassClick={() => {
                                        setClassId(data.id);
                                        setModalCreateUpdateOpen(true)
                                    }}
                                    editRequirementClick={() => {
                                        setClassId(data.id);
                                        setOpenRequirementClass(true)
                                    }}
                                    editCurriculumClick={() => {
                                        setClassId(data.id);
                                        setOpenCurriculumClass(true)
                                    }}
                                    editCategoryClick={() => {
                                        setClassId(data.id);
                                        setOpenCategoryClass(true)
                                    }}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-rows justify-between px-4 mt-5">
                {
                    page > 1 ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/classes?page=${(Number(query?.get('page') || 2) - 1) || 1}&limit=${query?.get('limit') || 20}&name=${name}&code=${code}`)}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page} of {Math.ceil(totalCount / limit)}</p> : <div></div>
                }
                {
                    page < totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/classes?page=${(Number(query?.get('page') || 1) + 1) || 1}&limit=${query?.get('limit') || 20}&name=${name}&code=${code}`)}>Next</p> : <div></div>
                }
            </div>
        </div>
    );
}

export default ClassMainComponent;
