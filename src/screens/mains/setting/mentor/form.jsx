import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../../components/Loadings";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../../components/Fields/InputField";
import GeneralButton from "../../../../components/Buttons/GeneralButton";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { AiOutlineFileImage } from 'react-icons/ai';
import validation from '../../../../validations'
import { createMentors, getMentorDetail, updateMentors } from "../../../../configs/api/services/mentor";
import { uploadFile } from "../../../../configs/api/services/public";

function MentorFormPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("create");
    const [searchParams] = useSearchParams();
    const [detail, setDetail] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [title, setTitle] = useState('');
    const [profile, setProfile] = useState(null);

    const [error, setError] = useState({
        name: false,
        email: false,
        phone: false,
        title: false,
        profile: false,
    });

    async function initial() {
        if (searchParams.get("section")) {
            setType(searchParams.get("section"));
        }

        if (searchParams.get("section") !== 'create') {
            if (searchParams.get("id")) {
                const res = await getMentorDetail({ id: searchParams.get("id") });

                setEmail(res.email);
                setName(res.name);
                setPhone(res.phone);
                setTitle(res.title);
                setDetail(res);
            }
        }
    }

    useEffect(() => {
        initial();
    }, [])

    async function submit() {
        try {
            setLoading(true);

            setError({
                name: false,
                email: false,
                phone: false,
                title: false,
                profile: false,
            });

            const payload = new FormData();
            let res = null;

            if (type === 'create') {
                payload.append("profile", profile);

                res = await uploadFile(payload);
            } else if (type !== 'create') {
                if (profile) {
                    payload.append("profile", profile);

                    res = await uploadFile(payload);
                } else {
                    res = [{ URL: detail?.profile }]
                }
            }


            await validation.createMentor.validate({
                name,
                email,
                phone,
                title,
                profile: res[0].URL,
            },
                { abortEarly: false }
            );

            if (type === 'create') {
                await createMentors({
                    name,
                    email,
                    phone,
                    title,
                    profile: res[0].URL,
                });
            } else {
                await updateMentors({
                    id: searchParams.get("id"),
                    name,
                    email,
                    phone,
                    title,
                    profile: res[0].URL,
                })
            }

            toast(`Success ${type} mentor`);
            navigate('/mentors/list?page=1&limit=25')
        } catch (error) {
            console.log(error);
            if (error.name === 'ValidationError') {
                let section = {
                    name: false,
                    email: false,
                    phone: false,
                    title: false,
                    profile: false,
                };

                // Check Each Field for error
                error.errors.forEach((data) => {
                    if (data.toLowerCase().includes('name')) section = { ...section, name: true };
                    if (data.toLowerCase().includes('email')) section = { ...section, email: true };
                    if (data.toLowerCase().includes('phone')) section = { ...section, phone: true };
                    if (data.toLowerCase().includes('title')) section = { ...section, title: true };
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

    return (
        <div>
            <div className="border bg-white rounded p-4 w-full ">
                <h1 className="text-xl font-semibold mb-6">Mentor Form</h1>
                <div className="border h-[150px] w-[150px] mx-auto mb-5">
                    {detail ? profile ? (
                        <label
                            className="flex justify-center items-center h-[100%]"
                            htmlFor={`file-photo`}
                        >
                            <img
                                src={URL.createObjectURL(profile)}
                                style={{ width: "100%", height: "100%" }}
                                alt=""
                            />
                        </label>
                    ) : <label
                        className="flex justify-center items-center h-[100%]"
                        htmlFor={`file-photo`}
                    >
                        <img
                            src={detail.profile}
                            style={{ width: "100%", height: "100%" }}
                            alt=""
                        />
                    </label> : profile ? (
                        <label
                            className="flex justify-center items-center h-[100%]"
                            htmlFor={`file-photo`}
                        >
                            <img
                                src={URL.createObjectURL(profile)}
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
                        onChange={(e) => setProfile(e.target.files[0])}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                    <InputSingleField disable={loading} error={error.name} label={"Nama"} labelWeight={600} required={true} value={name} onChange={(e) => setName(e.target.value)} />
                    <InputSingleField disable={loading} error={error.email} label={"Email"} labelWeight={600} required={false} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                    <InputSingleField disable={loading} error={error.phone} label={"Phone"} labelWeight={600} required={false} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <InputSingleField disable={loading} error={error.title} label={"Title"} labelWeight={600} required={true} value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mt-8">
                    <GeneralButton title={"Submit"} onClick={() => submit()} disable={loading} icon={<MdOutlineCheckCircleOutline color={"white"} size={20} />} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default MentorFormPage;
