import { useEffect, useState } from "react";
import LoadingModal from "../../../../components/Loadings";
import { toast } from "react-toastify";
import { MdModeEditOutline, MdOutlineRemoveRedEye, MdOutlineSearch } from "react-icons/md";
import { getAllLov, getGroupList } from "../../../../configs/api/services/public";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DropdownMultiField } from "../../../../components/Fields/DropdownMulti";
import { InputSingleField } from "../../../../components/Fields/InputField";
import GeneralButton from "../../../../components/Buttons/GeneralButton";

function SupportPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [name, setName] = useState('');
    const [category, setCategory] = useState(null);
    const [language, setLanguage] = useState(null);

    const [supports, setSupports] = useState([]);
    const [categories, setCategories] = useState([]);
    const languages = [{ name: 'ID', value: 'id' }, { name: "EN", value: 'en' }];

    async function getListSupport() {
        try {
            setLoading(true);

            const res = await getAllLov({
                page: searchParams.get('page'),
                limit: searchParams.get('limit'),
                language: searchParams.get('lang') || '',
                name: searchParams.get('name') || '',
                category: searchParams.get('cat') || '',
            });

            setCategory(searchParams.get('cat') ? { value: searchParams.get('cat'), name: searchParams.get('cat').replace(/-/g, ' ') } : null);
            setLanguage(searchParams.get('lang') ? { value: searchParams.get('lang'), name: searchParams.get('lang').replace(/-/g, ' ').toUpperCase() } : null);
            setName(searchParams.get('name'));

            setSupports(res);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    async function getCategorySupport() {
        try {
            const res = await getGroupList();

            const formatted = res.map((data) => ({ ...data, value: data?.category, name: data?.category?.replace(/-/g, ' ') }));

            setCategories(formatted);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getListSupport();
        getCategorySupport();
    }, [searchParams]);

    return (
        <div>
            <div className="border bg-white rounded p-4 w-full mb-6">
                <div className="md:flex gap-5 items-center justify-between">
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:gap-x-4">
                            <InputSingleField placeholder={"Nama"} labelWeight={600} value={name} onChange={(e) => setName(e.target.value)} />
                            <DropdownMultiField placeholder={"Kategori"} keyValue={"value"} keyLabel={"name"} list={categories} labelWeight={600} value={category} onDropdownItemClick={(e) => setCategory(e)} />
                            <DropdownMultiField placeholder={"Bahasa"} keyValue={"value"} keyLabel={"name"} list={languages} labelWeight={600} value={language} onDropdownItemClick={(e) => setLanguage(e)} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <GeneralButton title={"Reset"} onClick={() => navigate(`/list-of-values/list?page=${1}&limit=${25}&name=&cat=&lang=`)} disable={loading} icon={null} />
                        <GeneralButton title={"Search"} onClick={() => navigate(`/list-of-values/list?page=${searchParams.get('page')}&limit=${searchParams.get('limit')}&name=${name || ''}&cat=${category ? category?.value : ''}&lang=${language ? language?.value : ''}`)} disable={loading} icon={<MdOutlineSearch color={"white"} size={20} />} />
                    </div>
                </div>
            </div>
            <div className="overflow-auto">
                <table className="table-auto min-w-full max-w-[1200px]">
                    <thead className="bg-gray-600">
                        <tr>
                            <th className="w-[25px] p-2 border-black border-[1px] text-white">No.</th>
                            <th className="w-[70px] p-2 border-black border-[1px] text-white">Name</th>
                            <th className="w-[70px] p-2 border-black border-[1px] text-white">Value</th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Category</th>
                            <th className="w-[20px] p-2 border-black border-[1px] text-white">Language</th>
                            <th className="w-[100px] p-2 border-black border-[1px] text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            supports.length > 0 ? supports.map((data, index) => {
                                return (<tr key={data.id}>
                                    <td className="text-center py-2 font-semibold border-gray-400 border-[1px]">{index + 1}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px] capitalize">{data?.name}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{data?.value}</td>
                                    <td className="px-3 py-2 capitalize border-gray-400 border-[1px]">{data?.category?.replace(/-/g, ' ')}</td>
                                    <td className="px-3 py-2 uppercase text-center border-gray-400 border-[1px]">{data?.language}</td>
                                    <td className="px-3py-2 border-gray-400 border-[1px] min-h-10">
                                        <div className="flex gap-5 justify-center items-center">
                                            <MdOutlineRemoveRedEye color={"black"} size={20} onClick={() => navigate(`/list-of-values/form?section=detail&id=${data?.id}`)} />
                                            <MdModeEditOutline color={"green"} size={20} onClick={() => navigate(`/list-of-values/form?section=update&id=${data?.id}`)} />
                                        </div>
                                    </td>
                                </tr>)
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default SupportPage;
