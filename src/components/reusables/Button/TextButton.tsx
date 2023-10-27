interface TextButtonProps {
  title: string | null;
  onClick: any;
  disable: boolean | null;
}

function TextButton({ title, onClick, disable }: TextButtonProps) {
  return (
    <button
      onClick={disable ? null : onClick}
      className={`w-full text-center cursor-pointer rounded-lg border border-primary bg-primary py-2 px-4 text-white transition hover:bg-opacity-90`}
    >
        <p className="text-[14px] text-white">{title}</p>
    </button>
  );
}

export default TextButton;
