import { Loader } from "../Loading";

interface TextButtonProps {
  title: string | null;
  onClick: any;
  disable: boolean | null;
  styles: string;
  bgColor: string;
}

function Button({ title, onClick, disable, bgColor, styles }: TextButtonProps) {
  return (
    <button
      onClick={disable ? null : onClick}
      disabled={disable}
      className={`${bgColor || 'bg-[#07638d]'} ${styles} min-w-[100px] w-full min-h-[28px] lg:w-full font-bold p-2 rounded text-center text-white`}
    >
      {disable ? (
        <Loader color={"white"} />
      ) : (
        <p className="text-[12px]">{title}</p>
      )}
    </button>
  );
}

export default Button;
