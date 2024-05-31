import React from 'react';
import Circular from '../Loadings/CircularLoading';

function GeneralButton({ title, onClick, disable = false, bgColor, textColor, icon = null, loading }) {
    return (
        <button
            onClick={disable ? null : onClick}
            className={`flex items-center justify-center min-w-[90px] max-w-full gap-1 text-center cursor-pointer rounded-lg border ${disable ? "bg-[#07638dab] cursor-not-allowed" : bgColor ?? "border-[#07638d] bg-[#07638d]"} shadow-sm py-2 transition hover:bg-opacity-90`}
        >
            {
                loading ? <Circular /> : <>
                    {
                        icon ? <div>{icon}</div> : null
                    }
                    <p className={`text-[14px] xl:text-base ${textColor ?? "text-white"}`}>{title}</p>
                </>
            }
        </button>
    );
}

export default GeneralButton;