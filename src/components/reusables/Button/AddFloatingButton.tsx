import { AiOutlinePlus } from 'react-icons/ai';

function AddFloatingBtn({onClick}){
    return (
        <div className="bg-green-500 text-white absolute bottom-[10%] right-5 rounded-full h-14 w-14" onClick={onClick}>
            <AiOutlinePlus className='h-full w-full p-3' />
        </div>
    )
}

export default AddFloatingBtn;