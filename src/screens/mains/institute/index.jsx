import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { InputSingleField } from "../../../components/Fields/InputField";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { MdOutlineSearch } from "react-icons/md";
import { toast } from "react-toastify";
import { getInsitutes } from "../../../configs/api/services/institute";
import EmptyStateButton from "../../../components/Buttons/EmptyButton";
import InstituteCard from "../../../components/Cards/InstituteCard";


function InstitutePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [name, setName] = useState('');

    async function initiate(){
        try {
            setLoading(true);

            const res = await getInsitutes({ 
                page: searchParams.get('page') || 1, 
                limit: searchParams.get('limit') || 20, 
                name: searchParams.get('name') || ''
            });

            setData(res?.list);
            setCount(res?.count);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        initiate();
    }, [])

    return (
        <>
            <div className="border bg-white rounded p-4 w-full mb-6">
                <div className="md:flex gap-5 items-center justify-between">
                    <div>
                        <div className="grid grid-cols-1 md:gap-x-4">
                            <InputSingleField placeholder={"Nama"} labelWeight={600} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <GeneralButton title={"Reset"} onClick={() => navigate(`/institutes/list?page=${1}&limit=${20}&name=`)} disable={loading} icon={null} />
                        <GeneralButton title={"Search"} onClick={() => navigate(`/institutes/list?page=${searchParams.get('page')}&limit=${searchParams.get('limit')}&name=${name || ''}`)} disable={loading} icon={<MdOutlineSearch color={"white"} size={20} />} />
                    </div>
                </div>
            </div>
            <div className={`min-h-[50vh] max-h-[80vh] w-full flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-2 ${data.length > 0 ? '' : 'justify-center items-center'}`}>
                {
                    data.length > 0 ? data.map((data) => <InstituteCard id={data.id} logo={data?.logo} name={data?.name} picName={data?.information?.picName} picPhone={data?.information?.picPhone}/>) : <EmptyStateButton label={"Data Institusi Kosong"} onClick={() => navigate('/institutes/form?section=create')} />
                }
            </div>
            {loading && <LoadingModal open={loading} />}
        </>
    );
}

export default InstitutePage;
