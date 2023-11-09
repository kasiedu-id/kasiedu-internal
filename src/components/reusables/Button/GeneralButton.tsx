import { ReactNode } from "react";

interface TextButtonProps {
    title: string | null;
    onClick: any;
    disable: boolean | null;
    bgColor: string | null;
    textColor: string | null;
    icon: ReactNode | null;
}

function GeneralButton({ title, onClick, disable, bgColor, textColor, icon }: TextButtonProps) {
    return (
        <button
            onClick={disable ? null : onClick}
            className={`flex items-center justify-center gap-3 w-full text-center cursor-pointer rounded-lg border ${bgColor ?? "border-primary bg-primary"} py-2 transition hover:bg-opacity-90`}
        >
            {icon}
            <p className={`text-[14px] ${textColor ?? "text-white"}`}>{title}</p>
        </button>
    );
}

export default GeneralButton;
