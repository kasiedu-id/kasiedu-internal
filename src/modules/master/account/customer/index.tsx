import { useEffect, useState } from "react";
import TextButton from "../../../../components/reusables/Button/TextButton";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";
import moment from "moment";
import UploadCsvFile from "../../../../components/reusables/Modal/UploadCsvFile";
import { toast } from "react-toastify";
import { HttpPost } from "../../../../config/api";
import UserCreateUpdateModal from "../../../../components/reusables/Modal/UserCreateUpdate";

function CustomerAccountPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [section, setSection] = useState("");
    const [userId, setUserId] = useState("");
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [openCsvUpload, setOpenCsvUpload] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    const [tableData, setTableData] = useState([]);

    async function getUsers({
        page = 0,
        name,
        email,
        phone,
    }) {
        try {
            let users = await HttpPost(`internal/users?rt=user&limit=20&page=${page}`, {
                name,
                email,
                phone,
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
            title: 'Phone',
            key: 'phone'
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
        getUsers({ page, name, email, phone });
    }, [])

    return (
        <div>
            <UserCreateUpdateModal
                open={openAdd}
                onClick={() => {
                    setOpenAdd(false);
                    getUsers({ page, name, email, phone });
                }}
                section={section}
                id={userId}
            />
            <UploadCsvFile open={openCsvUpload} onCancel={() => setOpenCsvUpload(false)} onAccept={() => {
                getUsers({ page, name, email, phone });
                setOpenCsvUpload(false);
            }} />
            <div className="flex justify-end gap-5 my-5 px-4">
                <div className="max-w-[150px] px-4">
                    <TextButton
                        title="Add User"
                        disable={false}
                        onClick={() =>
                            setOpenAdd(true)
                        }
                    />
                </div>
                <div className="w-[100px]">
                    <TextButton title="Export" onClick={() => null} disable={false} />
                </div>
                <div className="w-[100px]">
                    <TextButton title="Import" onClick={() => setOpenCsvUpload(true)} disable={false} />
                </div>
            </div>
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
                    <InputSingleField
                        required={false}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={"Phone Number"}
                    />
                </div>
                <div className="pt-2">
                    <TextButton title="Search" onClick={() => getUsers({ page: 0, name, email, phone })} disable={false} />
                </div>
            </div>
            <div className="px-4 max-h-[60vh] overflow-y-auto overflow-x-hidden">
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
                                        <td className="break-all px-2 border">{data?.account?.phone || '-'}</td>
                                        <td className="break-all px-2 border text-center">{moment(data?.createdAt).utc(true).format('DD MMMM YYYY HH:mm')}</td>
                                        <td className="flex flex-row gap-3 flex-wrap justify-center p-2">
                                            <div className="w-[100px]">
                                                <TextButton onClick={null} title="Detail" disable={false} />
                                            </div>
                                            <div className="w-[100px]">
                                                <TextButton onClick={() => {
                                                    setSection("update");
                                                    setUserId(data?.account?.id);
                                                    setOpenAdd(true);
                                                }} title="Edit" disable={false} />
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
                    page > 0 ? <p className="cursor-pointer font-semibold" onClick={() => getUsers({ page: page - 1, name, email, phone })}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page + 1} of {Math.ceil(totalCount / 20)}</p> : <div></div>
                }
                {
                    page + 1 <= totalCount / 20 ? <p className="cursor-pointer font-semibold" onClick={() => getUsers({ page: page + 1, name, email, phone })}>Next</p> : <div></div>
                }

            </div>
        </div>
    );
}

export default CustomerAccountPage;