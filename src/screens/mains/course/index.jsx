import { useEffect, useState } from "react";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCourses } from "../../../configs/api/services/course";
import { thousandSeparator } from "../../../utils/PriceFormatter";
import { MdModeEditOutline, MdOutlineSearch } from "react-icons/md";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import MentorModal from "../../../components/Modal/Course/Mentor";
import CurriculumModal from "../../../components/Modal/Course/Curriculum";
import PaymentModal from "../../../components/Modal/Course/Payment";

function CoursePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [openMentor, setOpenMentor] = useState(false);
    const [openCurr, setOpenCurr] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [searchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);

    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    async function getList() {
        try {
            setLoading(true);

            const res = await getCourses({
                page: searchParams.get('page'),
                limit: searchParams.get('limit'),
            });

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
                            <th className="w-[250px] p-2 border-black border-[1px] text-white">Total Price</th>
                            <th className="w-[250px] p-2 border-black border-[1px] text-white">Price Workshop</th>
                            <th className="w-[250px] p-2 border-black border-[1px] text-white">Minimum Price </th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Mentor</th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Participant</th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Curriculum</th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Payment</th>
                            <th className="w-[100px] p-2 border-black border-[1px] text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 ? data.map((data, index) => {
                                return (<tr key={data.id}>
                                    <td className="text-center py-2 font-semibold border-gray-400 border-[1px]">{index + 1}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px] capitalize">{data?.name}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{`${thousandSeparator(data?.participantJoin)} / ${thousandSeparator(data?.participantSeat)}` || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{`Rp. ${thousandSeparator(data?.totalPayment)} / ${thousandSeparator(data?.price)}` || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">Rp. {thousandSeparator(data?.minimumWorkshop) || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">Rp. {thousandSeparator(data?.minimumPrice) || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">
                                        <GeneralButton title={"View"} onClick={() => {setOpenMentor(true); setSelectedId(data.id)}} />
                                    </td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">
                                        <GeneralButton title={"View"} onClick={() => null} />
                                    </td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">
                                        <GeneralButton title={"View"} onClick={() => {setOpenCurr(true); setSelectedId(data.id)}} />
                                    </td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">
                                        <GeneralButton title={"View"} onClick={() => {setOpenPayment(true); setSelectedId(data.id)}} />
                                    </td>
                                    <td className="px-3py-2 border-gray-400 border-[1px] min-h-10">
                                        <div className="flex gap-5 justify-center items-center">
                                            <MdModeEditOutline color={"green"} size={20} onClick={() => navigate(`/courses/form?section=update&id=${data?.id}`)} />
                                        </div>
                                    </td>
                                </tr>)
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
            <LoadingModal open={loading} />
            { openMentor && <MentorModal open={openMentor} onClose={() => setOpenMentor(false)} id={selectedId} />}
            { openCurr && <CurriculumModal open={openCurr} onClose={() => setOpenCurr(false)} id={selectedId} />}
            { openPayment && <PaymentModal open={openPayment} onClose={() => setOpenPayment(false)} id={selectedId} />}
        </div>
    );
}

export default CoursePage;
