import { Loader } from "../Loading";

interface TextButtonProps {
  title: string | null;
  onClick: any;
  disable: boolean | null;
}

function TextButton({ title, onClick, disable }: TextButtonProps) {
  return (
    <button
      onClick={disable ? null : onClick}
      className="bg-[#07638d] w-full min-h-[38px] lg:w-full font-bold p-2 rounded text-center text-white"
    >
      {disable ? (
        <Loader color={"white"} />
      ) : (
        <p className="text-[12px]">{title}</p>
      )}
    </button>
  );
}

export default TextButton;
