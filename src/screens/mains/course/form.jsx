import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/Fields/InputField";
import { DropdownMultiField } from "../../../components/Fields/DropdownMulti";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { MdOutlineCheckCircleOutline, MdDeleteOutline } from "react-icons/md";
import { TextAreaField } from "../../../components/Fields/TextAreaField";
import { AiOutlineFileImage } from 'react-icons/ai';
import { useSelector } from "react-redux";
import { getAddress, uploadFile } from "../../../configs/api/services/public";
import { getMentors } from "../../../configs/api/services/mentor";
import { createCourses, getDetailCourse, updateCourse } from "../../../configs/api/services/course";
import moment from "moment";
import { removeStripNumber, thousandSeparator } from "../../../utils/PriceFormatter";

function CourseFormPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("create");
    const [searchParams] = useSearchParams();
    const [detail, setDetail] = useState(null);
    const { provinces, categories } = useSelector((res) => res.global);

    const [banner, setBanner] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [maxParticipant, setMaxParticipant] = useState('');
    const [urlLink, setUrlLink] = useState('');
    const [duration, setDuration] = useState('');
    const [durationType, setDurationType] = useState({ name: 'Week', value: 'week' });
    const [studyType, setStudyType] = useState(null);
    const [courseType, setCourseType] = useState(null);
    const [certificate, setCertificate] = useState(null);
    const [category, setCategory] = useState([]);
    const [mentor, setMentor] = useState([]);
    const [curriculum, setCurriculum] = useState([]);

    const [addressWork, setAddressWork] = useState('');
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);

    const [coursePrice, setCoursePrice] = useState('');
    const [workshopPrice, setWorkshopPrice] = useState('');
    const [minimumPrice, setMinimumPrice] = useState('');

    const [openRegis, setOpenRegis] = useState('');
    const [closeRegis, setCloseRegis] = useState('');
    const [startClass, setStartClass] = useState('');

    const [draftName, setDraftName] = useState('');
    const [draftDescription, setDraftDescription] = useState('');

    const [cities, setCities] = useState([]);
    const [mentors, setMentors] = useState([]);

    const studyTypes = [
        {
            label: 'Online',
            value: 'ONLINE',
        },
        {
            label: 'Hybrid',
            value: 'HYBRID',
        },
        {
            label: 'On-site',
            value: 'ON_SITE',
        },
    ];

    const courseTypes = [
        {
            label: 'Workshop',
            value: 'WORKSHOP',
        },
        {
            label: 'Course',
            value: 'COURSE',
        },
    ];

    const certificates = [
        {
            label: 'Yes',
            value: true,
        },
        {
            label: 'No',
            value: false,
        },
    ];


    const durationTypes = [
        {
            label: 'Minute',
            value: 'MINUTE',
        },
        {
            label: 'Hour',
            value: 'HOUR',
        },
        {
            label: 'Day',
            value: 'DAY',
        },
        {
            label: 'Week',
            value: 'WEEK',
        },
        {
            label: 'Month',
            value: 'MONTH',
        },
        {
            label: 'Year',
            value: 'YEAR',
        },
    ];

    const [error, setError] = useState({
        maxParticipant: false,
        name: false,
        duration: false,
        durationType: false,
        studyType: false,
        coursePrice: false,
        workshopPrice: false,
        minimumPrice: false,
        openRegis: false,
        closeRegis: false,
        startClass: false,
        addressWork: false,
        province: false,
        city: false,
    });

    async function submit() {
        try {
            setLoading(true);
            setError({
                maxParticipant: false,
                name: false,
                duration: false,
                durationType: false,
                studyType: false,
                coursePrice: false,
                workshopPrice: false,
                minimumPrice: false,
                openRegis: false,
                closeRegis: false,
                startClass: false,
                addressWork: false,
                province: false,
                city: false,
            });

            const payload = new FormData();
            let res = null;

            if (type === 'create') {
                payload.append("banner", banner);

                res = await uploadFile(payload);
            } else if (type !== 'create') {
                if (banner) {
                    payload.append("banner", banner);

                    res = await uploadFile(payload);
                } else {
                    res = [{ URL: detail?.banner }]
                }
            }

            if (type === "create") {
                await createCourses({
                    name,
                    description,
                    openRegis: moment(openRegis).valueOf() / 1000,
                    closeRegis: moment(closeRegis).valueOf() / 1000,
                    startCourse: moment(startClass).valueOf() / 1000,
                    price: removeStripNumber(coursePrice),
                    workshopPrice: 0,
                    minimumPrice: removeStripNumber(minimumPrice),
                    maxParticipant,
                    duration,
                    durationType: durationType.value,
                    categories: category,
                    curriculums: curriculum,
                    mentors: mentor,
                    classType: studyType.value,
                    completeAddress: addressWork,
                    courseType: courseType.value,
                    certificate: certificate.value,
                    locationId: city?.id,
                    bannerPath: res[0]?.URL,
                    urlLink,
                })
            } else {
                await updateCourse({
                    id: searchParams.get("id"),
                    name,
                    description,
                    openRegis: moment(openRegis).valueOf() / 1000,
                    closeRegis: moment(closeRegis).valueOf() / 1000,
                    startCourse: moment(startClass).valueOf() / 1000,
                    price: removeStripNumber(coursePrice),
                    workshopPrice: 0,
                    minimumPrice: removeStripNumber(minimumPrice),
                    maxParticipant,
                    duration,
                    durationType: durationType.value,
                    classType: studyType.value,
                    courseType: courseType.value,
                    certificate: certificate.value,
                    completeAddress: addressWork,
                    locationId: city?.id,
                    bannerPath: res[0]?.URL,
                    urlLink,
                })
            }

            toast(`Success ${type} course`);
            navigate('/courses/list');
        } catch (error) {
            if (error.name === 'ValidationError') {
                let section = {
                    maxParticipant: false,
                    name: false,
                    duration: false,
                    durationType: false,
                    studyType: false,
                    coursePrice: false,
                    workshopPrice: false,
                    minimumPrice: false,
                    openRegis: false,
                    closeRegis: false,
                    startClass: false,
                    addressWork: false,
                    province: false,
                    city: false,
                };

                // Check Each Field for error
                error.errors.forEach((data) => {
                    // if (data.toLowerCase().includes('institute')) section = { ...section, instituteName: true };
                    // if (data.toLowerCase().includes('pic email')) section = { ...section, picEmail: true };
                    // if (data.toLowerCase().includes('pic name')) section = { ...section, picName: true };
                    // if (data.toLowerCase().includes('pic phone')) section = { ...section, picPhone: true };
                    // if (data.toLowerCase().includes('address')) section = { ...section, addressWork: true };
                    // if (data.toLowerCase().includes('province')) section = { ...section, province: true };
                    // if (data.toLowerCase().includes('city')) section = { ...section, city: true };
                    // if (data.toLowerCase().includes('logo')) section = { ...section, logo: true };
                });

                setError({
                    ...section,
                })
            } else {
                toast(error.message)
            }
        } finally {
            setLoading(false);
        }
    }

    async function initial() {
        if (searchParams.get("section")) {
            setType(searchParams.get("section"));

            const res = await getMentors({ page: 1, limit: 200 });

            setMentors(res.list);
        }

        if (searchParams.get("section") !== 'create') {
            if (searchParams.get("id")) {
                const res = await getDetailCourse({ id: searchParams.get("id") });

                const selectedProvince = provinces.findIndex((data) => data?.codeProvince === res.location?.codeProvince);

                const selectedType = courseTypes.findIndex((data) => data.value === res.category);

                if (res.location) getCities({ codeProvince: res.location.codeProvince })

                setAddressWork(res.completeAddress);
                setCourseType(res.category ? courseTypes[selectedType] : null);
                setCertificate(res.certificate ? { label: 'Yes', value: true } : { label: 'no', value: false })
                setCity(res.location);
                setDescription(res.description);
                setName(res.name);
                setDetail(res);
                setDuration(res.duration);
                setProvince(res.location ? provinces[selectedProvince] : null);
                setMaxParticipant(res.participantSeat);
                setDurationType({ label: res.durationType, value: res.durationType });
                setStudyType({ value: res.type, label: res.type.replace(/_/g, '-') });
                setCloseRegis(res.closeRegis ? moment.unix(res.closeRegis).format("YYYY-MM-DD") : '');
                setOpenRegis(res.openRegis ? moment.unix(res.openRegis).format("YYYY-MM-DD"): '');
                setStartClass(res.courseStart ? moment.unix(res.courseStart).format("YYYY-MM-DDTHH:mm") : '');
                setCoursePrice(res.price);
                setWorkshopPrice(res.minimumWorkshop);
                setMinimumPrice(res.minimumPrice);
                setUrlLink(res.urlLink);
            }
        }
    }

    async function getCities({ codeProvince }) {
        try {
            setLoading(true);

            const res = await getAddress({ code: codeProvince });

            setCities(res);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    function removeMultiCat(index) {
        category.splice(index, 1);
    }

    function removeMultiMentor(index) {
        mentor.splice(index, 1);
    }

    function addCur(name, desc) {
        setDraftName("");
        setDraftDescription("");

        setCurriculum([
            ...curriculum,
            {
                name,
                description: desc,
            }
        ])
    }

    function removeCurr(index) {
        curriculum.splice(index, 1);

        setCurriculum([...curriculum]);
    }

    useEffect(() => {
        initial();
    }, [])

    return (
        <div>
            <div className="border bg-white rounded p-4 w-full ">
                <h1 className="text-xl font-semibold mb-6">Form Course</h1>
                <div className="border h-[150px] w-[250px] mx-auto mb-5">
                    {detail ? banner ? (
                        <label
                            className="flex justify-center items-center h-[100%]"
                            htmlFor={`file-photo`}
                        >
                            <img
                                src={URL.createObjectURL(banner)}
                                style={{ width: "100%", height: "100%" }}
                                alt=""
                            />
                        </label>
                    ) : <label
                        className="flex justify-center items-center h-[100%]"
                        htmlFor={`file-photo`}
                    >
                        <img
                            src={detail.banner}
                            style={{ width: "100%", height: "100%" }}
                            alt=""
                        />
                    </label> : banner ? (
                        <label
                            className="flex justify-center items-center h-[100%]"
                            htmlFor={`file-photo`}
                        >
                            <img
                                src={URL.createObjectURL(banner)}
                                style={{ width: "100%", height: "100%" }}
                                alt=""
                            />
                        </label>
                    ) : (
                        <label
                            className="flex justify-center items-center h-[100%]"
                            htmlFor={`file-photo`}
                        >
                            <AiOutlineFileImage className="mr-[10px]" />
                            Photo
                        </label>
                    )}
                    <input
                        type="file"
                        accept=".png,.jpg,.pdf"
                        hidden
                        id={`file-photo`}
                        onChange={(e) => setBanner(e.target.files[0])}
                    />
                </div>
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Detail Course</h1>
                    </div>
                    <div className="grid grid-cols-1">
                        <InputSingleField error={error.name} label={"Name"} labelWeight={600} required value={name} onChange={(e) => setName(e.target.value)} />
                        <TextAreaField label={"Description"} labelWeight={600} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField error={error.duration} label={"Duration"} labelWeight={600} required value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <DropdownMultiField error={error.durationType} label={"Duration Type"} required keyValue={"value"} keyLabel={"label"} list={durationTypes} labelWeight={600} value={durationType} onDropdownItemClick={(e) => setDurationType(e)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField error={error.maxParticipant} label={"Max Participant"} labelWeight={600} required value={maxParticipant} onChange={(e) => setMaxParticipant(e.target.value)} />
                        <DropdownMultiField error={error.studyType} label={"Study Type"} required keyValue={"value"} keyLabel={"label"} list={studyTypes} labelWeight={600} value={studyType} onDropdownItemClick={(e) => setStudyType(e)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <DropdownMultiField error={error.studyType} label={"Course Type"} required keyValue={"value"} keyLabel={"label"} list={courseTypes} labelWeight={600} value={courseType} onDropdownItemClick={(e) => setCourseType(e)} />
                        <DropdownMultiField error={error.studyType} label={"Certificate"} required keyValue={"value"} keyLabel={"label"} list={certificates} labelWeight={600} value={certificate} onDropdownItemClick={(e) => setCertificate(e)} />
                    </div>
                    {
                        type === "create" ? <div className="grid grid-cols-1">
                            <DropdownMultiField multi error={false} label={"Category"} keyValue={"value"} keyLabel={"nameEn"} list={categories} labelWeight={600} value={category} onDropdownItemClick={(e) => setCategory([...category, e])} onRemoveValue={(e) => removeMultiCat(e)} />
                        </div> : null
                    }
                </>
                {
                    type === "create" ? <>
                        <div className="border-b-[1px] border-b-gray-400 mb-3">
                            <h1 className="text-lg font-semibold mt-6 mb-3">Mentor Course</h1>
                        </div>
                        <div className="grid grid-cols-1">
                            <DropdownMultiField required multi error={false} label={"Mentor"} keyValue={"value"} keyLabel={"name"} list={mentors} labelWeight={600} value={mentor} onDropdownItemClick={(e) => setMentor([...mentor, e])} onRemoveValue={(e) => removeMultiMentor(e)} />
                        </div>
                    </> : null
                }
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Schedule Course</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField type={"date"} error={error.openRegis} label={"Open Regis"} labelWeight={600} value={openRegis} onChange={(e) => setOpenRegis(e.target.value)} />
                        <InputSingleField type={"date"} error={error.closeRegis} label={"Close Regis"} labelWeight={600} value={closeRegis} onChange={(e) => setCloseRegis(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField type={"datetime-local"} error={error.startClass} label={"Class Start"} labelWeight={600} value={startClass} onChange={(e) => setStartClass(e.target.value)} />
                    </div>
                </>
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Course Price</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField error={error.coursePrice} label={"Total Price"} labelWeight={600} required value={thousandSeparator(coursePrice)} onChange={(e) => setCoursePrice(e.target.value)} />
                        <InputSingleField disable={courseType?.value === 'WORKSHOP'} error={error.minimumPrice} label={"Minimum Price"} labelWeight={600} required value={thousandSeparator(minimumPrice)} onChange={(e) => setMinimumPrice(e.target.value)} />
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField error={error.workshopPrice} label={"Workshop Participant Price"} labelWeight={600} required value={thousandSeparator(workshopPrice)} onChange={(e) => setWorkshopPrice(e.target.value)} />
                    </div> */}
                </>
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Address Course</h1>
                    </div>
                    <TextAreaField required label={"Complete Address"} labelWeight={600} value={addressWork} onChange={(e) => setAddressWork(e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <DropdownMultiField error={error.type} label={"Province"} required keyValue={"id"} keyLabel={"provinceName"} list={provinces} labelWeight={600} value={province} onDropdownItemClick={(e) => { getCities({ codeProvince: e.codeProvince }); setProvince(e) }} />
                        <DropdownMultiField error={error.type} label={"City"} required keyValue={"id"} keyLabel={"cityName"} list={cities} labelWeight={600} value={city} onDropdownItemClick={(e) => setCity(e)} />
                    </div>
                    <InputSingleField error={false} label={"Url Link"} labelWeight={600} value={urlLink} onChange={(e) => setUrlLink(e.target.value)} />
                </>
                {
                    type === "create" ? <>
                        <div className="border-b-[1px] border-b-gray-400 mb-3">
                            <h1 className="text-lg font-semibold mt-6 mb-3">Curriculum Course</h1>
                        </div>
                        <div className="flex gap-5 items-center">
                            <div className="w-3/4">
                                <InputSingleField error={false} label={"Name"} labelWeight={600} value={draftName} onChange={(e) => setDraftName(e.target.value)} />
                                <TextAreaField label={"Description"} labelWeight={600} value={draftDescription} onChange={(e) => setDraftDescription(e.target.value)} />
                            </div>
                            <div>
                                <GeneralButton title={"Add"} onClick={() => addCur(draftName, draftDescription)} loading={loading} disable={type ? false : loading ? loading : true} icon={null} />
                            </div>
                        </div>
                        <div className="overflow-auto">
                            <table className="table-auto min-w-full max-w-[1200px]">
                                <thead className="bg-gray-600">
                                    <tr>
                                        <th className="w-[25px] p-2 border-black border-[1px] text-white">No.</th>
                                        <th className="p-2 border-black border-[1px] text-white">Curriculum</th>
                                        <th className="w-[40px] p-2 border-black border-[1px] text-white">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        curriculum.length > 0 ? curriculum.map((data, index) => {
                                            return (<tr key={index}>
                                                <td className="text-center py-2 font-semibold border-gray-400 border-[1px]">{index + 1}</td>
                                                <td className="px-3 py-2 border-gray-400 border-[1px] capitalize">
                                                    <p>{data?.name}</p>
                                                    <p>{data?.description}</p>
                                                </td>
                                                <td className="px-3py-2 border-gray-400 border-[1px] min-h-10">
                                                    <div className="flex gap-5 justify-center items-center">
                                                        <MdDeleteOutline color={"red"} size={20} onClick={() => removeCurr(index)} />
                                                    </div>
                                                </td>
                                            </tr>)
                                        }) : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </> : null
                }


                <div className="mt-8">
                    <GeneralButton title={"Submit"} onClick={() => submit()} loading={loading} disable={type ? false : loading ? loading : true} icon={<MdOutlineCheckCircleOutline color={"white"} size={20} />} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default CourseFormPage;
