import { useEffect, useState } from "react";
import { InputSingleField } from "../../Field/InputField";
import { DropdownField } from "../../Field/DropdownField";
import { addVocationSocmed, deleteVocationSocmed, getVocationSocmed } from "../../../../config/api/services";
import { toast } from "react-toastify";
import TextButton from "../../Button/TextButton";
import {BsTrash} from 'react-icons/bs'
import BaseModal from "../BaseModal";
import Button from "../../Button/Button";

function UpdateSocMed({ vocationId, tab }) {
    // Detail
    const [url, setUrl] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');


    // Data
    const [loading, setLoading] = useState(false);
    const [socialMedias, setSocialMedias] = useState([]);

    async function initialize() {
        try {
            let res = await getVocationSocmed({
                vocationId
            });

            setSocialMedias(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function removeData({id}) {
        try {
            await deleteVocationSocmed({id});

            const index = socialMedias.findIndex((e) => e.id === id);
            socialMedias.splice(index, 1);

            setId('');
        } catch (error) {
            toast(error?.message);
        }
    }

    async function addData() {
        try {
            setLoading(true);

            const res = await addVocationSocmed({
                vocationId,
                url,
                type
            });
            
            socialMedias.push(res?.data?.data);

            setType('');
            setUrl('');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast(error?.message);
        }
    }

    useEffect(() => {
        initialize();
    }, []);


    return (
        <div className={`py-5 max-h-[85vh] overflow-auto ${tab === "social media" ? "block" : "hidden"}`}>
            <div className="w-full mb-10">
                <div className="mb-3">
                    <InputSingleField
                        label={"Website / Social Media"}
                        value={url}
                        textColor={"black"}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <DropdownField
                        required={false}
                        label={"Social Media Type"}
                        value={type}
                        collectionList={[
                            {
                                label: 'Website',
                                value: 'website',
                            },
                            {
                                label: 'Instagram',
                                value: 'instagram',
                            },
                            {
                                label: 'Tiktok',
                                value: 'tiktok',
                            },
                            {
                                label: 'Facebook',
                                value: 'facebook',
                            },
                        ]}
                        valueField={"value"}
                        labelField={"label"}
                        placeholder={"Social Media Type"}
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                    />
                </div>
                <TextButton disable={loading} onClick={() => addData()} title="Add" />
            </div>
            <div>
                <p className="text-sm font-semibold mb-3">List Social Media</p>
                <div className="flex flex-col gap-5">
                    {
                        socialMedias.map((data) => {
                            return (
                                <div className="border rounded-lg border-gray-400 flex gap-5 p-3 items-center">
                                    <div className="w-full">
                                        <p className="capitalize">{data?.type}</p>
                                        <p className="capitalize">{data?.url}</p>
                                    </div>
                                    <BsTrash size={15} color="red" onClick={() => setId(data.id)} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <BaseModal open={id ? true : false}>
                <div className="py-3 px-5">
                    <p className="font-semibold text-lg text-center">Delete Social Media</p>
                    <p className="text-center">Are you sure to delete the social media ?</p>
                    <div className="flex gap-5 justify-center items-center mt-4">
                        <Button title="Stay" onClick={() => setId('')} disable={false} bgColor="bg-red-500" styles="" />
                        <Button title="Remove" onClick={() => removeData({id: id})} disable={false} bgColor="" styles="" />
                    </div>
                </div>
            </BaseModal>
        </div>
    );
}

export default UpdateSocMed;
