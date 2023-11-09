import { useEffect, useState } from "react";
import { InputSingleField } from "../Field/InputField";
import { TextAreaField } from "../Field/TextAreaField";
import { HttpGet, HttpPost, HttpPut } from "../../../config/api";
import { toast } from "react-toastify";
import { DropdownField } from "../Field/DropdownField";
import Select from "react-select";
import TextButton from "../Button/TextButton";
import moment from "moment";
import LoadingModal from "../Loading/Loading";
import { getClassDetail } from "../../../config/api/services/classes";

function ClassCreateUpdateModal({ open, onClick, id, vocationId }) {
    const [page, setPage] = useState(0);
    const [pageLimit, setPageLimit] = useState(4)
    const [vocation, setVocation] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [certificate, setCertificate] = useState("");
    const [kasieduCertificate, setKasieduCertificate] = useState("");
    const [classType, setClassType] = useState("");
    const [isPrivate, setIsPrivate] = useState("");
    const [price, setPrice] = useState("");
    const [maxPerson, setMaxPerson] = useState("");
    const [openRegis, setOpenRegis] = useState("");
    const [closeRegis, setCloseRegis] = useState("");
    const [startClass, setStartClass] = useState("");
    const [duration, setDuration] = useState("");
    const [durationType, setDurationType] = useState("month");
    const [location, setLocation] = useState("");
    const [completeAddress, setCompleteAddress] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState([]);
    const [requirement, setRequirement] = useState("");
    const [requirements, setRequirements] = useState([]);
    const [curriculumTitle, setCurriculumTitle] = useState("");
    const [curriculumDesc, setCurriculumDesc] = useState("");
    const [curriculums, setCurriculums] = useState([]);
    const [loading, setLoading] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [vocations, setVocations] = useState([]);

    async function submit() {
        try {
            setLoading(true);
            if (!id) {
                if (!vocation) throw ({
                    message: 'Choose Vocation'
                });

                await HttpPost(`internal/classes`, {
                    name,
                    description,
                    certificate,
                    kasieduCertificate,
                    openRegis,
                    closeRegis,
                    classStart: startClass,
                    price,
                    maxPerson,
                    duration,
                    durationType,
                    requirements,
                    categories: category.map((data) => data.value),
                    curriculums,
                    classType,
                    isPrivate,
                    vocationId: vocationId ? vocation : vocation.value,
                    completeAddress,
                    addressId: city
                }, null);
                toast("Success create a new class");
                reset();
            } else {
                await HttpPut(
                    `internal/classes/${id}`,
                    {
                        vocationId: vocation.value,
                        name,
                        description,
                        certificate,
                        kasieduCertificate,
                        openRegis,
                        closeRegis,
                        classStart: startClass,
                        price,
                        maxPerson,
                        duration,
                        durationType,
                        classType,
                        isPrivate,
                        completeAddress,
                        addressId: city
                    },
                    null
                );
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

    async function fetchDetail() {
        try {
            let res = await getClassDetail({
                id
            });

            console.log(res);

            setName(res.name);
            setCertificate(res.certificate);
            setKasieduCertificate(res.certificate);
            setClassType(res.classType);
            setIsPrivate(String(res.isPrivate));
            setPrice(res?.price);
            setMaxPerson(res.maxPerson);
            setOpenRegis(res.openRegis ? moment.unix(res.openRegis).utc().format('YYYY-MM-DD') : "");
            setCloseRegis(res.closeRegis ? moment.unix(res.closeRegis).format('YYYY-MM-DD') : "");
            setStartClass(res.classStart ? moment.unix(res.classStart).format('YYYY-MM-DD') : "");
            setDuration(res?.duration);
            setDurationType(res?.durationType);
            setCompleteAddress(res.completeAddress);
            setProvince(res?.location?.codeProvince);
            setCity(res?.location?.id);
            setDescription(res.description);
            if (res.location) {
                fetchCity({ provinceId: res?.location?.codeProvince })
            }
            setVocation({
                value: res.vocation.id,
                label: res.vocation.name
            });
            setPageLimit(1);
            setPage(0);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchProvince() {
        try {
            let res = await HttpGet(`regions/province`, null);

            setProvinces(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchCity({ provinceId }) {
        try {
            let res = await HttpGet(`regions/city-by-province/${provinceId}`, null);

            setCities(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchCategory() {
        try {
            let res = await HttpPost(`categories/`, {
                limit: 20,
                start: 0,
                method: 'all',
                name: '',
            }, null);

            setCategories(res.map(data => {
                return {
                    value: data.id,
                    label: data.name.toUpperCase()
                }
            }));
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

    function reset() {
        setVocation(vocationId ? vocationId : null);
        setPageLimit(4)
        setName("");
        setCertificate("");
        setKasieduCertificate("");
        setClassType("");
        setIsPrivate("");
        setPrice("");
        setMaxPerson("");
        setOpenRegis("");
        setCloseRegis("");
        setStartClass("");
        setDuration("");
        setDurationType("month");
        setCompleteAddress("");
        setProvince("");
        setCity("");
        setCategory([]);
        setRequirements([]);
        setCurriculums([]);
        setDescription("");
    }

    function handleSelect(data) {
        setCategory(data);
    }

    function handleSelectVocation(data) {
        setVocation(data);
    }

    function changePage({ page }) {
        setPage(page);
    }

    useEffect(() => {
        if (open) {
            if (vocations.length < 1) fetchVocation()
            if (provinces.length < 1) fetchProvince();
            if (categories.length < 1) fetchCategory();

            if (!id) reset();
            else if (id) fetchDetail();
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
                        Upload Class
                    </h3>
                    <div className="mt-2 px-4 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Please upload class information below:
                        </p>
                    </div>
                    <div className="mt-4 text-black">
                        <div className="mb-5">
                            <p className="font-bold text-lg">Class
                                {
                                    page === 0 ? " Detail" :
                                        page === 1 ? " Date" :
                                            page === 2 ? " Requirement" :
                                                page === 3 ? " Curriculum" : " Confirmation"
                                }
                            </p>
                        </div>
                        {
                            page === 0 ? <div>
                                {
                                    vocationId ? null : <div className="mb-3">
                                        <p
                                            className={`block tracking-wide text-black text-sm font-bold mb-2`}
                                        >
                                            Vocation
                                        </p>
                                        <Select
                                            options={vocations}
                                            placeholder="Select Vocation"
                                            value={vocation}
                                            onChange={handleSelectVocation}
                                            isSearchable={true}
                                            isMulti={false}
                                            className="outline-none z-1"
                                        />
                                    </div>
                                }
                                <div className="mb-3">
                                    <InputSingleField
                                        required={false}
                                        placeholder={"Fullstack Immersive"}
                                        type={"text"}
                                        textColor={"black"}
                                        label={"Name"}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <TextAreaField
                                        label={"Description"}
                                        labelWeight={""}
                                        value={description}
                                        labelColor={""}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                {
                                    id ? null : <div className="mb-3">
                                        <p
                                            className={`block tracking-wide text-black text-sm font-bold mb-2`}
                                        >
                                            Category
                                        </p>
                                        <Select
                                            options={categories}
                                            placeholder="Select Category"
                                            value={category}
                                            onChange={handleSelect}
                                            isSearchable={true}
                                            isMulti
                                            className="outline-none"
                                        />
                                    </div>
                                }
                                <div className="mb-3">
                                    <DropdownField
                                        colorLabel={"black"}
                                        label={"Certificate Vocation"}
                                        collectionList={[{
                                            name: "Provided",
                                            value: true,
                                        }, {
                                            name: "Not Provided",
                                            value: false,
                                        }]}
                                        keyField={"name"}
                                        valueField={"value"}
                                        labelField={"name"}
                                        value={certificate}
                                        placeholder="Certificate"
                                        onChange={(e) => setCertificate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <DropdownField
                                        colorLabel={"black"}
                                        label={"Certificate Kasi Edu"}
                                        collectionList={[{
                                            name: "Provided",
                                            value: true,
                                        }, {
                                            name: "Not Provided",
                                            value: false,
                                        }]}
                                        keyField={"name"}
                                        valueField={"value"}
                                        labelField={"name"}
                                        value={kasieduCertificate}
                                        placeholder="Certificate"
                                        onChange={(e) => setKasieduCertificate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <DropdownField
                                        colorLabel={"black"}
                                        label={"Class Private"}
                                        collectionList={[{
                                            name: "Private",
                                            value: true,
                                        }, {
                                            name: "Public",
                                            value: false,
                                        }]}
                                        keyField={"name"}
                                        valueField={"value"}
                                        labelField={"name"}
                                        value={isPrivate}
                                        placeholder="Class Private"
                                        onChange={(e) => {
                                            console.log(e.target.value, typeof e.target.value)
                                            setIsPrivate(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <DropdownField
                                        colorLabel={"black"}
                                        label={"Class Type"}
                                        collectionList={[{
                                            name: "Online",
                                            value: "online",
                                        }, {
                                            name: "Offline",
                                            value: "offline",
                                        }]}
                                        keyField={"name"}
                                        valueField={"value"}
                                        labelField={"name"}
                                        value={classType}
                                        placeholder="Class Type"
                                        onChange={(e) => setClassType(e.target.value)}
                                    />
                                </div>
                                {
                                    classType === 'offline' ? <div>
                                        <div className="mb-3">
                                            <DropdownField
                                                required={false}
                                                label={"Class Location"}
                                                value={location}
                                                collectionList={[{
                                                    name: "Same as vocation",
                                                    value: "same",
                                                }, {
                                                    name: "Different",
                                                    value: "different",
                                                }]}
                                                valueField={"value"}
                                                labelField={"name"}
                                                placeholder={"Class Location"}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                        </div>
                                        {
                                            location === 'different' ? <div>
                                                <div className="mb-3">
                                                    <TextAreaField
                                                        labelWeight={""}
                                                        label={"Complete Address"}
                                                        value={completeAddress}
                                                        labelColor={""}
                                                        onChange={(e) => setCompleteAddress(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <div className="flex flex-col gap-3">
                                                        <DropdownField
                                                            required={false}
                                                            label={"Province"}
                                                            value={province}
                                                            collectionList={provinces}
                                                            valueField={"codeProvince"}
                                                            labelField={"provinceName"}
                                                            placeholder={"Province"}
                                                            onChange={(e) => {
                                                                setProvince(e.target.value);
                                                                fetchCity({ provinceId: e.target.value })
                                                            }}
                                                        />
                                                        <DropdownField
                                                            required={false}
                                                            label={"City"}
                                                            value={city}
                                                            collectionList={cities}
                                                            valueField={"id"}
                                                            labelField={"cityName"}
                                                            placeholder={"City"}
                                                            onChange={(e) => {
                                                                setCity(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div> : null
                                        }
                                    </div> : null
                                }
                                <div className="mb-3">
                                    <InputSingleField
                                        required={false}
                                        placeholder={"10"}
                                        type={"number"}
                                        textColor={"black"}
                                        label={"Max Student"}
                                        value={maxPerson}
                                        onChange={(e) => setMaxPerson(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputSingleField
                                        required={false}
                                        placeholder={"10000000"}
                                        type={"text"}
                                        textColor={"black"}
                                        label={"Price"}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div> : null
                        }
                        {
                            page === 1 ? <div>
                                <div className="mb-3">
                                    <InputSingleField
                                        required={false}
                                        placeholder={""}
                                        type={"date"}
                                        textColor={"black"}
                                        label={"Open Regis"}
                                        value={openRegis}
                                        onChange={(e) => setOpenRegis(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputSingleField
                                        required={false}
                                        placeholder={""}
                                        type={"date"}
                                        textColor={"black"}
                                        label={"Close Regis"}
                                        value={closeRegis}
                                        onChange={(e) => setCloseRegis(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputSingleField
                                        required={false}
                                        placeholder={""}
                                        type={"date"}
                                        textColor={"black"}
                                        label={"Class Start"}
                                        value={startClass}
                                        onChange={(e) => setStartClass(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 flex gap-5">
                                    <div className="w-full">
                                        <InputSingleField
                                            required={false}
                                            placeholder={""}
                                            type={"number"}
                                            textColor={"black"}
                                            label={"Duration"}
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <DropdownField
                                            colorLabel={"black"}
                                            label={"Duration Type"}
                                            collectionList={[{
                                                name: "Month",
                                                value: "month",
                                            }, {
                                                name: "Day",
                                                value: "day",
                                            }, {
                                                name: "Session",
                                                value: "session",
                                            }]}
                                            keyField={"name"}
                                            valueField={"value"}
                                            labelField={"name"}
                                            value={durationType}
                                            placeholder="Duration Type"
                                            onChange={(e) => setDurationType(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div> : null
                        }
                        {
                            page === 2 ? <div>
                                <div className="mb-3 flex items-end gap-5">
                                    <div className="w-full">
                                        <InputSingleField
                                            required={false}
                                            placeholder={""}
                                            type={"text"}
                                            textColor={"black"}
                                            label={"Title"}
                                            value={requirement}
                                            onChange={(e) => setRequirement(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <TextButton
                                            onClick={() => {
                                                let req = requirements;

                                                req.push({ name: requirement });

                                                setRequirements(req);
                                                setRequirement("");
                                            }}
                                            title="Add"
                                            disable={false}
                                        />
                                    </div>
                                </div>
                                <p className="pt-17 mb-3 font-semibold">List Requirement</p>
                                <table>
                                    <thead className="table-auto">
                                        <tr className="text-white">
                                            <td className="px-2 border bg-slate-600">No</td>
                                            <td className="px-2 border bg-slate-600 text-center min-w-[410px]">Title</td>
                                            <td className="px-2 border bg-slate-600">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            requirements.map((data, i) => {
                                                return (
                                                    <tr>
                                                        <td className="px-2 border">{i + 1}.</td>
                                                        <td className="px-2 border">{data.name}</td>
                                                        <td className="px-2 border text-center">
                                                            <span onClick={() => {
                                                                requirements.splice(i, 1);
                                                                setRequirements([...requirements]);
                                                            }}>X</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div> : null
                        }
                        {
                            page === 3 ? <div>
                                <div className="mb-3 flex items-center gap-5">
                                    <div className="w-full">
                                        <InputSingleField
                                            required={false}
                                            placeholder={""}
                                            type={"text"}
                                            textColor={"black"}
                                            label={"Title"}
                                            value={curriculumTitle}
                                            onChange={(e) => setCurriculumTitle(e.target.value)}
                                        />
                                        <div className="mt-3">
                                            <InputSingleField
                                                required={false}
                                                placeholder={""}
                                                type={"text"}
                                                textColor={"black"}
                                                label={"Description"}
                                                value={curriculumDesc}
                                                onChange={(e) => setCurriculumDesc(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <TextButton
                                            onClick={() => {
                                                let req = curriculums;

                                                req.push({ name: curriculumTitle, description: curriculumDesc });

                                                setCurriculums(req);
                                                setCurriculumTitle("");
                                                setCurriculumDesc("");
                                            }}
                                            title="Add"
                                            disable={false}
                                        />
                                    </div>
                                </div>
                                <p className="pt-17 mb-3 font-semibold">List Curriculums</p>
                                <table>
                                    <thead className="table-auto">
                                        <tr className="text-white">
                                            <td className="px-2 border bg-slate-600">No</td>
                                            <td className="px-2 border bg-slate-600 text-center min-w-[410px]">Title</td>
                                            <td className="px-2 border bg-slate-600">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            curriculums.map((data, i) => {
                                                return (
                                                    <tr>
                                                        <td className="px-2 border">{i + 1}.</td>
                                                        <td className="px-2 border">
                                                            <div>
                                                                <p className="mb-3 font-semibold">{data.name}</p>
                                                                <p>{data.description}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-2 border text-center">
                                                            <span onClick={() => {
                                                                curriculums.splice(i, 1);
                                                                setCurriculums([...curriculums]);
                                                            }}>X</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div> : null
                        }
                        {
                            page === 4 ? <div>
                                <div className="mb-3">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-5 max-w-[300px]">
                                            <p className="font-semibold">{name}</p>
                                            <div className="border rounded-full p-2">
                                                <p className="text-sm">{isPrivate === 'true' ? "Private" : "Public"}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-red-600">Rp. {price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 mb-5">
                                    {
                                        category.map((data) => {
                                            return (
                                                <div className="rounded-full py-1 px-3 bg-slate-400">
                                                    <p className="capitalize text-xs text-white">
                                                        {data.label}
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="mb-5">
                                    <p className="text-sm">{description}</p>
                                </div>
                                <div className="mb-10">
                                    <div className="grid grid-cols-4">
                                        <div>
                                            <p className="font-semibold">Open Regis</p>
                                            <p className="text-sm">{openRegis ? openRegis : 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Close Regis</p>
                                            <p className="text-sm">{closeRegis ? closeRegis : 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Class Start</p>
                                            <p className="text-sm">{startClass ? startClass : 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Duration</p>
                                            <p className="text-sm">{duration ? `${duration} ${durationType}` : 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <div className="grid grid-cols-4">
                                        <div>
                                            <p className="font-semibold">Class Type</p>
                                            <p className="text-sm capitalize">{classType}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Class Private</p>
                                            <p className="text-sm">{isPrivate === 'true' ? 'Private' : 'Public'}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Class Location</p>
                                            <p className="text-sm">{location ? location === 'same' ? 'Same as vocation' : 'Different' : 'Online'}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Max Student</p>
                                            <p className="text-sm">{maxPerson}</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    classType === 'offline' && location === 'different' ? <div>
                                        <div className="mb-10">
                                            <div className="flex gap-5">
                                                <div>
                                                    <p className="font-semibold">Complete Address</p>
                                                    <p className="text-sm capitalize">{completeAddress}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : null
                                }
                                <div className="mb-10">
                                    <p className="pt-17 mb-3 font-semibold">Curriculums</p>
                                    {
                                        curriculums.map((data, i) => {
                                            return (
                                                <div className="flex gap-5 items-center">
                                                    <p className="px-2">{i + 1}.</p>
                                                    <div className="px-2">
                                                        <div>
                                                            <p className="mb-3 font-semibold">{data.name}</p>
                                                            <p>{data.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <p className="pt-17 mb-3 font-semibold">Requirement</p>
                                    {
                                        requirements.map((data, i) => {
                                            return (
                                                <div className="flex gap-5 items-center">
                                                    <p className="px-2">{i + 1}.</p>
                                                    <div className="px-2">
                                                        <div>
                                                            <p className="">{data.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div> : null
                        }
                    </div>
                    <TextButton
                        title={
                            loading ? "Loading..." : page === pageLimit ? 'Submit' : 'Next'
                        }
                        onClick={loading ? null : () => {
                            page === pageLimit ?
                                submit() : changePage({ page: page + 1 })
                        }}
                        disable={loading}
                    />
                    <div
                        className="items-center py-3 text-center"
                        onClick={() => {
                            page === 0 ?
                                onClick() : changePage({ page: page - 1 })
                        }}
                    >
                        <div
                            className={`cursor-pointer px-4 py-2 bg-[transparent] text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-[transparent] focus:outline-none focus:ring-2 focus:ring-[transparent]`}
                        >
                            <p>
                                {
                                    page === 0 ? 'Close' : 'Back'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <LoadingModal open={loading} />
        </div>
    );
}

export default ClassCreateUpdateModal;
