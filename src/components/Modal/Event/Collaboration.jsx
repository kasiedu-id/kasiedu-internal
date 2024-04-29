import { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { getCourses } from "../../../configs/api/services/course";
import { getMentors } from "../../../configs/api/services/mentor";
import { DropdownMultiField } from "../../Fields/DropdownMulti";
import GeneralButton from "../../Buttons/GeneralButton";
import { addEventCollaboration, getCollaborationEvents, removeEventCollab } from "../../../configs/api/services/event";


function CollaborationEventModal({ open, onClose, id, type }) {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [selectedData, setselectedData] = useState(null);

    async function getCollaboration() {
        try {
            const res = await getCollaborationEvents({ id, type });

            setData(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function getList() {
        try {
            let res = [];

            if (type === 'COURSE') {
                res = await getCourses({ page: 1, limit: 200 })
            } else {
                res = await getMentors({ page: 1, limit: 200 });
            }

            setList(res.list);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function addCollab() {
        try {
            await addEventCollaboration({ id, ownerId: selectedData?.id, collborationType: type });

            setselectedData(null);
            getCollaboration();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function removeData(id) {
        try {
            await removeEventCollab(id);

            getCollaboration();

            toast(`Success remove ${type}`);
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        getCollaboration();
        getList();
    }, [])

    return (
        <BaseModal open={open} title={"List of Mentors"} onClose={onClose}>
            <div className="mt-3 flex items-center gap-5">
                <div className="w-full mt-2">
                    <DropdownMultiField list={list} value={selectedData} onDropdownItemClick={(e) => setselectedData(e)} placeholder={"Choose"} keyValue={"id"} keyLabel={"name"} />
                </div>
                <div>
                    <GeneralButton title={"Add"} onClick={() => addCollab()} />
                </div>
            </div>
            <div className="mt-3">
                <div className="flex flex-col gap-5">
                    {
                        data?.map((data) => {
                            return (
                                <div key={data?.mentor?.id} className="p-4 border border-gray-400 rounded-lg flex">
                                    <div className="w-full flex items-center gap-2">
                                        <div className="w-[75%]">
                                            <p className="font-semibold">{data?.name}</p>
                                            <p>{data?.mentor?.title}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center min-w-[50px]">
                                        <HiOutlineTrash size={20} color="red" onClick={() => removeData(data?.id)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </BaseModal>
    );
}

export default CollaborationEventModal;
