import { useEffect, useState } from "react";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { thousandSeparator } from "../../../utils/PriceFormatter";
import { MdModeEditOutline, } from "react-icons/md";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import MentorModal from "../../../components/Modal/Course/Mentor";
import CurriculumModal from "../../../components/Modal/Course/Curriculum";
import { getEvents } from "../../../configs/api/services/event";
import moment from "moment";
import CollaborationEventModal from "../../../components/Modal/Event/Collaboration";

function EventPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [openCollab, setOpenCollab] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [searchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);

    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    async function getList() {
        try {
            setLoading(true);

            const res = await getEvents({
                page: searchParams.get('page'),
                limit: searchParams.get('limit'),
            });

            console.log(res);

            setPage(searchParams.get('page'));
            setLimit(searchParams.get('limit'));

            setData(res.list);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getList()
    }, [searchParams]);

    return (
        <div>
            {/* 
            <div className="border bg-white rounded p-4 w-full mb-6">
                <div className="md:flex gap-5 items-center justify-between">
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:gap-x-4">
                            <InputSingleField placeholder={"Nama"} labelWeight={600} value={name} onChange={(e) => setName(e.target.value)} />
                            <InputSingleField placeholder={"Email"} labelWeight={600} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputSingleField placeholder={"Phone"} labelWeight={600} value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <GeneralButton title={"Reset"} onClick={() => navigate(`/mentors/list?page=${1}&limit=${25}&name=&email=&phone=`)} disable={loading} icon={null} />
                        <GeneralButton title={"Search"} onClick={() => navigate(`/mentors/list?page=${searchParams.get('page')}&limit=${searchParams.get('limit')}&name=${name || ''}&email=${email || ''}&phone=${phone || ''}`)} disable={loading} icon={<MdOutlineSearch color={"white"} size={20} />} />
                    </div>
                </div>
            </div> 
            */}
            <div className="overflow-auto">
                <table className="overflow-x-auto min-w-full max-w-[1440px]">
                    <thead className="bg-gray-600">
                        <tr>
                            <th className="w-[25px] p-2 border-black border-[1px] text-white">No.</th>
                            <th className="w-[200px] p-2 border-black border-[1px] text-white">Name</th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Quota</th>
                            <th className="w-[250px] p-2 border-black border-[1px] text-white">Price</th>
                            <th className="w-[250px] p-2 border-black border-[1px] text-white">Start Date</th>
                            <th className="w-[250px] p-2 border-black border-[1px] text-white">End Date</th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Mentor</th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Course</th>
                            <th className="w-[100px] p-2 border-black border-[1px] text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 ? data.map((data, index) => {
                                return (<tr key={data.id}>
                                    <td className="text-center py-2 font-semibold border-gray-400 border-[1px]">{index + 1}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px] capitalize">{data?.name}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{`${thousandSeparator(data?.participants?.length)} / ${thousandSeparator(data?.quota)}` || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{`${data?.price ? `Rp. ${thousandSeparator(data?.price)}` : "Free" }` || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{moment.unix(data?.startDate).format("DD-MM-YYYY HH:mm") || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{moment.unix(data?.endDate).format("DD-MM-YYYY HH:mm") || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">
                                        <GeneralButton title={"View"} onClick={() => {setOpenCollab(true); setSelectedId(data.id); setSelectedType("MENTOR") }} />
                                    </td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">
                                        <GeneralButton title={"View"} onClick={() => {setOpenCollab(true); setSelectedId(data.id); setSelectedType("COURSE")}} />
                                    </td>
                                    <td className="px-3py-2 border-gray-400 border-[1px] min-h-10">
                                        <div className="flex gap-5 justify-center items-center">
                                            <MdModeEditOutline color={"green"} size={20} onClick={() => navigate(`/events/form?section=update&id=${data?.id}`)} />
                                        </div>
                                    </td>
                                </tr>)
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
            <LoadingModal open={loading} />
            { openCollab && <CollaborationEventModal open={openCollab} onClose={() => setOpenCollab(false)} id={selectedId} type={selectedType} />}
        </div>
    );
}

export default EventPage;
