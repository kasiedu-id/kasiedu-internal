interface NameAvatarProps {
  name: string;
  middle: boolean;
}

function NameAvatar({ name, middle }: NameAvatarProps) {
  let currentName = name?.split(" ");

  return (
    <div
      className={`flex relative w-20 h-20 justify-center items-center text-xl rounded-full mr-4 text-white bg-black`} style={{marginInline: middle ? "auto" : "none"}}
    >
      <p>{`${currentName[0][0]}${currentName[1] ? currentName[1][0] : ""}`}</p>
    </div>
  );
}

export default NameAvatar;
