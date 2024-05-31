import { useEffect, useState } from "react";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { thousandSeparator } from "../../../utils/PriceFormatter";
import { MdModeEditOutline, MdOutlineSupervisorAccount, MdOutlineAttachMoney, MdOutlineCalendarMonth } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { RiPresentationFill, RiGroup2Fill, RiMoneyCnyCircleFill } from "react-icons/ri";
import { GiBackup } from "react-icons/gi";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { getEvents } from "../../../configs/api/services/event";
import moment from "moment";
import CollaborationEventModal from "../../../components/Modal/Event/Collaboration";
import SponsorEventModal from "../../../components/Modal/Event/Sponsor";

function EventPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [openCollab, setOpenCollab] = useState(false);
    const [openSponsor, setOpenSponsor] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    async function getList() {
        try {
            setLoading(true);

            const res = await getEvents({
                page: searchParams.get('page'),
                limit: searchParams.get('limit'),
            });

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
        <div className="flex flex-col gap-4">
            {
                data.length > 0 ? data.map((data, index) => {
                    return (
                        <div key={data.id} className="border rounded border-gray-400 py-2 overflow-hidden">
                            <div className="grid grid-cols-2 md:grid-cols-3 px-2">
                                <div className="flex items-center">
                                    <img className="w-full" src={data.bannerMobile} alt="banner" />
                                </div>
                                <div className="p-2 flex flex-col gap-1">
                                    <p className="text-xs md:text-sm lg:text-[16px] font-semibold">{data.name}</p>
                                    <div className="flex gap-1 items-center">
                                        <MdOutlineSupervisorAccount color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                        <p className="text-xs md:text-sm lg:text-base">{`${thousandSeparator(data?.participants?.length)} / ${thousandSeparator(data?.quota)}` || 'N/A'}</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <MdOutlineAttachMoney color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                        <p className="text-xs md:text-sm lg:text-base">{`${data?.price ? `Rp. ${thousandSeparator(data?.price)}` : "Free"}` || 'N/A'}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineCalendarMonth color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                            <p className="text-xs md:text-sm lg:text-base">{moment.unix(data?.startDate).format("DD-MM-YYYY HH:mm") || 'N/A'} (Start)</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineCalendarMonth color={"black"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />
                                            <p className="text-xs md:text-sm lg:text-base">{moment.unix(data?.endDate).format("DD-MM-YYYY HH:mm") || 'N/A'} (End)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden mt-2 px-2 overflow-auto md:grid md:grid-cols-2 lg:grid-cols-2 gap-1" style={{ scrollbarWidth: "none", }}>
                                    <GeneralButton loading={false} bgColor={"bg-green-500"} icon={<MdModeEditOutline color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} title={"Edit"} onClick={() => navigate(`/events/form?section=update&id=${data?.id}`)} />
                                    <GeneralButton title={"Speaker"} icon={<RiPresentationFill color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCollab(true); setSelectedId(data.id); setSelectedType("MENTOR") }} />
                                    <GeneralButton title={"Course"} icon={<IoBook color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCollab(true); setSelectedId(data.id); setSelectedType("COURSE") }} />
                                    <GeneralButton title={"Support"} icon={<GiBackup color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCollab(true); setSelectedId(data.id); setSelectedType("SUPPORTER") }} />
                                    <GeneralButton title={"Collaborator"} icon={<RiGroup2Fill color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCollab(true); setSelectedId(data.id); setSelectedType("COLLABORATOR") }} />
                                    <GeneralButton title={"Sponsor"} icon={<RiMoneyCnyCircleFill color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenSponsor(true); setSelectedId(data.id); setSelectedType("SPONSOR") }} />
                                </div>
                            </div>
                            <div className="flex gap-1 mt-2 px-2 overflow-auto md:hidden" style={{ scrollbarWidth: "none", }}>
                                <GeneralButton loading={false} bgColor={"bg-green-500"} icon={<MdModeEditOutline color={"white"} size={12} />} title={"Edit"} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" onClick={() => navigate(`/events/form?section=update&id=${data?.id}`)} />
                                <GeneralButton title={"Speaker"} icon={<RiPresentationFill color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCollab(true); setSelectedId(data.id); setSelectedType("MENTOR") }} />
                                <GeneralButton title={"Course"} icon={<IoBook color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCollab(true); setSelectedId(data.id); setSelectedType("COURSE") }} />
                                <GeneralButton title={"Support"} icon={<GiBackup color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCollab(true); setSelectedId(data.id); setSelectedType("SUPPORTER") }} />
                                <GeneralButton title={"Collaborator"} icon={<RiGroup2Fill color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenCollab(true); setSelectedId(data.id); setSelectedType("COLLABORATOR") }} />
                                <GeneralButton title={"Sponsor"} icon={<RiMoneyCnyCircleFill color={"white"} size={12} className="h-[12px] w-[12px] md:h-[16px] md:w-[16px]  lg:h-[20px] lg:w-[20px]" />} onClick={() => { setOpenSponsor(true); setSelectedId(data.id); setSelectedType("SPONSOR") }} />
                            </div>
                        </div>
                    )
                }) : null
            }
            <LoadingModal open={loading} />
            {openCollab && <CollaborationEventModal open={openCollab} onClose={() => setOpenCollab(false)} id={selectedId} type={selectedType} />}
            {openSponsor && <SponsorEventModal open={openSponsor} onClose={() => setOpenSponsor(false)} id={selectedId} type={selectedType} />}
        </div>
    );
}

export default EventPage;
