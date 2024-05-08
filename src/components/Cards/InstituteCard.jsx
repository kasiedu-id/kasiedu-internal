import React from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function InstituteCard({ name, logo, picName, picPhone, id }) {
    const navigate = useNavigate();

    return (
        <div
            className={`border rounded-lg border-[#07638d] bg-[#07638d] flex gap-5 h-fit items-center p-5`}
        >
            <img
                src={logo}
                style={{ width: "25%", height: "25%", mixBlendMode: 'hard-light', }}
                className='rounded-full'
                alt={name}
            />
            <div>
                <div className='flex items-center gap-3'>
                    <p className='text-white font-semibold'>{name}</p>
                    <MdModeEditOutline color='white' size={12} onClick={() => navigate(`/institutes/form?section=update&id=${id}`)} />
                </div>
                <table>
                    <tr>
                        <td>
                            <p className='text-sm text-white'>Name:</p>
                        </td>
                        <td className='pl-1'>
                            <p className='text-sm text-white'>{picName}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='text-sm text-white'>Phone:</p>
                        </td>
                        <td className='pl-1'>
                            <p className='text-sm text-white'>{picPhone}</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default InstituteCard;