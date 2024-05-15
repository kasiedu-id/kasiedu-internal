import BaseModal from "../BaseModal";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import GeneralButton from "../../Buttons/GeneralButton";
import { toast } from "react-toastify";
import { useState } from "react";
import { removeHardUser } from "../../../configs/api/services/user";


function DeleteUserModal({ open, onClose, id, onSuccess }) {
    const [loading, setLoading] = useState(false);

    async function removeUser() {
        try {
            setLoading(true);

            await removeHardUser({ id });

            onSuccess();
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <BaseModal open={open} title={"Remove User"} onClose={onClose}>
            <div className="my-5 ">
                <p className="text-sm text-gray-400 text-center">Are you sure want to delete this account ?</p>
                <p className="text-sm text-red-500 font-semibold text-center">This action cannot be reversed</p>
            </div>
            <div className="flex gap-5">
                <GeneralButton title={"Cancel"} bgColor={"bg-white"} textColor={"text-[#07638dab]"} onClick={() => onClose()} loading={loading} icon={<MdOutlineClose color="#07638dab" size={20} />} disable={loading} />
                <GeneralButton title={"Proceed"} onClick={() => removeUser()} loading={loading} icon={<HiOutlineTrash color="white" size={20} />} disable={loading} />
            </div>
        </BaseModal>
    );
}

export default DeleteUserModal;
