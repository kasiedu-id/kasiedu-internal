import { settings } from "../../../config/theme/constants";

interface PhotoAvatarProps {
  name: string;
  middle: boolean;
}

function PhotoAvatar({ name, middle }: PhotoAvatarProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${settings.baseUrl}${name.replace('public/', "")})`,
        backgroundSize: 'cover',
        marginInline: middle ? "auto" : "none"
      }}
      className={`flex relative w-20 h-20 justify-center items-center text-xl rounded-full mr-4 text-white bg-black`}
    ></div>
  );
}

export default PhotoAvatar;
