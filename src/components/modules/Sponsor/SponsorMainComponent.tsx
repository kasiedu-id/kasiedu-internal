import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../utils/query";
import GeneralButton from "../../reusables/Button/GeneralButton";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IconField } from "../../reusables/Field/IconField";
import TextButton from "../../reusables/Button/TextButton";
import { getSponsors } from "../../../config/api/services/sponsor";
import SponsorCard from "../../reusables/Card/SponsorCard";
import CreateSponsorModal from "../../reusables/Modal/Sponsor/CreateSponsorModal";

export default function SponsorMainComponent() {
    const [sponsors, setSponsors] = useState([]);
    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();
    const query: any = useQuery();
    const [modal, setModal] = useState({
        isOpen: false,
        id: '',
        name: '',
        method: 'detail'
    });

    // Function
    async function fetchSponsor() {
        try {
            let res = await getSponsors({
                page: Number(query?.get('page') || 1),
                limit: Number(query?.get('limit') || 10),
                name: query?.get('name') || '',
                classId: '',
                brandId: '',
            });

            setSponsors(res.rows);
            setTotalCount(res.count);
            setPage(query?.get('page') || 1);
            setLimit(query?.get('limit') || 10)
            setName(query?.get('name') || '')
        } catch (error) {
            toast(error.message);
        }
    }

    function handleModal(data, method: string) {
        if (method === 'Reset') {
            setModal({
                isOpen: false,
                id: '',
                name: '',
                method: 'Detail'
            });

            fetchSponsor();
        } else if (method === 'Create') {
            setModal({
                isOpen: true,
                id: '',
                name: '',
                method: 'Create'
            })
        } else if (method === 'Close') {
            setModal({
                isOpen: false,
                id: '',
                name: '',
                method: 'Detail'
            })
        } else {
            setModal({
                isOpen: true,
                id: data?.id,
                name: data?.name,
                method
            })
        }
    }

    useEffect(() => {
        fetchSponsor()
    }, [query]);


    return (
        <div>
            {/* {
                (modal.isOpen && modal.id && modal.method === 'detail') ? <VocationDetailModal open={modal.isOpen} id={modal.id} onClick={() => handleModal(null, 'reset')} /> : null
            } */}
            {
                (modal.isOpen && modal.method === 'Create') ? <CreateSponsorModal open={modal.isOpen} id={modal.id} onClose={() => handleModal(null, 'Close')} onAccept={() => handleModal(null, 'Reset')} /> : null
            }
            <div className="p-4">
                <div className="flex gap-5 ml-auto justify-end">
                    <div className="w-[100px]">
                        <GeneralButton
                            title="Add"
                            bgColor={null}
                            textColor={null}
                            disable={false}
                            onClick={() => handleModal(null, 'Create')}
                            icon={<AiOutlinePlusCircle color={"white"} size={15} />}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-10 mb-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <IconField value={name} onChange={(e) => setName(e.target.value)} placeholder={"Sponsor Name"} type="text" />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <TextButton
                            title="Search"
                            onClick={() => navigate(`/sponsors?page=1&limit=${query?.get('limit') || 20}&name=${name}`)}
                            disable={false}
                        />
                        <TextButton
                            title="Reset"
                            onClick={() => navigate(`/sponsors?page=1&limit=${limit}&name=`)}
                            disable={false}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 overflow-auto max-h-[65vh]">
                    {
                        sponsors.map((data) => {
                            return (
                               <SponsorCard key={data?.id} data={data} onClick={() => handleModal(data, 'detail')} />
                            )
                        })
                    }
                </div>
            </div>
            {
                totalCount > 0 ? <div className="flex flex-rows justify-between px-4 mt-5">
                    {
                        page > 1 ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/sponsors?page=${(Number(query?.get('page') || 2) - 1) || 1}&limit=${query?.get('limit') || 20}&name=${name}`)}>Previous</p> : <div></div>
                    }
                    {
                        totalCount > 0 ? <p>Page {page} of {Math.ceil(totalCount / limit)}</p> : <div></div>
                    }
                    {
                        page < totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/sponsors?page=${(Number(query?.get('page') || 1) + 1) || 1}&limit=${query?.get('limit') || 20}&name=${name}`)}>Next</p> : <div></div>
                    }
                </div> : null
            }
        </div>
    );
}
