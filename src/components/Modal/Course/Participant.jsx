import { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "react-toastify";
import GeneralButton from "../../Buttons/GeneralButton";
import { InputSingleField } from "../../Fields/InputField";
import { createPayment, deletePayments, getPayments, updatePayment } from "../../../configs/api/services/payment";
import { removeStripNumber, thousandSeparator } from "../../../utils/PriceFormatter";
import { DropdownMultiField } from "../../Fields/DropdownMulti";
import LoadingModal from "../../Loadings";


function ParticipantModal({ open, onClose, id }) {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const paymentStatus = [
        {
            name: 'Waiting Payment',
            value: 'WAITING_PAYMENT',
        },
        {
            name: 'Pending',
            value: 'PENDING',
        },
        {
            name: 'Waiting Confirmation',
            value: 'WAITING_CONFIRMATION',
        },
        {
            name: 'Paid',
            value: 'PAID',
        },
        {
            name: 'Failed',
            value: 'FAILED',
        },
        {
            name: 'Deny',
            value: 'DENY',
        },
        {
            name: 'Canceled',
            value: 'CANCELED',
        },
    ];

    async function getList() {
        try {
            const res = await getPayments({ id, type: 'course' });

            setData(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function submit() {
        try {
            setLoading(true);

            if(selectedId){
                await updatePayment({
                    id: selectedId,
                    anonymous: false,
                    type: 'COURSE',
                    status: status.value,
                })
            } else {
                await createPayment({
                    email,
                    name,
                    phone,
                    amount,
                    courseId: id,
                    anonymous: false,
                    type: 'COURSE',
                    status: status.value,
                });
            }

            toast('Success');

            setName("");
            setEmail("");
            setPhone("");
            setAmount("");
            setStatus(null);
            getList();
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    async function removeData(id) {
        try {
            await deletePayments({id});

            getList();

            toast('Success remove payment and participant');
        } catch (error) {
            toast(error?.message);
        }
    }

    useEffect(() => {
        getList();
    }, [])

    return (
        <>
            <BaseModal open={open} title={"List of Participant"} onClose={onClose}>
                <div className="mt-3 flex gap-5">
                    <div className="w-full mt-2">
                        <InputSingleField label={"Name"} disable={selectedId ? true : false} value={name} onChange={(e) => setName(e.target.value)} />
                        <InputSingleField label={"Email"} disable={selectedId ? true : false} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputSingleField label={"Phone"} disable={selectedId ? true : false} value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <InputSingleField label={"Amount"} disable={selectedId ? true : false} value={thousandSeparator(amount)} onChange={(e) => setAmount(removeStripNumber(e.target.value))} />
                        <DropdownMultiField label={"Payment Status"} list={paymentStatus} value={status} onDropdownItemClick={(e) => setStatus(e)} placeholder={"Choose Status"} keyValue={"value"} keyLabel={"name"} />
                    </div>
                    <div className="mt-9">
                        <GeneralButton title={"Add"} onClick={() => submit()} />
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex flex-col gap-5 max-h-[400px] overflow-auto">
                        {
                            data?.map((data) => {
                                const url = data?.url ? JSON.parse(data?.url) : null;

                                return (
                                    <div key={data?.id} className="p-4 border border-gray-400 rounded-lg flex">
                                        <div className="w-full flex items-center gap-2">
                                            <div className="w-[75%]">
                                                <p className="italic font-semibold">{data?.code}</p>
                                                <p className="text-sm">{data?.name}</p>
                                                <p className="text-sm">{data?.email} / {data?.phone}</p>
                                                <p className="text-sm">Rp. {thousandSeparator(data?.amount)}</p>
                                                <p className="text-sm italic">{data?.status}</p>
                                                {
                                                    url ? <p onClick={() => {navigator.clipboard.writeText(url.redirect_url); toast('Success Copy Url Link!')}} className="mt-4 cursor-pointer text-blue-500">Copy Url</p> : null
                                                }
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center min-w-[50px]">
                                            <HiOutlinePencilAlt size={20} color="green" onClick={() => { setStatus({ name: data.status.replace(/_/g, ' '), value: data.status }); setAmount(data.amount); setPhone(data.phone); setEmail(data.email); setName(data.name); setSelectedId(data?.id)}} />
                                            <HiOutlineTrash size={20} color="red" onClick={() => removeData(data?.id)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <LoadingModal open={loading} />
            </BaseModal>
        </>
    );
}

export default ParticipantModal;
