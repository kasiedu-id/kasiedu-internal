import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../../components/Loadings";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../../components/Fields/InputField";
import { DropdownMultiField } from "../../../../components/Fields/DropdownMulti";
import GeneralButton from "../../../../components/Buttons/GeneralButton";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import validation from '../../../../validations'
import { createLov, getGroupList, getLovDetail } from "../../../../configs/api/services/public";

function SupportFormPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("create");
    const [searchParams, setSearchParams] = useSearchParams();

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [category, setCategory] = useState(null);
    const [language, setLanguage] = useState(null);

    const [error, setError] = useState({
        name: false,
        value: false,
        category: false,
        language: false,
    });

    const [categories, setCategories] = useState([]);
    const languages = [{ name: 'ID', value: 'id' }, { name: "EN", value: 'en' }];

    async function getAllSupportType() {
        const res = await getGroupList();

        const formatted = res.map((data) => ({ ...data, value: data?.category, name: data?.category?.replace(/-/g, ' ') }));

        setCategories(formatted);
    }

    async function initial() {
        if (searchParams.get("section")) {
            setType(searchParams.get("section"));

            if (searchParams.get("section") !== 'detail') {
                getAllSupportType();
            }
        }

        if (searchParams.get("section") !== 'create') {
            if (searchParams.get("id")) {
                const res = await getLovDetail({ id: searchParams.get("id") });

                if (searchParams.get("section") === 'detail') {
                    setCategories([{ value: res.category, name: res.category?.replace(/-/g, ' ') }]);
                }

                setCategory({ value: res.category, name: res.category?.replace(/-/g, ' ') });
                setName(res.name);
                setValue(res.value);
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
                value: false,
                category: false,
                language: false,
            });

            await validation.createLovSchema.validate({
                name,
                value,
                category: category?.value,
                language: language?.value,
            },
                // AbortEarly True => nanti saat nemu error langsung lempar ke error, kalau false, dia akan tunggu sampai semua field ke check
                { abortEarly: false }
            );

            console.log('sini');

            await createLov({
                name,
                value,
                category: category?.value,
                language: language?.value,
            });

            toast('Success add new list of value');
            navigate('/list-of-values/list?page=1&limit=25')
        } catch (error) {
            console.log(error);
            if (error.name === 'ValidationError') {
                let section = {
                    name: false,
                    value: false,
                    category: false,
                    language: false,
                };

                // Check Each Field for error
                error.errors.forEach((data) => {
                    if (data.toLowerCase().includes('name')) section = { ...section, name: true };
                    if (data.toLowerCase().includes('value')) section = { ...section, value: true };
                    if (data.toLowerCase().includes('category')) section = { ...section, category: true };
                    if (data.toLowerCase().includes('language')) section = { ...section, language: true };
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
                <h1 className="text-xl font-semibold mb-6">Pembuatan Akun Internal</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                    <InputSingleField disable={type === "detail" ? true : false} error={error.name} label={"Nama"} labelWeight={600} required={true} value={name} onChange={(e) => { setName(e.target.value); setValue(e.target.value.replace(/ /g, '-').toLowerCase())}} />
                    <InputSingleField disable={type === "detail" ? true : false} error={error.value} label={"Value"} labelWeight={600} required={true} value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                    <DropdownMultiField disabled={type === "detail" ? true : false} error={error.category} label={"Kategori"} required={true} keyValue={"value"} keyLabel={"name"} list={categories} labelWeight={600} value={category} onDropdownItemClick={(e) => setCategory(e)} />
                    <DropdownMultiField label={"Bahasa"} keyValue={"value"} error={error.language} keyLabel={"name"} list={languages} labelWeight={600} value={language} onDropdownItemClick={(e) => setLanguage(e)} />
                </div>
                <div className="mt-8">
                    <GeneralButton title={type === 'detail' ? "Back" : "Submit"} onClick={() => type === 'detail' ? navigate(-1) : submit()} disable={loading} icon={type === 'detail' ? null : <MdOutlineCheckCircleOutline color={"white"} size={20} />} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default SupportFormPage;
