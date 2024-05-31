import React from 'react';
import { MdOutlineAddCircleOutline } from "react-icons/md";

function EmptyStateButton({ label, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`border rounded-lg border-gray-400 flex flex-col justify-center items-center p-5`}
        >
            <MdOutlineAddCircleOutline color='gray' size={30} />
            <p className='mt-4 text-center text-sm text-gray-400'>{label}</p>
        </div>
    );
}

export default EmptyStateButton;