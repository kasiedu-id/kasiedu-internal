import { useEffect, useState } from "react";
import { InputSingleField } from "../../Field/InputField";
import { TextAreaField } from "../../Field/TextAreaField";
import { DropdownField } from "../../Field/DropdownField";
import { getCityByProvince, getProvince, getVocationDetail, updateVocation } from "../../../../config/api/services";
import { toast } from "react-toastify";
import TextButton from "../../Button/TextButton";
import BaseModal from "../BaseModal";
import Button from "../../Button/Button";

function UpdateDetail({ onModified, vocationId, popup, moveTab, tab }) {
    // Detail
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [completeAddress, setCompleteAddress] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [cpName, setCpName] = useState('');
    const [cpPhone, setCpPhone] = useState('');
    const [cpEmail, setCpEmail] = useState('');

    // Data
    const [loading, setLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    async function fetchProvince() {
        try {
            let res = await getProvince();

            setProvinces(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchCity({ provinceCode }) {
        try {
            let res = await getCityByProvince({ provinceCode });

            setCities(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function initialize() {
        try {
            let res = await getVocationDetail({
                vocationId
            });

            await fetchCity({ provinceCode: res?.location.codeProvince })

            setName(res.name);
            setCpEmail(res.cpEmail);
            setCpName(res.cpName);
            setCpPhone(res.cpPhone);
            setDescription(res.description);
            setCompleteAddress(res.completeAddress);
            setProvince(res?.location.codeProvince);
            setCity(res?.location?.id);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function submit() {
        try {
            setLoading(true);

            await updateVocation({
                addressId: city,
                vocationName: name,
                description,
                completeAddress,
                cpName,
                cpEmail,
                cpPhone,
                vocationId
            });

            toast('Success update vocation detail');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast(error?.message);
        }
    }


    useEffect(() => {
        if (tab === 'detail') {
            if (provinces.length < 1) {
                fetchProvince();
            }
            initialize();
        }
    }, [tab]);


    return (
        <div className={`py-5 max-h-[85vh] overflow-auto ${tab === "detail" ? "block" : "hidden"}`}>
            <div className="mb-3">
                <InputSingleField
                    required={false}
                    placeholder={"Top One"}
                    type={"text"}
                    textColor={"black"}
                    label={"Name"}
                    value={name}
                    onChange={(e) => {
                        onModified(true);
                        setName(e.target.value)
                    }}
                />
            </div>
            <div className="mb-3">
                <TextAreaField
                    label={"Description"}
                    value={description}
                    textColor={"black"}
                    onChange={(e) => {
                        onModified(true);
                        setDescription(e.target.value)
                    }}
                />
            </div>
            <div className="mb-3">
                <TextAreaField
                    label={"Complete Address"}
                    value={completeAddress}
                    textColor={"black"}
                    onChange={(e) => {
                        onModified(true);
                        setCompleteAddress(e.target.value)
                    }}
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
                            setCity('');
                            fetchCity({ provinceCode: e.target.value });
                            onModified(true);
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
                            onModified(true);
                        }}
                    />
                </div>
            </div>
            <div className="mb-3">
                <InputSingleField
                    label={"Name PIC"}
                    value={cpName}
                    textColor={"black"}
                    onChange={(e) => {
                        setCpName(e.target.value)
                        onModified(true);
                    }}
                />
            </div>
            <div className="mb-3">
                <InputSingleField
                    label={"Email PIC"}
                    value={cpEmail}
                    textColor={"black"}
                    onChange={(e) => {
                        onModified(true);
                        setCpEmail(e.target.value)
                    }}
                />
                <p className="text-gray-400 text-xs">*Email PIC ini tidak berhubungan dengan email account</p>
            </div>
            <div className="mb-5">
                <InputSingleField
                    label={"Phone PIC"}
                    value={cpPhone}
                    textColor={"black"}
                    onChange={(e) => {
                        onModified(true);
                        setCpPhone(e.target.value)
                    }}
                />
            </div>
            <TextButton disable={loading} onClick={() => submit()} title="Update" />

            <BaseModal open={popup}>
                <div className="py-3 px-5">
                    <p className="font-semibold text-lg text-center">Delete modification field</p>
                    <p className="text-center">Are you sure to change tab ? There a modification on the field.</p>
                    <div className="flex gap-5 justify-center items-center mt-4">
                        <Button title="Stay" onClick={() => moveTab(false)} disable={false} bgColor="bg-red-500" styles="" />
                        <Button title="Continue" onClick={() => moveTab(true)} disable={false} bgColor="" styles="" />
                    </div>
                </div>
            </BaseModal>
        </div>
    );
}

export default UpdateDetail;
