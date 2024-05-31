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
import { getAddress, uploadFile } from "../../../configs/api/services/public";
import { createInstitute, getInsituteDetail, updateInstitute } from "../../../configs/api/services/institute";

function InstituteFormPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("create");
    const [searchParams] = useSearchParams();
    const [detail, setDetail] = useState(null);

    const [instituteName, setInstituteName] = useState('');
    const [instituteDescription, setInstituteDescription] = useState('');
    const [logo, setLogo] = useState(null);
    const [picEmail, setPicEmail] = useState('');
    const [picPhone, setPicPhone] = useState('');
    const [picName, setPicName] = useState('');

    const [addressWork, setAddressWork] = useState('');
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [error, setError] = useState({
        instituteName: false,
        logo: false,
        picEmail: false,
        picPhone: false,
        picName: false,
        addressWork: false,
        province: false,
        city: false,
    });

    async function submit() {
        try {
            setLoading(true);
            setError({
                instituteName: false,
                logo: false,
                picEmail: false,
                picPhone: false,
                picName: false,
                addressWork: false,
                province: false,
                city: false,
            });

            const payload = new FormData();
            let res = null;

            if (type === 'create') {
                payload.append("logo", logo);

                res = await uploadFile(payload);
            } else if (type !== 'create') {
                if (logo) {
                    payload.append("logo", logo);

                    res = await uploadFile(payload);
                } else {
                    res = [{ URL: detail?.logo }]
                }
            }

            if (type === "create") {
                await createInstitute({
                    name: instituteName,
                    description: instituteDescription,
                    logo: res[0]?.URL,
                    picEmail,
                    picPhone,
                    picName,
                    completeAdress: addressWork,
                    locationId: city?.id,
                })
            } else {
                await updateInstitute({
                    id: searchParams.get('id'),
                    name: instituteName,
                    description: instituteDescription,
                    logo: res[0]?.URL,
                    picEmail,
                    picPhone,
                    picName,
                    completeAddress: addressWork,
                    locationId: city?.id,
                })
            }

            toast(`Success ${type} institute`);
            navigate('/institutes/list');

        } catch (error) {
            if (error.name === 'ValidationError') {
                let section = {
                    instituteName: false,
                    logo: false,
                    picEmail: false,
                    picPhone: false,
                    picName: false,
                    addressWork: false,
                    province: false,
                    city: false,
                };

                // Check Each Field for error
                error.errors.forEach((data) => {
                    if (data.toLowerCase().includes('institute')) section = { ...section, instituteName: true };
                    if (data.toLowerCase().includes('pic email')) section = { ...section, picEmail: true };
                    if (data.toLowerCase().includes('pic name')) section = { ...section, picName: true };
                    if (data.toLowerCase().includes('pic phone')) section = { ...section, picPhone: true };
                    if (data.toLowerCase().includes('address')) section = { ...section, addressWork: true };
                    if (data.toLowerCase().includes('province')) section = { ...section, province: true };
                    if (data.toLowerCase().includes('city')) section = { ...section, city: true };
                    if (data.toLowerCase().includes('logo')) section = { ...section, logo: true };
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
        const resProv = await getAddress({ code: '' });

        if (searchParams.get("section")) {
            setType(searchParams.get("section"));


            setProvinces(resProv);
        }

        if (searchParams.get("section") !== 'create') {
            if (searchParams.get("id")) {
                const res = await getInsituteDetail({ id: searchParams.get("id") });

                const selectedProvince = res.location ? resProv.findIndex((data) => data?.codeProvince === res.location?.codeProvince) : null;

                const resCities = res.location ? await getAddress({ code: res.location.codeProvince }) : []

                setPicName(res?.information?.picName);
                setPicEmail(res?.information?.picEmail);
                setPicPhone(res?.information?.picPhone);
                setCities(resCities);
                setCity(res.location);
                setProvince(res.location ? resProv[selectedProvince] : null);
                setAddressWork(res.address);
                setInstituteDescription(res.description);
                setInstituteName(res.name);
                setDetail(res);
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

    useEffect(() => {
        initial();
    }, [])

    return (
        <div>
            <div className="border bg-white rounded p-4 w-full ">
                <h1 className="text-xl font-semibold mb-6">Form Institute</h1>
                <div className="border h-[150px] w-[150px] mx-auto mb-5">
                    {detail ? logo ? (
                        <label
                            className="flex justify-center items-center h-[100%]"
                            htmlFor={`file-photo`}
                        >
                            <img
                                src={URL.createObjectURL(logo)}
                                style={{ width: "100%", height: "100%" }}
                                alt=""
                            />
                        </label>
                    ) : <label
                        className="flex justify-center items-center h-[100%]"
                        htmlFor={`file-photo`}
                    >
                        <img
                            src={detail.logo}
                            style={{ width: "100%", height: "100%" }}
                            alt=""
                        />
                    </label> : logo ? <label
                        className="flex justify-center items-center h-[100%]"
                        htmlFor={`file-photo`}
                    >
                        <img
                            src={URL.createObjectURL(logo)}
                            style={{ width: "100%", height: "100%" }}
                            alt=""
                        />
                    </label> : (
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
                        onChange={(e) => setLogo(e.target.files[0])}
                    />
                </div>
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Identitas Institusi</h1>
                    </div>
                    <div className="grid grid-cols-1">
                        <InputSingleField error={error.name} label={"Nama Institusi"} labelWeight={600} required value={instituteName} onChange={(e) => setInstituteName(e.target.value)} />
                        <TextAreaField required label={"Deskripsi"} labelWeight={600} value={instituteDescription} onChange={(e) => setInstituteDescription(e.target.value)} />
                    </div>
                </>
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Identitas PIC</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField error={error.name} label={"Nama"} labelWeight={600} required value={picName} onChange={(e) => setPicName(e.target.value)} />
                        <InputSingleField error={error.name} label={"Email"} labelWeight={600} required value={picEmail} onChange={(e) => setPicEmail(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <InputSingleField error={error.name} label={"Telepon"} labelWeight={600} required value={picPhone} onChange={(e) => setPicPhone(e.target.value)} />
                    </div>
                </>
                <>
                    <div className="border-b-[1px] border-b-gray-400 mb-3">
                        <h1 className="text-lg font-semibold mt-6 mb-3">Alamat Institusi</h1>
                    </div>
                    <TextAreaField required label={"Alamat Lengkap"} labelWeight={600} value={addressWork} onChange={(e) => setAddressWork(e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <DropdownMultiField error={error.type} label={"Provinsi"} required keyValue={"id"} keyLabel={"provinceName"} list={provinces} labelWeight={600} value={province} onDropdownItemClick={(e) => { getCities({ codeProvince: e.codeProvince }); setProvince(e) }} />
                        <DropdownMultiField error={error.type} label={"Kota"} required keyValue={"id"} keyLabel={"cityName"} list={cities} labelWeight={600} value={city} onDropdownItemClick={(e) => setCity(e)} />
                    </div>
                </>

                <div className="mt-8">
                    <GeneralButton title={"Submit"} onClick={() => submit()} loading={loading} disable={type ? false : loading ? loading : true} icon={<MdOutlineCheckCircleOutline color={"white"} size={20} />} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default InstituteFormPage;
