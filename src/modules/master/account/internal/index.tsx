import { useEffect, useState } from "react";
import TextButton from "../../../../components/reusables/Button/TextButton";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";
import moment from "moment";
import { toast } from "react-toastify";
import { HttpPost } from "../../../../config/api";

function InternalAccountPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const [tableData, setTableData] = useState([]);

    async function getUsers({
        page = 0,
        name,
        email,
    }) {
        try {
            let users = await HttpPost(`internal/users?rt=internal&limit=20&page=${page}`, {
                name,
                email,
                phone: ""
            }, null);

            setTableData(users.rows);
            setTotalCount(users.count);
            setPage(page);
        } catch (error) {
            toast(error.message);
        }
    }

    const tableFormat = [
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Email',
            key: 'email'
        },
        {
            title: 'Role',
            key: 'role'
        },
        {
            title: 'Created At',
            key: 'createdAt'
        },
        {
            title: 'Action',
            key: 'name'
        },
    ];

    useEffect(() => {
        getUsers({ page, name, email });
    }, [])

    return (
        <div>
            <div className="flex justify-between gap-10 mb-4 px-4">
                <div className="grid grid-cols-4 gap-2">
                    <InputSingleField
                        required={false}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Name"}
                    />
                    <InputSingleField
                        required={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={"Email"}
                    />
                </div>
                <div className="pt-2">
                    <TextButton title="Search" onClick={() => getUsers({ page, name, email })} disable={false} />
                </div>
            </div>
            <div className="px-4 max-h-[70vh] overflow-y-auto overflow-x-hidden">
                <table className="border-collapse border">
                    <thead className="text-white">
                        <tr>
                            {
                                tableFormat.map((data) => {
                                    return (
                                        <th className="border bg-slate-600 w-[300px]">{data.title}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData?.length > 0 ? tableData.map((data) => {
                                return (
                                    <tr>
                                        <td className="break-all px-2 border">{data?.account?.information.name}</td>
                                        <td className="break-all px-2 border">{data?.account?.email || '-'}</td>
                                        <td className="break-all px-2 border capitalize text-center">{data?.role?.name || '-'}</td>
                                        <td className="break-all px-2 border text-center">{moment(data?.createdAt).utc(true).format('DD MMMM YYYY HH:mm')}</td>
                                        <td className="flex flex-row gap-3 flex-wrap justify-center p-2">
                                            <div className="w-[100px]">
                                                <TextButton onClick={null} title="Detail" disable={false} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) : <tr>
                                <td colSpan={5} className="break-all p-4 border italic text-center">No data</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex flex-rows justify-between px-4 mt-5">
                {
                    page > 0 ? <p className="cursor-pointer font-semibold" onClick={() => getUsers({ page: page - 1, name, email })}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page + 1} of {Math.ceil(totalCount / 20)}</p> : <div></div>
                }
                {
                    page + 1 <= totalCount / 20 ? <p className="cursor-pointer font-semibold" onClick={() => getUsers({ page: page + 1, name, email })}>Next</p> : <div></div>
                }
                
            </div>
        </div>
    );
}

export default InternalAccountPage;