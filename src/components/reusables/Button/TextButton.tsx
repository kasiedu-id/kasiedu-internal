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
      disabled={disable}
      className={`bg-[#07638d] min-w-[100px] w-full min-h-[28px] lg:w-full font-bold p-2 rounded text-center text-white`}
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
