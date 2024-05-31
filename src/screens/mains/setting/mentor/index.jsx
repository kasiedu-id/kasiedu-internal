import { useEffect, useState } from "react";
import LoadingModal from "../../../../components/Loadings";
import { toast } from "react-toastify";
import { MdModeEditOutline, MdOutlineSearch } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { InputSingleField } from "../../../../components/Fields/InputField";
import GeneralButton from "../../../../components/Buttons/GeneralButton";
import { getMentors } from "../../../../configs/api/services/mentor";

function MentorPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [data, setData] = useState([]);

    async function getListMentors() {
        try {
            setLoading(true);

            const res = await getMentors({
                page: searchParams.get('page'),
                limit: searchParams.get('limit'),
                phone: searchParams.get('phone') || '',
                name: searchParams.get('name') || '',
                email: searchParams.get('email') || '',
            });

            setPhone(searchParams.get('phone'));
            setEmail(searchParams.get('email'));
            setName(searchParams.get('name'));

            setData(res.list);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getListMentors()
    }, [searchParams]);

    return (
        <div>
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
            <div className="overflow-auto">
                <table className="table-auto min-w-full max-w-[1200px]">
                    <thead className="bg-gray-600">
                        <tr>
                            <th className="w-[25px] p-2 border-black border-[1px] text-white">No.</th>
                            <th className="w-[100px] p-2 border-black border-[1px] text-white">Name</th>
                            <th className="w-[100px] p-2 border-black border-[1px] text-white">Email</th>
                            <th className="w-[50px] p-2 border-black border-[1px] text-white">Phone</th>
                            <th className="w-[150px] p-2 border-black border-[1px] text-white">Title</th>
                            <th className="w-[100px] p-2 border-black border-[1px] text-white">Profile</th>
                            <th className="w-[100px] p-2 border-black border-[1px] text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 ? data.map((data, index) => {
                                return (<tr key={data.id}>
                                    <td className="text-center py-2 font-semibold border-gray-400 border-[1px]">{index + 1}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px] capitalize">{data?.name}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{data?.email || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{data?.phone || 'N/A'}</td>
                                    <td className="px-3 py-2 border-gray-400 border-[1px]">{data?.title}</td>
                                    <td className="px-3 py-2 text-center border-gray-400 border-[1px]">
                                        {
                                            data?.profile ? <a className="bg-blue-500 rounded-lg p-2 text-sm text-white cursor-pointer" href={data?.profile} target="_blank" rel="noreferrer">View Image</a> : "N/A"
                                        }
                                    </td>
                                    <td className="px-3py-2 border-gray-400 border-[1px] min-h-10">
                                        <div className="flex gap-5 justify-center items-center">
                                            <MdModeEditOutline color={"green"} size={20} onClick={() => navigate(`/mentors/form?section=update&id=${data?.id}`)} />
                                        </div>
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

export default MentorPage;
