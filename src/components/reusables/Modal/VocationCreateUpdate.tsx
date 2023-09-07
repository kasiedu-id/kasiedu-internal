import { useEffect, useState } from "react";
import { InputSingleField } from "../Field/InputField";
import { TextAreaField } from "../Field/TextAreaField";
import { HttpGet, HttpPost, HttpPut } from "../../../config/api";
import { toast } from "react-toastify";
import { DropdownField } from "../Field/DropdownField";
import { RadioField } from "../Field/RadioField";
import Select from "react-select";

function VocationCreateUpdateModal({ open, onClick, id, section }) {
    const [emailVocation, setEmailVocation] = useState("");
    const [vocationName, seVocationName] = useState("");
    const [vocationType, setVocationType] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [completeAddress, setCompleteAddress] = useState("");
    const [phoneFirst, setPhoneFirst] = useState("");
    const [phoneSecond, setPhoneSecond] = useState("");
    const [cpName, setCpName] = useState("");
    const [cpEmail, setCpEmail] = useState("");
    const [cpPhone, setCpPhone] = useState("");
    const [category, setCategory] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameAccount, setNameAccount] = useState("");

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const types = [
        {
            value: 'individual',
            name: "Individual"
        },
        {
            value: 'institute',
            name: "Institute"
        },
        {
            value: 'formal',
            name: "Formal"
        },
    ]


    async function submit() {
        try {
            if (section !== "update") {
                await HttpPost(`internal/vocations/`, {
                    addressId: city,
                    vocationName: vocationName,
                    vocationType: vocationType,
                    description: description,
                    emailVocation: emailVocation,
                    phoneFirst: phoneFirst,
                    phoneSecond: phoneSecond,
                    completeAddress: completeAddress,
                    cpName: cpEmail,
                    cpEmail: cpEmail,
                    cpPhone: cpPhone,
                    category: category.map((data) => data.value),
                    email: email,
                    password: password,
                    name: nameAccount
                }, null);
                toast("Success create a new brands");
            } else {
                await HttpPut(
                    `internal/brands/${id}`,
                    null,
                    null
                );
                toast("Success update a brands");
            }

            onClick();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchDetail() {
        try {
            let res = await HttpGet(`vocations/${id}`, null);

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

    function reset() {
        setDescription("");
    }

    function handleSelect(data) {
        setCategory(data);
    }

    useEffect(() => {
        if (section === "create") reset();
        else if (id) fetchDetail();

        fetchProvince();
        fetchCategory();
    }, [open]);

    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        >
            <div className="relative mx-auto p-5 border w-[90%] shadow-lg max-w-[550px] rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
                        Upload Vocation
                    </h3>
                    <div className="mt-2 px-4 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Please upload vocation information below:
                        </p>
                    </div>
                    <div className="mt-4 text-black">
                        <div className="mb-3">
                            <p className="font-bold text-lg">Vocation Detail</p>
                        </div>
                        <div className="mb-3">
                            <RadioField
                                flex={true}
                                textColor={"white"}
                                label={""}
                                collectionList={types}
                                valueKey={"value"}
                                labelKey={"name"}
                                value={vocationType}
                                onChange={(e) => setVocationType(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                required={false}
                                placeholder={"Top One"}
                                type={"text"}
                                textColor={"black"}
                                label={"Name"}
                                value={vocationName}
                                onChange={(e) => seVocationName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <TextAreaField
                                label={"Description"}
                                value={description}
                                textColor={"black"}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <p
                                className={`block tracking-wide text-black text-xs font-bold mb-2`}
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
                        <div className="mb-3">
                            <InputSingleField
                                label={"Email"}
                                value={emailVocation}
                                textColor={"black"}
                                onChange={(e) => setEmailVocation(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                label={"Phone 1"}
                                value={phoneFirst}
                                textColor={"black"}
                                onChange={(e) => setPhoneFirst(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                label={"Phone 2"}
                                value={phoneSecond}
                                textColor={"black"}
                                onChange={(e) => setPhoneSecond(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <TextAreaField
                                label={"Complete Address"}
                                value={completeAddress}
                                textColor={"black"}
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
                        <div className="mb-3 pt-5">
                            <p className="font-bold text-lg">Contact Person</p>
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                label={"Name"}
                                value={cpName}
                                textColor={"black"}
                                onChange={(e) => setCpName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                label={"Email"}
                                value={cpEmail}
                                textColor={"black"}
                                onChange={(e) => setCpEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                label={"Phone"}
                                value={cpPhone}
                                textColor={"black"}
                                onChange={(e) => setCpPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 pt-5">
                            <p className="font-bold text-lg">Account</p>
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                label={"Name"}
                                value={nameAccount}
                                textColor={"black"}
                                onChange={(e) => setNameAccount(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                label={"Email"}
                                value={email}
                                textColor={"black"}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <InputSingleField
                                label={"Password"}
                                value={password}
                                textColor={"black"}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        className="items-center mt-3 pt-3 text-center"
                        onClick={() => submit()}
                    >
                        <div
                            id="ok-btn"
                            className={`cursor-pointer px-4 py-2 bg-[#07638d] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#07638d] focus:outline-none focus:ring-2 focus:ring-[#07638d]`}
                        >
                            <p>Submit</p>
                        </div>
                    </div>
                    <div
                        className="items-center py-3 text-center"
                        onClick={() => onClick()}
                    >
                        <div
                            id={`section`}
                            className={`cursor-pointer px-4 py-2 bg-[transparent] text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-[transparent] focus:outline-none focus:ring-2 focus:ring-[transparent]`}
                        >
                            <p>Close</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VocationCreateUpdateModal;
