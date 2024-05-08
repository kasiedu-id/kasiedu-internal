import React from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";

function UserCard({ name, profile, email, phone, id }) {
    const navigate = useNavigate();

    return (
        <div
            className={`border rounded-lg border-[#07638d] bg-[#07638d] flex gap-5 h-fit items-center p-5`}
        >
            {
                profile ? <img
                    src={profile}
                    style={{ width: "25%", height: "25%", mixBlendMode: 'hard-light', }}
                    className='rounded-full'
                    alt={name}
                /> : <MdAccountCircle color='white' size={60} />
            }
            <div>
                <div className='flex items-center gap-3'>
                    <p className='text-white font-semibold'>{name}</p>
                    <MdModeEditOutline color='white' size={12} onClick={() => navigate(`/users/form?section=update&id=${id}`)} />
                </div>
                <table>
                    <tr>
                        <td>
                            <p className='text-sm text-white'>Email:</p>
                        </td>
                        <td className='pl-1'>
                            <p className='text-sm text-white'>{email}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='text-sm text-white'>Phone:</p>
                        </td>
                        <td className='pl-1'>
                            <p className='text-sm text-white'>{phone}</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default UserCard;