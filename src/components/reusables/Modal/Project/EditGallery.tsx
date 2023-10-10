import { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { toast } from "react-toastify";
import { InputSingleField } from "../../Field/InputField";
import { getProjectDetail, updateProjectGallery, uploadImage } from "../../../../config/api/services";
import { settings } from "../../../../config/theme/constants";
import Button from "../../Button/Button";


function ProjectGalleryEdit({ open, onClick, id }) {
    const [galleries, setGalleries] = useState([]);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [index, setIndex] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);

    async function submit() {
        try {
            const payload = new FormData();

            payload.append('project-image', image);
            payload.append('name', name);
            payload.append('documentType', "project-image");

            const res = await uploadImage({ payload });

            galleries.push(res.path);

            await updateProjectGallery({
                projectId: id,
                gallery: galleries,
            });

            setGalleries(galleries);

            setImage(null);
            setName('');

            toast('Success upload image')
        } catch (error) {
            toast(error?.message);
        }
    }

    async function deleteImage() {
        try {
            galleries.splice(index, 1);

            await updateProjectGallery({
                projectId: id,
                gallery: galleries,
            });

            setGalleries(galleries);
            setIndex(0);
            setDeleteModal(false);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function fetchProjectGalleries() {
        try {
            setImage(null);
            setName("");

            const res = await getProjectDetail({
                projectId: id
            });

            console.log(res);

            setGalleries(res.gallery ? JSON.parse(res.gallery) : []);
        } catch (error) {
            toast(error?.message);
        }
    }



    useEffect(() => {
        if (open) fetchProjectGalleries();
    }, [open])

    return (
        <div>
            <BaseModal open={open}>
                <AiOutlineCloseCircle onClick={onClick} size={25} color={"black"} className="ml-auto mb-5 cursor-pointer" />
                <p className="text-center font-bold text-lg">Update Project Gallery</p>
                <div className="mt-4 text-black">
                    <div className="border h-[150px] w-[150px] mx-auto mb-5">
                        {image ? (
                            <label
                                className="flex justify-center items-center h-[100%]"
                                htmlFor={`file-project-image`}
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    style={{ width: "100%", height: "100%" }}
                                    alt=""
                                />
                            </label>
                        ) : (
                            <label
                                className="flex justify-center items-center h-[100%]"
                                htmlFor={`file-project-image`}
                            >
                                Document
                            </label>
                        )}
                        <input type="file" accept=".png,.jpg,.pdf" hidden id={`file-project-image`} onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="mb-2">
                        <InputSingleField
                            placeholder={"File"}
                            required={true}
                            label={"Nama File"}
                            value={name}
                            type={"text"}
                            textColor={"black"}
                            onChange={(e: any) => setName(e.target.value)}
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
                    <p className="font-semibold text-lg">Gallery Project</p>
                    <div className="grid grid-cols-3 flex-wrap gap-5">
                        {
                            galleries.map((data, index) => {
                                return (
                                    <div>
                                        <img src={`${settings.baseUrl}${data?.replace('public/', '')}`} className="w-full h-[100px] object-contain" alt="" />
                                        <BsFillTrash3Fill color="red" size={15} className="mx-auto mt-3 cursor-pointer" onClick={() => { setIndex(index); setDeleteModal(true) }} />
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </BaseModal>
            <BaseModal open={deleteModal}>
                <div className="py-3 px-5">
                    <p className="font-semibold text-lg text-center">Delete Image</p>
                    <p className="text-center">Are you sure to delete the image ?</p>
                    <div className="flex gap-5 justify-center items-center mt-4">
                        <Button title="Cancel" onClick={() => setDeleteModal(false)} disable={false} bgColor="bg-red-500" styles="" />
                        <Button
                            title="Continue"
                            onClick={() => {
                                deleteImage();
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

export default ProjectGalleryEdit;
