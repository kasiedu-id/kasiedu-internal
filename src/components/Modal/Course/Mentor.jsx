import { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { addMentorCourse, getMentorCourse, removeMentorCourse } from "../../../configs/api/services/course";
import { getMentors } from "../../../configs/api/services/mentor";
import { DropdownMultiField } from "../../Fields/DropdownMulti";
import GeneralButton from "../../Buttons/GeneralButton";


function MentorModal({ open, onClose, id }) {
    const [data, setData] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);

    async function getMentor() {
        try {
            const res = await getMentorCourse({ id: id });

            setData(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function getMentorList() {
        try {
            const res = await getMentors({ page: 1, limit: 100, });

            setMentors(res.list);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function addMentor() {
        try {
            await addMentorCourse({ id, mentorId: selectedMentor?.id, });

            setSelectedMentor(null);
            getMentor();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function removeMentor(id) {
        try {
            await removeMentorCourse(id);

            getMentor();

            toast('Success remove mentor');
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        getMentor();
        getMentorList();
    }, [])

    return (
        <BaseModal open={open} title={"List of Mentors"} onClose={onClose}>
            <div className="mt-3 flex items-center gap-5">
                <div className="w-full mt-2">
                    <DropdownMultiField list={mentors} value={selectedMentor} onDropdownItemClick={(e) => setSelectedMentor(e)} placeholder={"Choose Mentor"} keyValue={"id"} keyLabel={"name"} />
                </div>
                <div>
                    <GeneralButton title={"Add"} onClick={() => addMentor()} />
                </div>
            </div>
            <div className="mt-3">
                <div className="flex flex-col gap-5 max-h-[400px] overflow-auto">
                    {
                        data?.map((data) => {
                            return (
                                <div key={data?.mentor?.id} className="p-4 border border-gray-400 rounded-lg flex">
                                    <div className="w-full flex items-center gap-2">
                                        <img
                                            src={data?.mentor?.profile}
                                            style={{ width: "25%", height: "100%" }}
                                            className="rounded-full"
                                            alt=""
                                        />
                                        <div className="w-[75%]">
                                            <p className="font-semibold">{data?.mentor?.name}</p>
                                            {
                                                data?.mentor?.email && data?.mentor?.phone ? <p className="flex gap-2">{data?.mentor?.email} / {data?.mentor?.phone}</p> : null
                                            }
                                            {
                                                data?.mentor?.email && !data?.mentor?.phone ? <p className="flex gap-2">{data?.mentor?.email}</p> : null
                                            }
                                            {
                                                !data?.mentor?.email && data?.mentor?.phone ? <p className="flex gap-2">{data?.mentor?.phone}</p> : null
                                            }
                                            <p>{data?.mentor?.title}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center min-w-[50px]">
                                        <HiOutlineTrash size={20} color="red" onClick={() => removeMentor(data?.id)} />
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

export default MentorModal;
