import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/reusables/Field/InputField";
import TextButton from "../../../components/reusables/Button/TextButton";
import { useNavigate } from "react-router-dom";
import VocationCreateUpdateModal from "../../../components/reusables/Modal/VocationCreateUpdate";
import UploadVocationCsvFile from "../../../components/reusables/Modal/UploadCsvVocation";
import { useQuery } from "../../../utils/query";
import { getVocations } from "../../../config/api/services/vocation";
import VocationCard from "../../reusables/Card/VocationCard";

export default function VocationArchiveComponent() {
    const [vocations, setVocations] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();
    const query: any = useQuery();
    const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
    const [openCsvUpload, setOpenCsvUpload] = useState(false);

    // Function
    async function fetchVocation() {
        try {
            let res = await getVocations({
                page: Number(query?.get('page') || 1),
                limit: Number(query?.get('limit') || 10),
                name: query?.get('name') || '',
                code: query?.get('code') || '',
                categories: '',
                province: '',
                city: ''
            });


            setVocations(res.rows);
            setTotalCount(res.count);
            setPage(query?.get('page') || 1);
            setLimit(query?.get('limit') || 10)
            setName(query?.get('name') || '')
            setCode(query?.get('code') || '')
        } catch (error) {
            toast(error.message);
        }
    }

    useEffect(() => {
        fetchVocation()
    }, [query]);

    return (
        <div>
            {/* <BackLayout navigation={"/vocations/archive"} /> */}
            <UploadVocationCsvFile
                open={openCsvUpload}
                onCancel={() => setOpenCsvUpload(false)}
                onAccept={() => {
                    navigate(`/vocations/archive?page=1&limit=${query?.get('limit') || 20}`);
                    setOpenCsvUpload(false);
                }}
            />
            <VocationCreateUpdateModal
                open={modalCreateUpdateOpen}
                onClick={() => {
                    setModalCreateUpdateOpen(false)
                    navigate(`/vocations/archive?page=1&limit=${query?.get('limit') || 20}`);
                }}
                id={""}
                section={"create"}
            />
            <div className="p-4">
                <div className="flex gap-5 ml-auto justify-end">
                    <div className="w-[100px]">
                        <TextButton
                            title="Add"
                            disable={false}
                            onClick={() =>
                                setModalCreateUpdateOpen(true)
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-10 mb-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Vocation Name"} />
                        <InputSingleField required={false} value={code} onChange={(e) => setCode(e.target.value)} placeholder={"Vocation Code"} />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <TextButton
                            title="Search"
                            onClick={() => navigate(`/vocations/archive?page=1&limit=${query?.get('limit') || 20}&name=${name}&code=${code}`)}
                            disable={false}
                        />
                        <TextButton
                            title="Reset"
                            onClick={() => navigate(`/vocations/archive?page=1&limit=${limit}&name=&code=`)}
                            disable={false}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 overflow-auto max-h-[65vh]">
                    {vocations.map((data) => {
                        return (
                            <VocationCard key={data?.id} data={data} />
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-rows justify-between px-4 mt-5">
                {
                    page > 1 ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/vocations/archive?page=${(Number(query?.get('page') || 2) - 1) || 1}&limit=${query?.get('limit') || 1}`)}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page} of {Math.ceil(totalCount / limit)}</p> : <div></div>
                }
                {
                    page < totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => navigate(`/vocations/archive?page=${(Number(query?.get('page') || 1) + 1) || 1}&limit=${query?.get('limit') || 20}`)}>Next</p> : <div></div>
                }
            </div>
        </div>
    );
}
