import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/Fields/InputField";
import { DropdownMultiField } from "../../../components/Fields/DropdownMulti";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { TextAreaField } from "../../../components/Fields/TextAreaField";
import { AiOutlineFileImage } from 'react-icons/ai';
import { useSelector } from "react-redux";
import { getAddress, uploadFile } from "../../../configs/api/services/public";
import { getMentors } from "../../../configs/api/services/mentor";
import { getCourses, } from "../../../configs/api/services/course";
import moment from "moment";
import { removeStripNumber, thousandSeparator } from "../../../utils/PriceFormatter";
import { createEvents, getDetailEvent, updateEvent } from "../../../configs/api/services/event";

function EventFormPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("create");
    const [searchParams] = useSearchParams();
    const [detail, setDetail] = useState(null);
    const { provinces } = useSelector((res) => res.global);

    const [banner, setBanner] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [objective, setObjective] = useState('');
    const [maxParticipant, setMaxParticipant] = useState('');
    const [youtubeId, setYoutubeId] = useState('');
    const [series, setSeries] = useState('');
    const [orderSeries, setOrderSeries] = useState('');
    const [eventSocialType, setEventSocialType] = useState(null);
    const [mentor, setMentor] = useState([]);
    const [course, setCourse] = useState([]);

    const [addressWork, setAddressWork] = useState('');
    const [locationLink, setLocationLink] = useState('');
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);

    const [eventPrice, setEventPrice] = useState('0');

    const [startDate, setStartDate] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endHour, setEndHour] = useState('');

    const [cities, setCities] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [courses, setCourses] = useState([]);

    const eventTypeCollaboration = [
        {
            label: 'CSR',
            value: 'CSR',
        },
        {
            label: 'CRM',
            value: 'CRM',
        },
        {
            label: 'OTHER',
            value: 'OTHER',
        },
    ];

    const [error, setError] = useState({
        maxParticipant: false,
        name: false,
        objective: false,
        description: false,
        eventType: false,
        youtubeId: false,
        startDate: false,
        startHour: false,
        endDate: false,
        endHour: false,
        eventPrice: false,
        addressWork: false,
        province: false,
        city: false,
        locationLink: false,
    });

    async function submit() {
        try {
            setLoading(true);
            setError({
                maxParticipant: false,
                name: false,
                objective: false,
                description: false,
                eventType: false,
                youtubeId: false,
                startDate: false,
                startHour: false,
                endDate: false,
                endHour: false,
                eventPrice: false,
                addressWork: false,
                province: false,
                city: false,
                locationLink: false,
            });

            const formattedStart = moment(`${startDate} ${startHour}`).valueOf() / 1000;
            const formattedEnd = moment(`${endDate} ${endHour}`).valueOf() / 1000;

            const payload = new FormData();
            let res = null;

            if (type === 'create') {
                payload.append("profile", banner);

                res = await uploadFile(payload);
            } else if (type !== 'create') {
                if (detail) {
                    payload.append("profile", banner);

                    res = await uploadFile(payload);
                } else {
                    res = [{ URL: detail?.banner }]
                }
            }

            if (type === "create") {
                await createEvents({
                    name,
                    description,
                    objective,
                    startDate: formattedStart,
                    endDate: formattedEnd,
                    bannerPath: res[0]?.URL,
                    price: removeStripNumber(eventPrice),
                    quota: maxParticipant,
                    classType: eventSocialType?.value,
                    mentors: mentor,
                    courses: course,
                    youtubeId,
                    series,
                    orderSeries: Number(orderSeries),
                    completeAddress: addressWork,
                    locationId: city?.id,
                    locationLink,
                })
            } else {
                await updateEvent({
                    id: searchParams.get('id'),
                    name,
                    description,
                    objective,
                    startDate: formattedStart,
                    endDate: formattedEnd,
                    bannerPath: res[0]?.URL,
                    price: removeStripNumber(eventPrice),
                    quota: maxParticipant,
                    classType: eventSocialType?.value,
                    youtubeId,
                    series,
                    orderSeries: Number(orderSeries),
                    completeAddress: addressWork,
                    locationId: city?.id,
                    locationLink,
                })
            }

            toast(`Success ${type} event`);
            navigate('/events/list');
        } catch (error) {
            if (error.name === 'ValidationError') {
                let section = {
                    maxParticipant: false,
                    name: false,
                    objective: false,
                    description: false,
                    eventType: false,
                    youtubeId: false,
                    startDate: false,
                    startHour: false,
                    endDate: false,
                    endHour: false,
                    eventPrice: false,
                    addressWork: false,
                    province: false,
                    city: false,
                    locationLink: false,
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
        try {
            setLoading(true);

            if (searchParams.get("section")) {
                setType(searchParams.get("section"));

                const res = await getMentors({ page: 1, limit: 200 });
                const resCourse = await getCourses({ page: 1, limit: 200 });

                setMentors(res.list);
                setCourses(resCourse.list);
            }

            if (searchParams.get("section") !== 'create') {
                if (searchParams.get("id")) {
                    const res = await getDetailEvent({ id: searchParams.get("id") });

                    let selectedProvince = null;

                    if (res.location) {
                        selectedProvince = provinces.findIndex((data) => data.codeProvince === res.location.codeProvince);

                        getCities({ codeProvince: res.location.codeProvince })
                    }

                    console.log(res);

                    setAddressWork(res.completeAddress);
                    setCity(res.location);
                    setDescription(res.description);
                    setObjective(res.objective);
                    setName(res.name);

                    setDetail(res);
                    setProvince(res.location ? provinces[selectedProvince] : null);
                    setMaxParticipant(res.quota);
                    setEventSocialType({ value: res.category, label: res.category });
                    setStartDate(moment.unix(res.startDate).format("YYYY-MM-DD"));
                    setStartHour(moment.unix(res.startDate).format("HH:mm"));
                    setEndDate(moment.unix(res.endDate).format("YYYY-MM-DD"));
                    setEndHour(moment.unix(res.endDate).format("HH:mm"));
                    setEventPrice(res.price);
                    setYoutubeId(res.youtubeId);
                    setSeries(res.series);
                    setOrderSeries(res.orderSeries);
                    setLocationLink(res.locationLink);
                }
            }
        } catch (error) {
            toast(error.message)
        } finally {
            setLoading(false);
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
        course.splice(index, 1);
    }

    function removeMultiMentor(index) {
        mentor.splice(index, 1);
    }

    useEffect(() => {
        initial();
    }, [])

    return (
        <div>
            <div className="border bg-white rounded p-4 w-full ">
                <h1 className="text-xl font-semibold mb-6">Form Event</h1>
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
                            src={detail.bannerMobile}
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
                        <h1 className="text-lg font-semibold mt-6 mb-3">Detail Event</h1>
                    </div>
                    <div className="grid grid-cols-1">
                        <InputSingleField error={error.name} label={"Name"} labelWeight={600} required value={name} onChange={(e) => setName(e.target.value)} />
                        <TextAreaField error={error.description} label={"Description"} labelWeight={600} required value={description} onChange={(e) => setDescription(e.target.value)} />
                        <TextAreaField error={error.objective} label={"Objective"} labelWeight={600} required value={objective} onChange={(e) => setObjective(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField label={"Series"} labelWeight={600} value={series} onChange={(e) => setSeries(e.target.value)} />
                        <InputSingleField label={"Series Order"} labelWeight={600} value={orderSeries} onChange={(e) => setOrderSeries(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField error={error.maxParticipant} label={"Max Participant"} labelWeight={600} required value={maxParticipant} onChange={(e) => setMaxParticipant(e.target.value)} />
                        <DropdownMultiField error={error.eventType} label={"Event Type"} required keyValue={"value"} keyLabel={"label"} list={eventTypeCollaboration} labelWeight={600} value={eventSocialType} onDropdownItemClick={(e) => setEventSocialType(e)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1">
                        <InputSingleField error={error.youtubeId} label={"Youtube Id"} labelWeight={600} required value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} />
                    </div>
                </>
                {
                    type === "create" ? <>
                        <div className="border-b-[1px] border-b-gray-400 mb-3">
                            <h1 className="text-lg font-semibold mt-6 mb-3">Collaboration Event</h1>
                        </div>
                        <div className="grid grid-cols-1">
                            <DropdownMultiField required multi error={false} label={"Mentor"} keyValue={"value"} keyLabel={"name"} list={mentors} labelWeight={600} value={mentor} onDropdownItemClick={(e) => setMentor([...mentor, e])} onRemoveValue={(e) => removeMultiMentor(e)} />
                            <DropdownMultiField required multi error={false} label={"Course"} keyValue={"id"} keyLabel={"name"} list={courses} labelWeight={600} value={course} onDropdownItemClick={(e) => setCourse([...course, e])} onRemoveValue={(e) => removeMultiCat(e)} />
                        </div>
                    </> : null
                }
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Schedule Event</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField type={"date"} error={error.startDate} required label={"Start Date"} labelWeight={600} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <InputSingleField type={"time"} error={error.startHour} required label={"Start Hour"} labelWeight={600} value={startHour} onChange={(e) => setStartHour(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField type={"date"} error={error.endDate} required label={"End Date"} labelWeight={600} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <InputSingleField type={"time"} error={error.endHour} required label={"End Hour"} labelWeight={600} value={endHour} onChange={(e) => setEndHour(e.target.value)} />
                    </div>
                </>
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Event Price</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField error={error.eventPrice} label={"Event Price"} labelWeight={600} required value={thousandSeparator(eventPrice)} onChange={(e) => setEventPrice(e.target.value)} />
                    </div>
                </>
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Address Event</h1>
                    </div>
                    <TextAreaField required label={"Complete Address"} labelWeight={600} value={addressWork} onChange={(e) => setAddressWork(e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <DropdownMultiField error={error.type} label={"Province"} keyValue={"id"} keyLabel={"provinceName"} list={provinces} labelWeight={600} value={province} onDropdownItemClick={(e) => { getCities({ codeProvince: e.codeProvince }); setProvince(e) }} />
                        <DropdownMultiField error={error.type} label={"City"} keyValue={"id"} keyLabel={"cityName"} list={cities} labelWeight={600} value={city} onDropdownItemClick={(e) => setCity(e)} />
                    </div>
                    <InputSingleField error={error.locationLink} label={"Location Link"} labelWeight={600} value={locationLink} onChange={(e) => setLocationLink(e.target.value)} />
                </>


                <div className="mt-8">
                    <GeneralButton title={"Submit"} onClick={() => submit()} loading={loading} disable={type ? false : loading ? loading : true} icon={<MdOutlineCheckCircleOutline color={"white"} size={20} />} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default EventFormPage;
