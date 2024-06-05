import { useEffect, useState } from "react";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCourses } from "../../../configs/api/services/course";
import { thousandSeparator } from "../../../utils/PriceFormatter";
import { MdModeEditOutline, MdOutlineSupervisorAccount, MdOutlineAttachMoney, MdOutlineCalendarMonth, MdCoPresent } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { RiPresentationFill, RiGroup2Fill, RiMoneyCnyCircleFill } from "react-icons/ri";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import MentorModal from "../../../components/Modal/Course/Mentor";
import CurriculumModal from "../../../components/Modal/Course/Curriculum";
import PaymentModal from "../../../components/Modal/Course/Payment";
import moment from "moment";
import ParticipantModal from "../../../components/Modal/Course/Participant";
import SponsorCourseModal from "../../../components/Modal/Course/Sponsor";

function CoursePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [openMentor, setOpenMentor] = useState(false);
    const [openCurr, setOpenCurr] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [openParti, setOpenParti] = useState(false);
    const [openSponsor, setOpenSponsor] = useState(false);
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
            <div className="flex flex-col gap-4">
                {
                    data.length > 0 ? data.map((data, index) => {
                        return (
                            <div key={data.id} className="border rounded border-gray-400 py-2 overflow-hidden">
                                <div className="grid grid-cols-2 md:grid-cols-3 px-2">
                                    <div className="flex items-center">
                                        <img className="w-full" src={data.banner} alt="banner" />
                                    </div>
                                    <div className="p-2 flex flex-col gap-1">
                                        <p className="text-xs md:text-sm lg:text-[16px] font-semibold">{data.name}</p>
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineSupervisorAccount color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                            <p className="text-xs md:text-sm lg:text-base">{`${thousandSeparator(data?.participantJoin)} / ${thousandSeparator(data?.participantSeat)}` || 'N/A'}</p>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineAttachMoney color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                            <p className="text-xs md:text-sm lg:text-base">{`${data?.price ? `Rp. ${thousandSeparator(data?.totalPayment)} / ${thousandSeparator(data?.price)}` : "Free"}` || 'N/A'}</p>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineAttachMoney color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                            <p className="text-xs md:text-sm lg:text-base">{`${data?.minimumPrice ? `Rp. ${thousandSeparator(data?.minimumPrice)}` : "Free"}` || 'N/A'}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex gap-1 items-center">
                                                <MdOutlineCalendarMonth color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                                <p className="text-xs md:text-sm lg:text-base">{moment.unix(data?.courseStart).format("DD-MM-YYYY") || 'N/A'} (Start)</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <MdCoPresent color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                            <p className="text-xs md:text-sm lg:text-base capitalize">{`${data.category.toLowerCase()} - ${data.type?.replace(/_/g, ' ').toLowerCase()}` || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="hidden mt-2 px-2 overflow-auto md:grid md:grid-cols-2 lg:grid-cols-2 gap-1" style={{ scrollbarWidth: "none", }}>
                                        <GeneralButton loading={false} bgColor={"bg-green-500"} icon={<MdModeEditOutline color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} title={"Edit"} onClick={() => navigate(`/courses/form?section=update&id=${data?.id}`)} />
                                        <GeneralButton title={"Mentor"} icon={<RiPresentationFill color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenMentor(true); setSelectedId(data.id); }} />
                                        <GeneralButton title={"Syllabus"} icon={<IoBook color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCurr(true); setSelectedId(data.id); }} />
                                        <GeneralButton title={"Particip"} icon={<RiGroup2Fill color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenParti(true); setSelectedId(data.id); }} />
                                        <GeneralButton title={"Donation"} icon={<RiMoneyCnyCircleFill color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenPayment(true); setSelectedId(data.id); }} />
                                        <GeneralButton title={"Sponsor"} icon={<RiMoneyCnyCircleFill color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenSponsor(true); setSelectedId(data.id); }} />
                                    </div>
                                </div>
                                <div className="flex gap-1 mt-2 px-2 overflow-auto md:hidden" style={{ scrollbarWidth: "none", }}>
                                    <GeneralButton loading={false} bgColor={"bg-green-500"} icon={<MdModeEditOutline color={"white"} size={12} />} title={"Edit"} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" onClick={() => navigate(`/courses/form?section=update&id=${data?.id}`)} />
                                    <GeneralButton title={"Mentor"} icon={<RiPresentationFill color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenMentor(true); setSelectedId(data.id); }} />
                                    <GeneralButton title={"Syllabus"} icon={<IoBook color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCurr(true); setSelectedId(data.id); }} />
                                    <GeneralButton title={"Particip"} icon={<RiGroup2Fill color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenParti(true); setSelectedId(data.id); }} />
                                    <GeneralButton title={"Donation"} icon={<RiMoneyCnyCircleFill color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenPayment(true); setSelectedId(data.id); }} />
                                    <GeneralButton title={"Sponsor"} icon={<RiMoneyCnyCircleFill color={"white"} size={12} className="h-[16px] w-[16px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenSponsor(true); setSelectedId(data.id); }} />
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>
            <LoadingModal open={loading} />
            {openMentor && <MentorModal open={openMentor} onClose={() => setOpenMentor(false)} id={selectedId} />}
            {openCurr && <CurriculumModal open={openCurr} onClose={() => setOpenCurr(false)} id={selectedId} />}
            {openPayment && <PaymentModal open={openPayment} onClose={() => setOpenPayment(false)} id={selectedId} />}
            {openParti && <ParticipantModal open={openParti} onClose={() => setOpenParti(false)} id={selectedId} />}
            {openSponsor && <SponsorCourseModal open={openSponsor} onClose={() => setOpenSponsor(false)} id={selectedId} />}
        </div>
    );
}

export default CoursePage;
