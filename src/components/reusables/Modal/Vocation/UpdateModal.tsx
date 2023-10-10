import { useState } from "react";
import BaseModal from "../BaseModal";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import UpdateDetail from "./UpdateDetail";
import UpdateSocMed from "./UpdateSocialMedia";
import UpdateVocationCategory from "./UpdateCategory";

function VocationUpdateModal({ open, onClick, id }) {
    const [tab, setTab] = useState('detail');
    const [temporaryTab, setTemporaryTab] = useState("");
    const [popup, setPopup] = useState(false);
    const [modified, setModified] = useState(false);

    const modalTab = ['detail', 'category', 'social media'];

    function changeTab(data: string) {
        if (modified) {
            setPopup(true);
            setTemporaryTab(data);
        } else {
            setTab(data)
        }
    }

    return (
        <BaseModal open={open}>
            <AiOutlineCloseCircle onClick={onClick} size={25} color={"black"} className="ml-auto mb-5 cursor-pointer" />
            <p className="text-center font-bold text-lg">Update Vocation</p>
            <div className="py-5">
                <div className="flex gap-5 justify-center">
                    {
                        modalTab.map((data) => {
                            return (
                                <p onClick={() => changeTab(data)} key={data} className={`${tab === data ? 'border-b-2 border-black font-semibold' : ''} cursor-pointer capitalize`}>
                                    {data}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
            <UpdateDetail
                vocationId={id}
                onModified={(e: any) => setModified(e)}
                popup={popup}
                moveTab={(e) => {
                    setPopup(false);
                    e ? setModified(false) : setModified(true);
                    if (e) setTab(temporaryTab);
                    if (e) setTemporaryTab("");
                }}
                tab={tab}
            />
            <UpdateVocationCategory vocationId={id} tab={tab} />
            <UpdateSocMed vocationId={id} tab={tab} />
        </BaseModal>
    );
}

export default VocationUpdateModal;
