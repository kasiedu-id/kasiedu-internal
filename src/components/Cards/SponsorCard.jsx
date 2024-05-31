import React from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import { thousandSeparator } from '../../utils/PriceFormatter';

function SponsorCard({ name, sponsorType, value, owner, id, remove }) {
    const navigate = useNavigate();

    return (
        <div
            className={`border rounded-lg border-[#07638d] bg-[#07638d] flex gap-5 h-fit justify-between items-center p-5`}
        >
            <div className='flex gap-5'>
                {
                    owner ? <img
                        src={owner.logo}
                        style={{ width: "25%", height: "25%", mixBlendMode: 'hard-light', }}
                        className='rounded-full'
                        alt={name}
                    /> : <MdAccountCircle color='white' size={60} />
                }
                <div>
                    <div className='flex items-center gap-3'>
                        <p className='text-white font-semibold'>{name}</p>
                        <MdModeEditOutline color='white' size={12} onClick={() => navigate(`/sponsors/form?section=update&id=${id}`)} />
                    </div>
                    <table>
                        <tr>
                            <td>
                                <p className='text-sm text-white'>Sponsor:</p>
                            </td>
                            <td className='pl-1'>
                                <p className='text-sm text-white'>{`${sponsorType === 'AMOUNT' ? `Rp. ${thousandSeparator(value)}` : sponsorType === 'PERCENTAGE' ? `Rp. ${thousandSeparator(value)}%` : value}`}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className='text-sm text-white'>Owner:</p>
                            </td>
                            <td className='pl-1'>
                                <p className='text-sm text-white'>{owner.name}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <BsTrash3 color='red' size={20} onClick={remove} />
        </div>
    );
}

export default SponsorCard;