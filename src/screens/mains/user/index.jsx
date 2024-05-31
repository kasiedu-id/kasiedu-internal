import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { InputSingleField } from "../../../components/Fields/InputField";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { MdOutlineSearch } from "react-icons/md";
import { toast } from "react-toastify";
import EmptyStateButton from "../../../components/Buttons/EmptyButton";
import { getUsers } from "../../../configs/api/services/user";
import UserCard from "../../../components/Cards/UserCard";
import DeleteUserModal from "../../../components/Modal/General/DeleteUser";


function UserPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const [email, setEmail] = useState('');

    async function initiate() {
        try {
            setLoading(true);

            const res = await getUsers({
                page: searchParams.get('page') || 1,
                limit: searchParams.get('limit') || 20,
                email: searchParams.get('email') || ''
            });

            setData(res?.list);
            setCount(res?.count);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    async function reset() {
        const res = await getUsers({
            page: 1,
            limit: 20,
            email: ''
        });

        setData(res?.list);
        setCount(res?.count);

        navigate('/users/list?page=1&limit=20')
    }

    useEffect(() => {
        initiate();
    }, [searchParams])

    return (
        <>
            <div className="border bg-white rounded p-4 w-full mb-6">
                <div className="md:flex gap-5 items-center justify-between">
                    <div>
                        <div className="grid grid-cols-1 md:gap-x-4">
                            <InputSingleField placeholder={"Email"} labelWeight={600} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <GeneralButton title={"Reset"} onClick={() => navigate(`/users/list?page=${1}&limit=${20}&email=`)} disable={loading} icon={null} />
                        <GeneralButton title={"Search"} onClick={() => navigate(`/users/list?page=${searchParams.get('page')}&limit=${searchParams.get('limit')}&email=${email || ''}`)} disable={loading} icon={<MdOutlineSearch color={"white"} size={20} />} />
                    </div>
                </div>
            </div>
            <div className={`max-h-[80vh] w-full flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-2 ${data.length > 0 ? '' : 'justify-center items-center'}`}>
                {
                    data.length > 0 ? data.map((data) => <UserCard remove={() => { setShowDelete(true); setSelectedId(data.id) }} email={data.email} phone={data.phone} id={data.id} name={data.information.name} profile={data.information.profile} />) : <EmptyStateButton label={"Data User Kosong"} onClick={() => navigate('/users/form?section=create')} />
                }
            </div>
            {loading && <LoadingModal open={loading} />}
            {showDelete && <DeleteUserModal open={showDelete} id={selectedId} onClose={() => setShowDelete(false)} onSuccess={() => { setShowDelete(false); reset(); }} />}
        </>
    );
}

export default UserPage;
