import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpPost } from "../../../../config/api";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";
import TextButton from "../../../../components/reusables/Button/TextButton";
import { useParams } from "react-router-dom";
import UploadEvent from "../../../../components/reusables/Modal/UploadEvent";
import ActivityCard from "../../../../components/reusables/Card/ActivityCard";

function VocationEventGallery() {
    const [events, setEvents] = useState([]);
    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const limit = 25;
    const [totalCount, setTotalCount] = useState(0);
    const [modalCreateUpdateOpen, setModalCreateUpdateOpen] = useState(false);
    const [section, setSection] = useState("create");
    const [eventId, setEventId] = useState("");
    const [eventName, setEventName] = useState("");
    const param = useParams();

    // Function
    async function getEvents({
        page
    }) {
        try {
            let res = await HttpPost(`galleries/`, {
                limit: limit,
                start: page,
                method: 'partial',
                name,
                vocationId: param.id
            }, null);

            setEvents(res.rows);
            setTotalCount(res.count);
            setPage(page)
        } catch (error) {
            toast(error.message);
        }
    }

    useEffect(() => {
        getEvents({
            page: 0
        });
    }, []);

    return (
        <div>
            {/* <BackLayout navigation={"/vocations"} /> */}
            <UploadEvent
                open={modalCreateUpdateOpen}
                vocationId={param.id}
                id={eventId}
                section={section}
                onClick={() => {
                    getEvents({
                        page: 0
                    });
                    setModalCreateUpdateOpen(false);
                }}
            />
            <div className="p-4">
                <div className="flex gap-5 ml-auto justify-end">
                    {/* <div className="w-[100px]">
                        <TextButton title="Import" onClick={() => setOpenCsvUpload(true)} disable={false} />
                    </div> */}
                    <div className="w-[100px]">
                        <TextButton
                            title="Add"
                            disable={false}
                            onClick={() => {
                                setSection("create");
                                setEventId(null);
                                setModalCreateUpdateOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-10 mb-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <InputSingleField required={false} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Event Name"} />
                    </div>
                    <div className="pt-2">
                        <TextButton
                            title="Search"
                            onClick={() => getEvents({
                                page: 0
                            })}
                            disable={false}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    {
                        events.map((data) => {
                            return (
                                <ActivityCard
                                    key={data.id}
                                    name={data.name}
                                    eventDate={data.date}
                                    image={data.image}
                                    editMode={true}
                                    edit={() => {
                                        setSection("update");
                                        setEventId(data.id);
                                        setModalCreateUpdateOpen(true);
                                    }}
                                    remove={null}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-rows justify-between px-4 mt-5">
                {
                    page > 0 ? <p className="cursor-pointer font-semibold" onClick={() => getEvents({
                        page: page - 1,
                    })}>Previous</p> : <div></div>
                }
                {
                    totalCount > 0 ? <p>Page {page + 1} of {Math.ceil(totalCount / limit)}</p> : <div></div>
                }
                {
                    page + 1 <= totalCount / limit ? <p className="cursor-pointer font-semibold" onClick={() => getEvents({
                        page: page + 1,
                    })}>Next</p> : <div></div>
                }
            </div>
        </div>
    );
}

export default VocationEventGallery;
