import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SidebarModal from "../SidebarModal";
import PhotoAvatar from "../../Avatar/PhotoAvatar";
import NameAvatar from "../../Avatar/NameAvatar";
import { getVocationDetail, getVocationSocmed } from "../../../../config/api/services/vocation";
import { BsPatchCheckFill, BsPencil, BsEraser, BsCheck } from 'react-icons/bs';
import { VscLinkExternal } from 'react-icons/vsc'
import { thousandSeparator } from "../../../../utils/ThousandSeparator";
import moment from "moment";
import GeneralButton from "../../Button/GeneralButton";
import { getUserVocation } from "../../../../config/api/services/user";
import UploadImageModal from "../UploadImage";
import VerificationModal from "../VerificationModal";
import DeleteVocationModal from "./DeleteVocation";
import VocationUpdateModal from "./UpdateModal";

function VocationDetailModal({ open, onClick, id }) {
    const [detail, setDetail] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [socialMedia, setSocialMedia] = useState([]);
    const [modal, setModal] = useState({
        isOpen: false,
        id: '',
        name: '',
        method: 'detail',
        type: 'Photo Profil',
        file: '',
    });

    async function fetchDetail() {
        try {
            let res = await getVocationDetail({
                vocationId: id
            });

            let resSoc = await getVocationSocmed({
                vocationId: id
            });

            let resAcc = await getUserVocation({
                page: 1,
                limit: 10,
                email: '',
                name: '',
                vocationId: id
            });

            setAccounts(resAcc);
            setSocialMedia(resSoc);
            setDetail(res);
        } catch (error) {
            toast(error?.message);
        }
    }

    function handleModal(data, method) {
        if (method === 'reset') {
            setModal({
                isOpen: false,
                id: '',
                name: '',
                method: 'detail',
                type: 'Photo Profil',
                file: '',
            });

            fetchDetail();
        } else if (method === 'UploadImage') {
            setModal({
                isOpen: true,
                id: data?.id,
                name: data?.name,
                method: 'UploadImage',
                type: 'Photo Profil',
                file: '',
            })
        } else if (method === 'Close') {
            setModal({
                isOpen: false,
                id: '',
                name: '',
                method: 'detail',
                type: 'Photo Profil',
                file: '',
            });
        } else {
            setModal({
                isOpen: true,
                id: data?.id,
                name: data?.name,
                method,
                type: 'Photo Profil',
                file: '',
            })
        }
    }

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    return (
        <>
            {
                (modal.isOpen && modal.id && modal.method === 'UploadImage') ? <UploadImageModal
                    open={modal.isOpen}
                    vocationId={modal.id}
                    onClick={() => handleModal(null, 'reset')}
                    fileId={modal.file}
                    type={modal.type}
                /> : null
            }
            {
                (modal.isOpen && modal.id && modal.method === 'Verification') ? <VerificationModal
                    open={modal.isOpen}
                    vocationId={modal.id}
                    vocationName={modal.name}
                    section={detail?.verified ? "redo" : "create"}
                    onAccept={() => handleModal(null, 'reset')}
                    onCancel={() => handleModal(null, 'Close')}
                /> : null
            }
            {
                (modal.isOpen && modal.id && modal.method === 'Delete') ? <DeleteVocationModal
                    open={modal.isOpen}
                    vocationId={modal.id}
                    name={modal.name}
                    onAccept={() => handleModal(null, 'reset')}
                    onCancel={() => handleModal(null, 'Close')}
                /> : null
            }
            {
                (modal.isOpen && modal.id && modal.method === 'Update') ? <VocationUpdateModal
                    open={modal.isOpen}
                    id={modal.id}
                    onClick={() => handleModal(null, 'reset')}
                /> : null
            }
            <SidebarModal sidebarOpen={open} label={"Vocation Detail"} setSidebarOpen={onClick}>
                <div className="flex flex-col justify-between mt-3 ">
                    <div className="max-h-[80vh] overflow-y-auto">
                        <div className="mt-5 flex items-center">
                            <div className="max-w-[20%]" onClick={() => handleModal(detail, 'UploadImage')}>
                                {
                                    detail?.photoProfile ? <PhotoAvatar name={detail?.photoProfile} middle={false} /> : <NameAvatar name={detail?.name} middle={false} />
                                }
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <p className="font-black text-sm text-black">{detail?.name} <span className="font-normal">{detail?.customerCode ? '/' : ''} {detail?.customerCode}</span></p>
                                    {
                                        detail?.verified ? <BsPatchCheckFill color="green" size={20} /> : null
                                    }
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {detail?.categories?.map((category) => {
                                        return (
                                            <div className="rounded-full py-1 px-3 bg-slate-400">
                                                <p className="capitalize text-xs text-white">{category?.category?.name}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="whitespace-pre-line text-sm">{detail?.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-5 mt-5 border-b-graydark border-b-[1px]">
                            <div>
                                <p className="font-semibold">PIC Detail</p>
                                <div className="mt-3 flex flex-col gap-3">
                                    <div>
                                        <p className="text-sm font-semibold ">Name</p>
                                        <p className="break-words min-h-[48px]">{detail?.cpName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold ">Email</p>
                                        <p className="break-words min-h-[48px]">{detail?.cpEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold ">Phone</p>
                                        <p className="break-words min-h-[48px]">{detail?.cpPhone}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold">Bank Information</p>
                                <div className="mt-3 flex flex-col gap-3">
                                    <div>
                                        <p className="text-sm font-semibold ">Bank</p>
                                        <p className="break-words min-h-[48px]">-</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold ">Account Number</p>
                                        <p className="break-words min-h-[48px]">-</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold ">Account Name</p>
                                        <p className="break-words min-h-[48px]">-</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 border-b-graydark border-b-[1px] pb-5">
                            <p className="font-semibold">Verification Information</p>
                            <div className="mt-3 grid grid-cols-2 gap-5">
                                <div>
                                    <p className="font-semibold text-sm">Commission</p>
                                    <p className="break-words">{detail?.commissionType === 'amount' ? 'Rp.' : null} {thousandSeparator(detail?.commission || '')} {detail?.commissionType === 'percent' ? '%' : null}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Verified At</p>
                                    <p className="break-words">{detail?.verifiedAt ? moment(detail?.verifiedAt).format('DD MMM YYYY') : '-'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 border-b-graydark border-b-[1px] pb-5">
                            <p className="font-semibold">Address Information</p>
                            <div className="mt-3">
                                <p className="font-semibold text-sm">Complete Address</p>
                                <p className="break-words">{detail?.completeAddress}</p>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-5">
                                <div>
                                    <p className="font-semibold text-sm">City</p>
                                    <p className="break-words">{detail?.location?.cityName}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Province</p>
                                    <p className="break-words">{detail?.location?.provinceName}</p>
                                </div>
                            </div>
                        </div>
                        {
                            accounts.length > 0 ? <div className="mt-3 border-b-graydark border-b-[1px] pb-5">
                                <p className="capitalize font-bold">Account</p>

                                {
                                    accounts?.map((data) => {
                                        return (
                                            <div className="grid grid-cols-2 items-center gap-5">
                                                <div className="break-words w-full">
                                                    <p>{data?.account?.email}</p>
                                                </div>
                                                <div className="max-w-[150px]">
                                                    <GeneralButton title="Reset Password" onClick={() => null} disable={false} icon={null} bgColor={null} textColor={null} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div> : null
                        }
                        {
                            socialMedia.length > 0 ? <div className="mt-3 border-b-graydark border-b-[1px] pb-5">
                                <p className="capitalize font-bold">Social Media</p>
                                {
                                    socialMedia?.map((data: any) => {
                                        return (
                                            <div className="mt-1 mb-2 flex gap-3 items-center">
                                                <p className="my-2 capitalize">{data?.type}</p>
                                                <a href={!data?.url.match(/^https?:\/\//i) ? `https://${data?.url}` : data?.url} target="_blank" rel="noreferrer" className="text-center"><VscLinkExternal color={"blue"} size={15} /></a>
                                            </div>
                                        )
                                    })
                                }
                            </div> : null
                        }
                    </div>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        <GeneralButton title="Edit" onClick={() => handleModal(detail, 'Update')} disable={false} bgColor="bg-green-500" textColor={null} icon={<BsPencil size={15} color="white" />} />
                        <GeneralButton title={`${detail?.verified ? "Redo Verification" : "Verification" }`} onClick={() => handleModal(detail, 'Verification')} disable={false} bgColor={null} textColor={null} icon={<BsCheck size={20} color="white" />} />
                        <GeneralButton title="Delete" onClick={() => handleModal(detail, 'Delete')} disable={false} bgColor="bg-red-500" textColor={null} icon={<BsEraser size={15} color="white" />} />
                    </div>
                </div>
            </SidebarModal>
        </>
    );
}

export default VocationDetailModal;
