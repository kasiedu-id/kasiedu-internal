import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPost } from "../../../config/api";
import { InputSingleField } from "../../../components/reusables/Field/InputField";
import TextButton from "../../../components/reusables/Button/TextButton";
import { useParams } from "react-router-dom";
import UploadVocationCsvFile from "../../../components/reusables/Modal/UploadCsvVocation";
import ClassCreateUpdateModal from "../../../components/reusables/Modal/ClassCreateUpdate";
import ClassCard from "../../../components/reusables/Card/ClassCard";
import CategoryClassUpdateModal from "../../../components/reusables/Modal/Class/UpdateCategory";
import RequirementUpdateModal from "../../../components/reusables/Modal/Class/UpdateRequirement";
import CurriculumUpdateModal from "../../../components/reusables/Modal/Class/UpdateCurriculum";
import ClassDetailModal from "../../../components/reusables/Modal/ClassDetail";
import AddStudentModal from "../../../components/reusables/Modal/Class/AddStudent";
import AddSponsorModal from "../../../components/reusables/Modal/Class/AddSponsor";
import Select from "react-select";

function ClassList() {
    const [classes, setClasses] = useState([]);
    const [name, setName] = useState("");
    const [vocation, setVocation] = useState(null);
    const [page, setPage] = useState(0);
    const limit = 10;
    const [totalCount, setTotalCount] = useState(0);
    const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
    const [openCsvUpload, setOpenCsvUpload] = useState(false);
    const [openCategoryClass, setOpenCategoryClass] = useState(false);
    const [openRequirementClass, setOpenRequirementClass] = useState(false);
    const [openCurriculumClass, setOpenCurriculumClass] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [addStudent, setAddStudent] = useState(false);
    const [addSponsor, setAddSponsor] = useState(false);
    const [classId, setClassId] = useState("");
    const [className, setClassName] = useState("");
    const param = useParams();

    const [vocations, setVocations] = useState([]);
    // Function
    async function getClasses({
        page
    }) {
        try {
            let res = await HttpPost(`classes/`, {
                limit: limit,
                start: page,
                name,
                vocationId: vocation ? vocation?.value : ""
            }, null);

            setClasses(res.rows);
            setTotalCount(res.count);
            setPage(page)
        } catch (error) {
            toast(error.message);
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

    function handleSelectVocation(data) {
        setVocation(data);
    }

    useEffect(() => {
        fetchVocation();
        getClasses({
            page: 0
        });
    }, []);

    return (
        <div>
            {/* <BackLayout navigation={"/vocations"} /> */}
            <ClassCreateUpdateModal
                open={modalCreateUpdateOpen}
                id={classId}
                onClick={() => {
                    getClasses({ page: 0 });
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
                    getClasses({
                        page: 0
                    });
                    setAddStudent(false)
                }}
            />
            <AddSponsorModal
                id={classId}
                open={addSponsor}
                onClick={() => setAddSponsor(false)}
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
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Class Name"} />
                        <div className="pt-2">
                            <Select
                                options={vocations}
                                placeholder="Select Vocation"
                                value={vocation}
                                onChange={handleSelectVocation}
                                isSearchable={true}
                                isMulti={false}
                                className="outline-none"
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <TextButton
                            title="Search"
                            onClick={() => getClasses({
                                page: 0
                            })}
                            disable={false}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    {
                        classes.map((data) => {
                            return (
                                <ClassCard
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
                                    deleteClick={() => null}
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
                    page > 0 ? <p className="cursor-pointer font-semibold" onClick={() => getClasses({
                        page: page - 1,
                    })}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page + 1} of {Math.ceil(totalCount / limit)}</p> : <div></div>
                }
                {
                    page + 1 <= totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => getClasses({
                        page: page + 1,
                    })}>Next</p> : <div></div>
                }
            </div>
        </div>
    );
}

export default ClassList;
