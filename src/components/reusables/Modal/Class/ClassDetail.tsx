import { useEffect, useState } from "react";
import { HttpGet } from "../../../../config/api";
import { toast } from "react-toastify";
import moment from "moment";
import SidebarModal from "../SidebarModal";
import { thousandSeparator } from "../../../../utils/ThousandSeparator";
import { getClassDetail } from "../../../../config/api/services/classes";

function ClassDetailModal({ open, onClick, id }) {
    const [detail, setDetail] = useState(null)

    async function fetchDetail() {
        try {
            let res = await getClassDetail({
                id
            });

            console.log(res);

            setDetail(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        if (open) fetchDetail();
    }, [open]);

    return (
        <SidebarModal sidebarOpen={open} label={"Class Detail"} setSidebarOpen={onClick}>
            <div className="mt-3">
                <div className="mt-5">
                    <div className="mb-3">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-5 max-w-[300px]">
                                <div>
                                    <div className="flex"><p className="font-semibold text-sm text-black">{detail?.name} / <span className="font-normal">{detail?.classCode}</span></p></div>
                                    <p className="text-xs mt-[2px]">{detail?.vocation?.name}</p>
                                    <div className="flex gap-3 my-2 flex-wrap">
                                        {
                                            detail?.categories?.map((data) => {
                                                return (
                                                    <div key={data.id} className="rounded-full py-1 px-3 bg-slate-400">
                                                        <p className="capitalize text-xs text-white">
                                                            {data.category.name}
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="border rounded-full px-4 py-2 text-center mb-2">
                                    <p className="text-sm">{detail?.isPrivate ? "Private" : "Public"}</p>
                                </div>
                                <p className="font-semibold text-red-600">Rp. {thousandSeparator(String(detail?.price))}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <p className="text-sm">{detail?.description}</p>
                    </div>
                    <div className="mb-10">
                        <div className="grid grid-cols-4">
                            <div>
                                <p className="font-semibold">Open Regis</p>
                                <p className="text-sm">{detail?.openRegis ? moment.unix(detail?.openRegis).utc().format('DD-MM-YYYY') : 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Close Regis</p>
                                <p className="text-sm">{detail?.closeRegis ? moment.unix(detail?.closeRegis).utc().format('DD-MM-YYYY') : 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Class Start</p>
                                <p className="text-sm">{detail?.classStart ? moment.unix(detail?.classStart).utc().format('DD-MM-YYYY') : 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Duration</p>
                                <p className="text-sm">{detail?.duration ? `${detail?.duration} ${detail?.durationType}` : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-10">
                        <div className="grid grid-cols-4">
                            <div>
                                <p className="font-semibold">Class Type</p>
                                <p className="text-sm capitalize">{detail?.classType}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Class Private</p>
                                <p className="text-sm">{detail?.isPrivate ? 'Private' : 'Public'}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Max Student</p>
                                <p className="text-sm">{detail?.maxPerson}</p>
                            </div>
                        </div>
                    </div>
                    {
                        detail?.classType !== 'online' ? <div>
                            <div className="mb-10">
                                <div className="flex gap-5">
                                    <div>
                                        <p className="font-semibold">Complete Address</p>
                                        <p className="text-sm capitalize">{detail?.completeAddress}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div>
                                        <p className="font-semibold">City</p>
                                        <p className="text-sm capitalize">{detail?.location?.cityName}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Province</p>
                                        <p className="text-sm capitalize">{detail?.location?.provinceName}</p>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                    }
                    <div className="mb-10">
                        <p className=" mb-3 font-semibold">Curriculums</p>
                        <div className="max-h-[20vh] overflow-y-auto">
                            {
                                detail?.curriculums?.map((data, i) => {
                                    return (
                                        <div key={data.id} className="flex gap-5 items-center mt-5">
                                            <p className="px-2">{i + 1}.</p>
                                            <div className="px-2">
                                                <p className="mb-3 font-semibold">{data.name}</p>
                                                <p>{data.description}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <p className=" mb-3 font-semibold">Requirement</p>
                        <div className="max-h-[20vh] overflow-y-auto">
                            {
                                detail?.requirements?.map((data, i) => {
                                    return (
                                        <div key={data.id} className="flex gap-5 items-center">
                                            <p className="px-2">{i + 1}.</p>
                                            <div className="px-2">
                                                <div>
                                                    <p className="">{data.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </SidebarModal>
    );
}

export default ClassDetailModal;
