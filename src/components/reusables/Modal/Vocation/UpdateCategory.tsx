import { useEffect, useState } from "react";
import { addVocationCategory, deleteVocationCategory, getCategories, getVocationCategory} from "../../../../config/api/services";
import { toast } from "react-toastify";
import TextButton from "../../Button/TextButton";
import { BsTrash } from 'react-icons/bs'
import Select from "react-select";
import BaseModal from "../BaseModal";
import Button from "../../Button/Button";

function UpdateVocationCategory({ vocationId, tab }) {
    // Detail
    const [category, setCategory] = useState(null);
    const [categoryId, setCategoryId] = useState('');

    // Data
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [vocationCategories, setVocationCategories] = useState([]);

    async function initialize() {
        try {
            let res = await getCategories();

            let vocation = await getVocationCategory({
                vocationId
            });

            setCategories(res.map((data) => {
                return {
                    value: data.id,
                    label: data.name.toUpperCase()
                }
            }));

            setVocationCategories(vocation)
        } catch (error) {
            toast(error?.message);
        }
    }

    async function removeCategory({id}) {
        try {
            await deleteVocationCategory({id});

            const index = vocationCategories.findIndex((e) => e.id === id);
            vocationCategories.splice(index, 1);

            setCategoryId(null);
        } catch (error) {
            toast(error?.message);
        }
    }

    async function addData() {
        try {
            setLoading(true);

            const res = await addVocationCategory({
                vocationId,
                categoryId: category?.value
            });
            
            vocationCategories.push(res?.data?.data);

            setCategory(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast(error?.message);
        }
    }

    function handleSelect(data) {
        setCategory(data);
    }

    useEffect(() => {
        initialize();
    }, []);


    return (
        <div className={`py-5 max-h-[85vh] overflow-auto ${tab === "category" ? "block" : "hidden"}`}>
            <div className="w-full mb-10">
                <div className="mb-3">
                    <div className="mb-3">
                        <p className={`block tracking-wide text-black text-xs font-bold mb-2`} >
                            Category
                        </p>
                        <Select
                            options={categories}
                            placeholder="Select Category"
                            value={category}
                            onChange={handleSelect}
                            isSearchable={true}
                            isMulti={false}
                            className="outline-none"
                        />
                    </div>
                </div>
                <TextButton disable={loading} onClick={() => addData()} title="Add" />
            </div>
            <div>
                <p className="text-sm font-semibold mb-3">List Category</p>
                <div className="flex flex-col gap-5">
                    {
                        vocationCategories.map((data, i) => {
                            return (
                                <div className="border rounded-lg border-gray-400 flex gap-5 p-3 items-center">
                                    <div className="w-full">
                                        <p className="capitalize font-semibold">{i + 1}. {data?.category?.name}</p>
                                    </div>
                                    <BsTrash size={15} color="red" onClick={() => setCategoryId(data.id)} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <BaseModal open={categoryId ? true : false}>
                <div className="py-3 px-5">
                    <p className="font-semibold text-lg text-center">Delete Category</p>
                    <p className="text-center">Are you sure to delete the category ?</p>
                    <div className="flex gap-5 justify-center items-center mt-4">
                        <Button title="Stay" onClick={() => setCategoryId('')} disable={false} bgColor="bg-red-500" styles="" />
                        <Button title="Remove" onClick={() => removeCategory({id: categoryId})} disable={false} bgColor="" styles="" />
                    </div>
                </div>
            </BaseModal>
        </div>
    );
}

export default UpdateVocationCategory;
