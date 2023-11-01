import { useEffect, useState } from "react";
import moment from 'moment';
import { toast } from "react-toastify";
import { DropdownField } from "../../Field/DropdownField";
import { getBrandAll } from "../../../../config/api/services/brand";
import SidebarModal from "../SidebarModal";
import { IconField } from "../../Field/IconField";
import { TextAreaField } from "../../Field/TextAreaField";
import { thousandSeparator } from "../../../../utils/ThousandSeparator";
import GeneralButton from "../../Button/GeneralButton";
import { BsCheck } from 'react-icons/bs';
import { createSponsor } from "../../../../config/api/services/sponsor";
import { getClasses } from "../../../../config/api/services/classes";
import LoadingModal from "../../Loading/Loading";

function CreateSponsorModal({ open, onAccept, onClose, id }) {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [vocationClass, setVocationClass] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountType, setDiscountType] = useState("");
    const [isPartial, setIsPartial] = useState("");
    const [type, setType] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [requirement, setRequirement] = useState("");
    const [brands, setBrands] = useState([]);
    const [classes, setClasses] = useState([]);

    async function submit() {
        try {
            setLoading(true);

            await createSponsor({
                classId: vocationClass,
                brandId: brand,
                maxCapacity: Number(maxCapacity),
                name,
                description,
                discount,
                discountType,
                isPartial: isPartial === 'true' ? true : false,
                requirement,
                type,
            });

            onAccept();
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchBrands() {
        try {
            const res = await getBrandAll();

            setBrands(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchClasses() {
        try {
            const res = await getClasses({
                page: 1,
                limit: 100,
                vocationId: '',
                name: '',
                code: '',
                categories: '',
                province: '',
                city: '',
                date: Math.ceil(moment().valueOf() / 1000).toString(),
            });

            setClasses(res.rows);
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        if (open) {
            fetchBrands();
            fetchClasses();
            setLoading(false);
        }
    }, [open]);

    return (
        <>
            <SidebarModal sidebarOpen={open} setSidebarOpen={onClose} label={"Create Sponsor"}>
                <div className="my-3 flex flex-cols gap-5">
                    <div className="w-full">
                        <IconField
                            placeholder={""}
                            type={"text"}
                            labelColor={""}
                            label={"Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextAreaField
                            labelColor={""}
                            labelWeight=""
                            label={"Description"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <IconField
                            placeholder={"10"}
                            type={"number"}
                            labelColor={""}
                            label={"Max Capacity"}
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(e.target.value)}
                        />
                        <TextAreaField
                            labelColor={""}
                            labelWeight=""
                            label={"Requirement"}
                            value={requirement}
                            onChange={(e) => setRequirement(e.target.value)}
                        />
                        <IconField
                            required={false}
                            placeholder={""}
                            type={"text"}
                            labelColor={""}
                            label={"Discount"}
                            value={thousandSeparator(discount)}
                            onChange={(e) => setDiscount(e.target.value.replace(/,/g, ''))}
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
                            label={"Class"}
                            collectionList={classes}
                            keyField={"id"}
                            valueField={"id"}
                            labelField={"name"}
                            value={vocationClass}
                            placeholder="Class"
                            onChange={(e) => setVocationClass(e.target.value)}
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
                        <GeneralButton
                            onClick={() => submit()}
                            title="Add"
                            disable={loading}
                            bgColor="bg-green-500"
                            textColor="text-white"
                            icon={<BsCheck color={'white'} size={20} />}
                        />
                    </div>
                </div>

            </SidebarModal>
            <LoadingModal open={loading} />
        </>
    );
}

export default CreateSponsorModal;
