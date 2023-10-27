
import PhotoAvatar from "../Avatar/PhotoAvatar";
import NameAvatar from "../Avatar/NameAvatar";
import { useNavigate } from "react-router-dom";

function VocationCard({
    data
}: any) {
    const navigate = useNavigate();

    return (
        <div className="min-h-[150px] bg-[#07638d] rounded-lg text-white py-3 px-5 mb-5" onClick={() => navigate(`/vocations/${data.id}`)}>
            <div className="flex items-center">
                <div className="min-w-[20%]">
                    {
                        data?.photoProfile ? <PhotoAvatar name={data?.photoProfile} middle={false} /> : <NameAvatar name={data.name} middle={false} />
                    }
                </div>
                <div>
                    <p className="font-black text-sm text-white">{data.name} {data?.customerCode ? '/' : ''}{data?.customerCode}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {data?.categories?.map((category) => {
                            return (
                                <div className="rounded-full py-1 px-3 bg-slate-400">
                                    <p className="capitalize text-xs text-white">{category?.category?.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-1">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-sm font-bold text-white">PIC Name</p>
                        <p className="text-xs text-white">{data.cpName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">PIC Phone</p>
                        <p className="text-xs text-white">{data.cpPhone}</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">PIC Email</p>
                        <p className="text-xs text-white">{data.cpEmail}</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Vocation Email</p>
                        <p className="text-xs text-white">{data.emailVocation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VocationCard;

