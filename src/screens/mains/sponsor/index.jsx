import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import EmptyStateButton from "../../../components/Buttons/EmptyButton";
import UserCard from "../../../components/Cards/UserCard";
import DeleteUserModal from "../../../components/Modal/General/DeleteUser";
import { getSponsor } from "../../../configs/api/services/sponsor";
import SponsorCard from "../../../components/Cards/SponsorCard";


function SponsorPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    async function initiate() {
        try {
            setLoading(true);

            const res = await getSponsor();

            setData(res);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    async function reset() {
        const res = await getSponsor();

        setData(res);

        navigate('/sponsors/list?page=1&limit=20')
    }

    useEffect(() => {
        initiate();
    }, [searchParams])

    return (
        <>
            <div className={`max-h-[80vh] w-full flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-2 ${data.length > 0 ? 'justify-start' : 'justify-center items-center'}`}>
                {
                    data.length > 0 ? data.map((data) => <SponsorCard id={data.id} name={data.name} owner={data.owner} sponsorType={data.sponsorType} value={data.value} remove={() => { setShowDelete(true); setSelectedId(data.id) }} />) : <EmptyStateButton label={"Data Sponsor Kosong"} onClick={() => navigate('/sponsors/form?section=create')} />
                }
            </div>
            {loading && <LoadingModal open={loading} />}
            {showDelete && <DeleteUserModal open={showDelete} id={selectedId} onClose={() => setShowDelete(false)} onSuccess={() => { setShowDelete(false); reset(); }} />}
        </>
    );
}

export default SponsorPage;
