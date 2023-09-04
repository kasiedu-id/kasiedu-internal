import { useEffect, useState } from "react";
import { HttpDelete, HttpGet, HttpPost } from "../../../../config/api";
import { toast } from "react-toastify";
import TextButton from "../../Button/TextButton";
import { InputSingleField } from "../../Field/InputField";
import { DropdownField } from "../../Field/DropdownField";

function AddSponsorModal({ open, onClick, id }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountType, setDiscountType] = useState("");
    const [isPartial, setIsPartial] = useState("");
    const [type, setType] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [requirement, setRequirement] = useState("");
    const [brands, setBrands] = useState([]);
    const [data, setData] = useState([]);

    async function submit() {
        try {
            await HttpPost(`internal/sponsors/${id}`, {
                classId: id,
                brandId: brand,
                maxCapacity,
                name,
                description,
                discount,
                discountType,
                isPartial,
                requirement,
                type,
            }, null)

            await fetchDetail();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function remove({
        id
    }) {
        try {
            await HttpDelete(`internal/sponsors/${id}`, null);

            fetchDetail();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchDetail() {
        try {
            const res = await HttpGet(`sponsors/class/${id}`, null);

            setData(res);
            setName("");
            setDescription("");
            setDiscount("");
            setDiscountType("");
            setIsPartial("");
            setBrand("");
            setDiscountType("");
            setType("");
            setRequirement("");
            setMaxCapacity("");
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchSponsor() {
        try {
            const res = await HttpPost(`brands`, {
                limit: 10,
                page: 0,
                name: "",
                method: "all"
            }, null);

            setBrands(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        if (open) {
            fetchSponsor();
            fetchDetail();
        }
    }, [open]);

    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        >
            <div className="relative mx-auto p-5 border w-[90%] max-w-[550px] shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
                        Upload Class Sponsor
                    </h3>
                    <div className="mt-2 px-4 py-3">
                        <p className="text-sm text-gray-500 text-center">
                            Please upload Class Sponsor information below:
                        </p>
                    </div>
                    <div className="my-4 text-black">
                        <div className="mb-3 flex items-end gap-5">
                            <div className="w-full">
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Name"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Description"}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Max Capacity"}
                                    value={maxCapacity}
                                    onChange={(e) => setMaxCapacity(e.target.value)}
                                />
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Requirement"}
                                    value={requirement}
                                    onChange={(e) => setRequirement(e.target.value)}
                                />
                                <InputSingleField
                                    required={false}
                                    placeholder={""}
                                    type={"text"}
                                    textColor={"black"}
                                    label={"Discount"}
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                                <DropdownField
                                    colorLabel={"black"}
                                    label={"Discount Type"}
                                    collectionList={[
                                        {
                                            label: "Percentage",
                                            value: "percentage"
                                        },
                                        {
                                            label: "Amount",
                                            value: "amount"
                                        }
                                    ]}
                                    keyField={"value"}
                                    valueField={"value"}
                                    labelField={"label"}
                                    value={discountType}
                                    placeholder="Discount Type"
                                    onChange={(e) => setDiscountType(e.target.value)}
                                />
                                <DropdownField
                                    colorLabel={"black"}
                                    label={"Brand"}
                                    collectionList={brands}
                                    keyField={"id"}
                                    valueField={"id"}
                                    labelField={"name"}
                                    value={brand}
                                    placeholder="Brand"
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                                <DropdownField
                                    colorLabel={"black"}
                                    label={"Is Partial"}
                                    collectionList={[
                                        {
                                            label: "Yes",
                                            value: true
                                        },
                                        {
                                            label: "No",
                                            value: false
                                        }
                                    ]}
                                    keyField={"value"}
                                    valueField={"value"}
                                    labelField={"label"}
                                    value={isPartial}
                                    placeholder="Partial"
                                    onChange={(e) => setIsPartial(e.target.value)}
                                />
                                <DropdownField
                                    colorLabel={"black"}
                                    label={"Sponsor Process"}
                                    collectionList={[
                                        {
                                            label: "Instant",
                                            value: "instant"
                                        },
                                        {
                                            label: "No Instant",
                                            value: "no-instant"
                                        }
                                    ]}
                                    keyField={"value"}
                                    valueField={"value"}
                                    labelField={"label"}
                                    value={type}
                                    placeholder="Sponsor Process"
                                    onChange={(e) => setType(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextButton
                                    onClick={() => submit()}
                                    title="Add"
                                    disable={false}
                                />
                            </div>
                        </div>
                        <p className="pt-17 mb-3 font-semibold">List Sponsor</p>
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
                                    data.length > 0 && data?.map((data, i) => {
                                        return (
                                            <tr key={data.id}>
                                                <td className="px-2 border">{i + 1}.</td>
                                                <td className="px-2 border">
                                                    <div>
                                                        <p className="mb-3 font-semibold">{data?.name}</p>
                                                        <p className="mb-1">Schollarship: {data?.discount} {data?.discountType}</p>
                                                        <p className="mb-1">Capacity: {data?.maxCapacity}</p>
                                                        <p className="mb-1">Process: {data?.type}</p>
                                                    </div>
                                                </td>
                                                <td className="px-2 border text-center">
                                                    <span onClick={() => {
                                                        remove({
                                                            id: data.id
                                                        })
                                                    }}>X</span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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

export default AddSponsorModal;
