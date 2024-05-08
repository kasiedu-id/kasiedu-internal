import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/Fields/InputField";
import { DropdownMultiField } from "../../../components/Fields/DropdownMulti";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { getAddress, getGroupData } from "../../../configs/api/services/public";
import { createUser, getUserDetail, updateUser } from "../../../configs/api/services/user";
import moment from "moment";

function UserFormPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("create");
    const [searchParams] = useSearchParams();

    const [name, setName] = useState("");
    const [bod, setBod] = useState("");
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [gender, setGender] = useState(null);
    const [occupation, setOccupation] = useState(null);
    const [occupationName, setOccupationName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [genders, setGenders] = useState([]);
    const [occupations, setOccupations] = useState([]);

    const [error, setError] = useState({
        name: false,
        bod: false,
        province: false,
        city: false,
        gender: false,
        occupation: false,
        occupationName: false,
        email: false,
        phone: false,
    });

    async function submit() {
        try {
            setLoading(true);
            setError({
                name: false,
                bod: false,
                province: false,
                city: false,
                gender: false,
                occupation: false,
                occupationName: false,
                email: false,
                phone: false,
            });

            if (type === "create") {
                await createUser({
                    email,
                    name,
                    phoneNumber: phone,
                    dob: moment(bod).utc(),
                    occupation: occupation.value,
                    occupationName: occupationName,
                    cityId: city.id,
                    gender: gender.value,
                });
            } else {
                await updateUser({
                    id: searchParams.get('id'),
                    email,
                    name,
                    phoneNumber: phone,
                    dob: moment(bod).utc(),
                    occupation: occupation.value,
                    occupationName: occupationName,
                    cityId: city.id,
                    gender: gender.value,
                })
            }

            toast(`Success ${type} user`);
            navigate('/users/list');

        } catch (error) {
            if (error.name === 'ValidationError') {
                let section = {
                    name: false,
                    bod: false,
                    province: false,
                    city: false,
                    gender: false,
                    occupation: false,
                    occupationName: false,
                    email: false,
                    phone: false,
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
        const resProvince = await getAddress({ code: "" });
        const resGender = await getGroupData({ group: "gender" });
        const resOccupation = await getGroupData({ group: "occupation" });

        if (searchParams.get("section")) {
            setType(searchParams.get("section"));
            setProvinces(resProvince?.data);
            setGenders(resGender?.data);
            setOccupations(resOccupation?.data);
            setProvinces(resProv);
        }

        if (searchParams.get("section") !== 'create') {
            if (searchParams.get("id")) {
                const res = await getUserDetail({ id: searchParams.get("id") });

                const selectedProvince = res.information.location ? resProv.findIndex((data) => data?.codeProvince === res.information.location?.codeProvince) : null;

                const resCities = res.information.location ? await getAddress({ code: res.information.location.codeProvince }) : [];

                const occupationIdx = res.information?.occupation ? resOccupation?.data.findIndex((data) => data?.value === res.information?.occupation) : null;

                const genderIdx = res.information?.gender ? resGender?.data.findIndex((data) => data?.value === res.information?.gender) : null;

                console.log(res);

                setName(res.information.name);
                setGender(res.information?.gender ? resGender?.data[genderIdx] : null)
                setEmail(res.email);
                setPhone(res?.phone);
                setOccupation(res.information?.occupation ? resOccupation?.data[occupationIdx] : null)
                setOccupationName(res?.information?.occupationName || '')
                setCities(resCities);
                setCity(res.information.location);
                setProvince(res.information.location ? resProv[selectedProvince] : null);
                setBod(moment(res.information.dob).utc(true).format("YYYY-MM-DD"));
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
                <h1 className="text-xl font-semibold mb-6">Form User</h1>
                <InputSingleField
                    label={"Nama"}
                    value={name}
                    type={"text"}
                    placeholder={""}
                    required={true}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="my-4">
                    <InputSingleField
                        label={"Tanggal Lahir"}
                        value={bod}
                        type={"date"}
                        placeholder={""}
                        required={true}
                        onChange={(e) => setBod(e.target.value)}
                    />
                </div>
                <InputSingleField
                    label={"Email"}
                    value={email}
                    type={"email"}
                    placeholder={""}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mt-4">
                    <InputSingleField
                        label={"Telepon"}
                        value={phone}
                        type={"phone"}
                        placeholder={""}
                        required={true}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="my-4 grid grid-cols-1 gap-4 justify-between">
                    <DropdownMultiField
                        label={"Jenis Kelamin"}
                        value={gender}
                        keyValue={"value"}
                        keyLabel={"nameId"}
                        list={genders}
                        placeholder={"Jenis Kelamin"}
                        onDropdownItemClick={(e) => {
                            setGender(e);
                        }}
                    />
                    <DropdownMultiField
                        label={"Pekerjaan"}
                        value={occupation}
                        keyValue={"value"}
                        keyLabel={"nameId"}
                        list={occupations}
                        placeholder={"Pekerjaan"}
                        onDropdownItemClick={(e) => setOccupation(e)}
                    />
                </div>
                <div className="mt-4">
                    <InputSingleField
                        label={"Nama Sekolah / Perusahaan"}
                        value={occupationName}
                        type={"text"}
                        placeholder={""}
                        required={false}
                        onChange={(e) => setOccupationName(e.target.value)}
                    />
                </div>
                <div className="my-4 grid grid-cols-1 gap-4 justify-between">
                    <DropdownMultiField
                        label={"Pronvisi"}
                        value={province}
                        keyValue={"id"}
                        keyLabel={"provinceName"}
                        list={provinces}
                        placeholder={"Provinsi"}
                        onDropdownItemClick={(e) => {
                            setProvince(e);
                            getCities({
                                codeProvince: e.codeProvince
                            })
                        }}
                    />
                    <DropdownMultiField
                        label={"Kota"}
                        value={city}
                        keyValue={"id"}
                        keyLabel={"cityName"}
                        list={cities}
                        placeholder={"Kota"}
                        onDropdownItemClick={(e) => setCity(e)}
                    />
                </div>

                <div className="mt-8">
                    <GeneralButton title={"Submit"} onClick={() => submit()} loading={loading} disable={type ? false : loading ? loading : true} icon={<MdOutlineCheckCircleOutline color={"white"} size={20} />} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default UserFormPage;
