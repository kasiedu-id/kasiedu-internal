import { useEffect, useState } from "react";
import CSVReader from "../../csv/upload";
import TextButton from "../Button/TextButton";
import { toast } from "react-toastify";
import { HttpPost } from "../../../config/api";

function UploadCsvFile({
    open,
    onCancel,
    onAccept,
}) {
    const [resultCsv, setResultCsv] = useState(null);
    const [loading, setLoading] = useState(false);

    async function submituser(){
        try {
            setLoading(true);
            let users = resultCsv.data.map((data, i) => {
                    return {
                        name: data[0],
                        email: data[1],
                        phone: data[2],
                        occupation: data[3],
                        interest: data[4],
                        goal: data[5],
                        biodata: data[6],
                    }
            });

            users.shift();

            await HttpPost('internal/users/create-user-bulk', users, null);

            setLoading(false);
            onAccept();
        } catch (error) {
            setLoading(false);
            toast(error?.message)
        }
    }

    useEffect(() => {
        console.log(resultCsv);
    }, [resultCsv])

    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mx-auto`}
        >
            <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white overflow-hidden">
                <CSVReader result={(e) => setResultCsv(e)} />
                {
                    resultCsv ?
                        <div className="px-4 overflow-auto max-h-[50vh]">
                            <table className="border-collapse border table-auto">
                                <thead className="text-white">
                                    <tr>
                                        {
                                            resultCsv.data[0].map((data) => {
                                                return (
                                                    <th className="border bg-slate-600 w-[200px] p-4">{data}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        resultCsv.data.map((data, i: number) => {
                                            if(i !== 0){
                                                return (
                                                    <tr>
                                                        {
                                                            data.map((field) => {
                                                                return (
                                                                    <th className="border w-[300px] p-4 font-normal">{field ? field : '-'}</th>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        : null
                }
                <div className="flex justify-center items-center gap-10 w-[400px] mx-auto pt-5">
                    <TextButton onClick={() => submituser()} title="Submit" disable={loading} />
                    <TextButton onClick={() => onCancel()} title="Cancel" disable={false} />
                </div>
            </div>
        </div>
    );
}

export default UploadCsvFile;
