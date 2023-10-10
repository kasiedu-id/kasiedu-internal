import { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { BsFillTrash3Fill } from 'react-icons/bs';
import { toast } from "react-toastify";
import { InputSingleField } from "../../Field/InputField";
import { createPayment, deletePaymentPermanent, getProjectDetail, updatePaymentStatus } from "../../../../config/api/services";
import Button from "../../Button/Button";
import { DropdownField } from "../../Field/DropdownField";
import { thousandSeparator } from "../../../../utils/ThousandSeparator";


function ProjectPaymentEdit({ open, onClick, id }) {
    const [payments, setPayments] = useState([]);
    const [amount, setAmount] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isAnonymous, setIsAnonymous] = useState("");
    const [deletePermanentOpen, setDeletePermanentOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [paymentId, setPaymentId] = useState('');
    const [section, setSection] = useState('approve');

    async function submit() {
        try {
            const res = await createPayment({
                projectId: id,
                accountId: null,
                accountClassId: null,
                method: null,
                status: 'pending',
                amount,
                type: null,
                callback: null,
                name,
                email,
                phone,
                extra: null,
                isAnonymous
            });

            payments.push(res);

            setAmount("");
            setName("");
            setEmail("");
            setPhone("");
            setIsAnonymous("");

            toast('Success create payment')
        } catch (error) {
            toast(error?.message);
        }
    }

    async function updateStatus() {
        try {
            await updatePaymentStatus({
                id: paymentId,
                status: section === 'approve' ? 'paid' : section,
            });

            fetchProjectPayment();

            toast('Success update status payment')
        } catch (error) {
            toast(error?.message);
        }
    }

    async function deletePayment() {
        try {
            await deletePaymentPermanent({
                id: paymentId,
            });

            fetchProjectPayment();

            toast('Success remove payment')
        } catch (error) {
            toast(error?.message);
        }
    }


    async function fetchProjectPayment() {
        try {

            const res = await getProjectDetail({
                projectId: id
            });

            console.log(res);

            setPaymentId('');
            setDeletePermanentOpen(false);
            setConfirmationOpen(false);
            setSection('approve')
            setPayments(res.payments);
        } catch (error) {
            toast(error?.message);
        }
    }



    useEffect(() => {
        if (open) fetchProjectPayment();
    }, [open])

    return (
        <div>
            <BaseModal open={open}>
                <AiOutlineCloseCircle onClick={onClick} size={25} color={"black"} className="ml-auto mb-5 cursor-pointer" />
                <p className="text-center font-bold text-lg">Update Project Payment</p>
                <div className="mt-4 text-black">
                    <div className="mb-2">
                        <InputSingleField
                            placeholder={"Joe Doe"}
                            required={true}
                            label={"Nama Donatur"}
                            value={name}
                            type={"text"}
                            textColor={"black"}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <InputSingleField
                            placeholder={"Email"}
                            required={true}
                            label={"Email Donatur"}
                            value={email}
                            type={"text"}
                            textColor={"black"}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <InputSingleField
                            placeholder={"08123456789"}
                            required={true}
                            label={"Phone Donatur"}
                            value={phone}
                            type={"text"}
                            textColor={"black"}
                            onChange={(e: any) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <InputSingleField
                            placeholder={"100000"}
                            required={true}
                            label={"Total Donatur"}
                            value={amount}
                            type={"text"}
                            textColor={"black"}
                            onChange={(e: any) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <DropdownField
                            required={false}
                            label={"Is Anonymous ?"}
                            value={isAnonymous}
                            collectionList={[
                                {
                                    value: true,
                                    label: 'Yes'
                                },
                                {
                                    value: false,
                                    label: 'No'
                                }
                            ]}
                            valueField={"value"}
                            labelField={"label"}
                            placeholder={"Anonymous"}
                            onChange={(e) => {
                                setIsAnonymous(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="items-center mt-3 py-3 text-center" onClick={() => submit()}>
                    <div
                        id="ok-btn"
                        className={`cursor-pointer px-4 py-2 bg-[#07638d] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#07638d] focus:outline-none focus:ring-2 focus:ring-[#07638d]`}
                    >
                        <p>Submit</p>
                    </div>
                </div>
                <div className="mt-5">
                    <p className="font-semibold text-lg">Payment Project</p>
                    <div className="grid grid-cols-1 flex-wrap gap-5">
                        {
                            payments.map((data, index) => {
                                return (
                                    <div className="border border-gray-300 p-2 rounded">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex gap-2 items-center">
                                                    <p>{data?.name}</p>
                                                    <div className="border rounded-full px-3 py-1 text-center bg-slate-400">
                                                        <p className="text-sm capitalize font-semibold text-white">{data?.orderNumber}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border rounded-full px-3 py-1 text-center">
                                                <p className="text-sm capitalize">{data?.status}</p>
                                            </div>
                                        </div>
                                        <p>Rp. {thousandSeparator(String(data?.amount))}</p>
                                        <div className="my-3 flex gap-3">
                                            <Button
                                                title="Deny"
                                                onClick={() => {
                                                    setConfirmationOpen(true);
                                                    setSection('deny');
                                                    setPaymentId(data?.id)
                                                }}
                                                disable={false}
                                                bgColor="bg-red-500"
                                                styles="" />
                                            <Button
                                                title="Approve"
                                                onClick={() => {
                                                    setConfirmationOpen(true);
                                                    setSection('approve')
                                                    setPaymentId(data?.id)
                                                }}
                                                disable={false}
                                                bgColor=""
                                                styles="" />
                                            <Button
                                                title="Permanent Delete"
                                                onClick={() => {
                                                    setDeletePermanentOpen(true);
                                                    setPaymentId(data?.id);
                                                }}
                                                disable={false}
                                                bgColor="bg-red-700"
                                                styles="" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </BaseModal>
            <BaseModal open={confirmationOpen}>
                <div className="py-3 px-5">
                    <p className="font-semibold text-lg text-center">Confirmation Payment</p>
                    <p className="text-center">Are you sure to {section} the payment ?</p>
                    <div className="flex gap-5 justify-center items-center mt-4">
                        <Button title="Cancel" onClick={() => setConfirmationOpen(false)} disable={false} bgColor="bg-red-500" styles="" />
                        <Button
                            title="Continue"
                            onClick={() => {
                                updateStatus();
                            }}
                            disable={false}
                            bgColor=""
                            styles="" />
                    </div>
                </div>
            </BaseModal>
            <BaseModal open={deletePermanentOpen}>
                <div className="py-3 px-5">
                    <p className="font-semibold text-lg text-center">Delete Payment</p>
                    <p className="text-center">Are you sure to delete permanent the payment ?</p>
                    <div className="flex gap-5 justify-center items-center mt-4">
                        <Button title="Cancel" onClick={() => setDeletePermanentOpen(false)} disable={false} bgColor="bg-red-500" styles="" />
                        <Button
                            title="Continue"
                            onClick={() => {
                                deletePayment();
                            }}
                            disable={false}
                            bgColor=""
                            styles="" />
                    </div>
                </div>
            </BaseModal>
        </div>
    );
}

export default ProjectPaymentEdit;
