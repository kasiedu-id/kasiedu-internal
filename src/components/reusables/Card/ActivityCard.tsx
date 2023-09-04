import { settings } from "../../../config/theme/constants";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
function ActivityCard({
  image,
  name,
  eventDate,
  edit,
  remove,
  editMode,
}) {
  return (
    <div className="bg-white my-1 border rounded-xl text-black">
      <div className="mb-2">
        <div
          style={{
            backgroundImage: `url(${settings.baseUrl}${image.replace('public/', '')})`,
          }}
          className="w-full h-[150px] rounded-xl bg-center bg-cover"
        >
          {" "}
        </div>
      </div>
      <div className="my-2 text-center">
        <p className="font-bold text-xs">{name}</p>
        <p className="text-xs mt-2 text-center italic">{eventDate}</p>
      </div>
      {
        editMode ? <div className="flex justify-center items-center mb-[15px] gap-5">
          <AiOutlineEdit
            onClick={edit}
            color="green"
            size={20}
          />
          <AiOutlineDelete
            onClick={remove}
            color="red"
            size={20}
          />
        </div> : null
      }
    </div>
  );
}

export default ActivityCard;
