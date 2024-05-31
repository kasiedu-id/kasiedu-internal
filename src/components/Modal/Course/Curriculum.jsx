import { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { addCurriculumCourse, getCurriculumCourse, removeCurriculumCourse } from "../../../configs/api/services/course";
import GeneralButton from "../../Buttons/GeneralButton";
import { InputSingleField } from "../../Fields/InputField";
import { TextAreaField } from "../../Fields/TextAreaField";


function CurriculumModal({ open, onClose, id }) {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function getList() {
        try {
            const res = await getCurriculumCourse({ id: id });

            setData(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function addCurriculum() {
        try {
            await addCurriculumCourse({ id, name: name, description: description });

            setName("");
            setDescription("");
            getList();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function removeData(id) {
        try {
            await removeCurriculumCourse(id);

            getList();

            toast('Success remove Curriculum');
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        getList();
    }, [])

    return (
        <BaseModal open={open} title={"List of Mentors"} onClose={onClose}>
            <div className="mt-3 flex gap-5">
                <div className="w-full mt-2">
                    <InputSingleField label={"Name"} value={name} onChange={(e) => setName(e.target.value)} />
                    <TextAreaField label={"Description"} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mt-9">
                    <GeneralButton title={"Add"} onClick={() => addCurriculum()} />
                </div>
            </div>
            <div className="mt-3">
                <div className="flex flex-col gap-5 max-h-[400px] overflow-auto">
                    {
                        data?.map((data) => {
                            return (
                                <div key={data?.id} className="p-4 border border-gray-400 rounded-lg flex">
                                    <div className="w-full flex items-center gap-2">
                                        <div className="w-[75%]">
                                            <p className="font-semibold">{data?.name}</p>
                                            <p>{data?.description}</p>
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

export default CurriculumModal;
