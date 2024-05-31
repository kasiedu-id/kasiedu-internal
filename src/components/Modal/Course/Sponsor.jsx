import { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { DropdownMultiField } from "../../Fields/DropdownMulti";
import GeneralButton from "../../Buttons/GeneralButton";
import { InputSingleField } from "../../Fields/InputField";
import { getSponsor, getSponsorCourse } from "../../../configs/api/services/sponsor";
import { addCourseSponsor, removeSponsorCourse } from "../../../configs/api/services/course";


function SponsorCourseModal({ open, onClose, id }) {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [selectedTier, setSelectedTier] = useState(null);
    const [order, setOrder] = useState('');

    const tiers = [
        { name: 'Top', value: 'TOP'},
        { name: 'Top Second', value: 'TOP_SECOND'},
        { name: 'Middle', value: 'MIDDLE'},
        { name: 'Lower', value: 'LOWER'}
    ];

    async function getCollaboration() {
        try {
            const res = await getSponsorCourse({ id });

            setData(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function getList() {
        try {
            let res = [];
            
            res = await getSponsor();

            setList(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function addCollab() {
        try {
            await addCourseSponsor({ id, ownerId: selectedData?.id, tier: selectedTier?.value, orderTier: Number(order) });

            setSelectedData(null);
            setSelectedTier(null);
            setOrder('');
            getCollaboration();
        } catch (error) {
            toast(error?.message);
        }
    }

    async function removeData(id) {
        try {
            await removeSponsorCourse(id);

            getCollaboration();

            toast(`Success remove sponsor`);
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        getCollaboration();
        getList();
    }, [])

    return (
        <BaseModal open={open} title={"List"} onClose={onClose}>
            <div className="mt-3 flex items-center gap-5">
                <div className="w-full mt-2">
                    <DropdownMultiField list={list} value={selectedData} onDropdownItemClick={(e) => setSelectedData(e)} placeholder={"Choose Sponsor"} keyValue={"id"} keyLabel={"name"} />
                    <DropdownMultiField list={tiers} value={selectedTier} onDropdownItemClick={(e) => setSelectedTier(e)} placeholder={"Choose Tier Sponsor"} keyValue={"value"} keyLabel={"name"} />
                    <InputSingleField value={order} onChange={(e) => setOrder(e.target.value)} placeholder={"Order"} />
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
                                        <div className="w-[20%]">
                                            <img src={data?.sponsor?.owner?.logo} alt={data?.sponsor?.name} />
                                        </div>
                                        <div className="w-[75%]">
                                            <p className="font-semibold">{data?.sponsor?.name}</p>
                                            <p>Level Tier: {data?.tier}</p>
                                            <p>Order Tier: {data?.orderTier}</p>
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

export default SponsorCourseModal;
