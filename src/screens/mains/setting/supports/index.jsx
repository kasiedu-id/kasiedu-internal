import { useEffect, useState } from "react";
import LoadingModal from "../../../../components/Loadings";
import { toast } from "react-toastify";
import { MdModeEditOutline, MdOutlineSearch } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import GeneralButton from "../../../../components/Buttons/GeneralButton";
import { getSupportList } from "../../../../configs/api/services/support";

function SupportPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const [data, setData] = useState([]);

    async function getListSupport() {
        try {
            setLoading(true);

            const res = await getSupportList();

            setData(res);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getListSupport();
    }, [searchParams]);

    return (
        <div>
            <div className="border bg-white rounded p-4 w-full mb-6">
                <div className="md:flex gap-5 items-center justify-between">
                    <div />
                    <div className="flex gap-2">
                        {/* <GeneralButton title={"Add"} onClick={() => navigate(`/supports/form?section=create`)} disable={loading} icon={<HiOutlinePlusCircle color={"white"} size={20} />} /> */}
                    </div>
                </div>
            </div>
            <div className="overflow-auto">
                <table className="table-auto min-w-full max-w-[1200px]">
                    <thead className="bg-gray-600">
                        <tr>
                            <th className="md:w-1/4 p-2 border-black border-[1px] text-white">No.</th>
                            <th className="md:w-1/2 p-2 border-black border-[1px] text-white">Name</th>
                            <th className="md:w-1/2 p-2 border-black border-[1px] text-white">Value</th>
                            <th className="md:w-1/4 p-2 border-black border-[1px] text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 ? data.map((x, index) => {
                                return (<tr key={x.id}>
                                    <td className="text-center py-2 font-semibold border-gray-400 border-[1px]">{index + 1}</td>
                                    <td className="text-nowrap px-3 py-2 border-gray-400 border-[1px] capitalize">{x?.name}</td>
                                    <td className="text-nowrap px-3 py-2 border-gray-400 border-[1px]">{x?.value}</td>
                                    <td className="px-3py-2 border-gray-400 border-[1px] min-h-10">
                                        {/* <div className="flex gap-5 justify-center items-center">
                                            <MdModeEditOutline color={"green"} size={20} onClick={() => navigate(`/supports/form?section=update&id=${x?.id}`)} />
                                        </div> */}
                                    </td>
                                </tr>)
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default SupportPage;
