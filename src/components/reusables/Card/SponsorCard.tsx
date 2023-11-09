import { thousandSeparator } from "../../../utils/ThousandSeparator";

function SponsorCard({
    data,
    onClick
}: any) {
    return (
        <div className="min-h-[150px] bg-[#07638d] rounded-lg text-white py-3 px-5 mb-5" onClick={onClick}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-semibold text-sm text-white">{data?.name}</p>
                    <p className="text-xs mt-[2px]">{data?.brand?.name}</p>
                </div>
                <div className="">
                    <div className="border rounded-full p-2 text-center">
                        <p className="text-sm text-white capitalize">{data?.type.replace(/-/g, ' ')}</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-1">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-sm font-bold text-white">Sponsor</p>
                        <p className="text-xs text-white">{data?.discountType === 'amount' ? 'Rp.' : null} {thousandSeparator(data?.discount || '')} {data?.discountType === 'percentage' ? '%' : null}</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Max Participant</p>
                        <p className="text-xs text-white">{data.maxCapacity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SponsorCard;

