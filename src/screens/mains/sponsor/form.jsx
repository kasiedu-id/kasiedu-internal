import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/Fields/InputField";
import { DropdownMultiField } from "../../../components/Fields/DropdownMulti";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { TextAreaField } from "../../../components/Fields/TextAreaField";
import { getInsitutes } from "../../../configs/api/services/institute";
import { createSponsor, getSponsorDetail, updateSponsor } from "../../../configs/api/services/sponsor";
import { removeStripNumber, thousandSeparator } from "../../../utils/PriceFormatter";

function SponsorFormPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("create");
    const [searchParams] = useSearchParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [maxParticipant, setMaxParticipant] = useState("");
    const [owner, setOwner] = useState(null);
    const [sponsorType, setSponsorType] = useState(null);
    const [partialSupport, setPartialSupport] = useState(null);
    const [isInstant, setIsInstant] = useState(null);
    const [sponsorActivityType, setSponsorActivityType] = useState(null);
    const [requirement, setRequirement] = useState("");

    const [list, setList] = useState([]);

    async function submit() {
        try {
            setLoading(true);

            if (type === "create") {
                await createSponsor({
                    name,
                    description,
                    isInstant: isInstant.value,
                    maxParticipant: Number(maxParticipant),
                    requirement,
                    requirementType: 'TEXT',
                    partialSupport: partialSupport.value,
                    category: sponsorActivityType.value,
                    owner: owner.id,
                    value,
                    valueType: sponsorType.value,
                })
            } else {
                await updateSponsor({
                    id: searchParams.get('id'),
                    name,
                    description,
                    isInstant: isInstant.value,
                    maxParticipant: Number(maxParticipant),
                    requirement,
                    requirementType: 'TEXT',
                    partialSupport: partialSupport.value,
                    category: sponsorActivityType.value,
                    owner: owner.id,
                    value,
                    valueType: sponsorType.value,
                })
            }

            toast(`Success ${type} sponsor`);
            navigate('/sponsors/list');

        } catch (error) {
            if (error.name === 'ValidationError') {
                
            } else {
                toast(error.message)
            }
        } finally {
            setLoading(false);
        }
    }

    async function initial() {
        const resSponsor = await getInsitutes({ page: 1, limit: 200, name: '' });

        setList(resSponsor.list);

        if (searchParams.get("section")) {
            setType(searchParams.get("section"));
        }

        if (searchParams.get("section") !== 'create') {
            if (searchParams.get("id")) {
                const res = await getSponsorDetail({ id: searchParams.get("id") });

                let ownerIdx = null;

                if(res.ownerId) {
                    ownerIdx = resSponsor.list.findIndex((x) => x.id === res.ownerId);
                }

                setName(res.name);
                setDescription(res.description);
                setIsInstant({ label: res.isInstant ? 'Yes' : 'No', value: res.isInstant});
                setPartialSupport({ label: res.partialSupport ? 'Yes' : 'No', value: res.partialSupport});
                setMaxParticipant(res.maxParticipant);
                setRequirement(res.requirement);
                setSponsorActivityType({ label: res.category, value: res.category });
                setValue(res.value);
                setSponsorType({ label: res.sponsorType, value: res.sponsorType });
                setOwner(resSponsor.list[ownerIdx]);
            }
        }
    }

    useEffect(() => {
        initial();
    }, [])

    return (
        <div>
            <div className="border bg-white rounded p-4 w-full ">
                <h1 className="text-xl font-semibold mb-6">Form Sponsor</h1>
                <InputSingleField
                    label={"Nama"}
                    value={name}
                    type={"text"}
                    placeholder={""}
                    required={true}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="my-4">
                    <TextAreaField label={"Deskripsi"} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <InputSingleField
                    label={"Sponsor Value"}
                    value={value}
                    type={"text"}
                    placeholder={""}
                    required={true}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className="mt-4">
                    <InputSingleField
                        label={"Max Peserta"}
                        value={maxParticipant}
                        type={"number"}
                        placeholder={""}
                        required={true}
                        onChange={(e) => setMaxParticipant(e.target.value)}
                    />
                </div>
                <DropdownMultiField
                    label={"Pemilik Sponsor"}
                    value={owner}
                    keyValue={"id"}
                    keyLabel={"name"}
                    list={list}
                    placeholder={""}
                    onDropdownItemClick={(e) => {
                        setOwner(e);
                    }}
                />
                <div className="my-4 grid grid-cols-1 gap-4 justify-between">
                    <DropdownMultiField
                        label={"Tipe"}
                        value={sponsorType}
                        keyValue={"value"}
                        keyLabel={"label"}
                        list={[
                            {
                                label: 'PRODUCT',
                                value: 'PRODUCT'
                            },
                            {
                                label: 'AMOUNT',
                                value: 'AMOUNT'
                            },
                            {
                                label: 'PERCENTAGE',
                                value: 'PERCENTAGE'
                            },
                        ]}
                        placeholder={"Tipe Sponsor"}
                        onDropdownItemClick={(e) => {
                            setSponsorType(e);
                        }}
                    />
                    <DropdownMultiField
                        label={"Pembiayaan Partial"}
                        value={partialSupport}
                        keyValue={"value"}
                        keyLabel={"label"}
                        list={[
                            {
                                label: 'Yes',
                                value: true
                            },
                            {
                                label: 'No',
                                value: false
                            },
                        ]}
                        placeholder={"Pekerjaan"}
                        onDropdownItemClick={(e) => setPartialSupport(e)}
                    />
                </div>
                <div className="mt-4">
                    <TextAreaField
                        label={"Persyaratan"}
                        value={requirement}
                        type={"text"}
                        placeholder={""}
                        required={false}
                        onChange={(e) => setRequirement(e.target.value)}
                    />
                </div>
                <div className="my-4 grid grid-cols-1 gap-4 justify-between">
                    <DropdownMultiField
                        label={"Seleksi Instant?"}
                        value={isInstant}
                        keyValue={"value"}
                        keyLabel={"label"}
                        list={[
                            {
                                label: 'Yes',
                                value: true
                            },
                            {
                                label: 'No',
                                value: false
                            },
                        ]}
                        placeholder={"Pilih tipe Instant"}
                        onDropdownItemClick={(e) => setIsInstant(e)}
                    />
                    <DropdownMultiField
                        label={"Jenis Kegiatan Sponsor"}
                        value={sponsorActivityType}
                        keyValue={"value"}
                        keyLabel={"label"}
                        list={[
                            {
                                label: 'CSR',
                                value: 'CSR'
                            },
                            {
                                label: 'CRM',
                                value: 'CRM'
                            },
                            {
                                label: 'Other',
                                value: 'OTHER'
                            },
                        ]}
                        placeholder={"Kegiatan Sponsor"}
                        onDropdownItemClick={(e) => setSponsorActivityType(e)}
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

export default SponsorFormPage;
