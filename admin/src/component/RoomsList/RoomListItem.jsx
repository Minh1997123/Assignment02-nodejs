import style from "./RoomListItem.module.css";
import { useNavigate } from "react-router";
const RoomListItem = function ({ data }) {
  const navigate = useNavigate();
  const deleteRoomHandler = async function () {
    await fetch(`http://localhost:5000/admin/rooms/${data._id}`, {
      method: "DELETE",
    });
    navigate("/room-list");
  };
  return (
    <div className={style.item}>
      <input type="checkbox" />
      <span>{data._id}</span>
      <span>{data.title}</span>
      <span>{data.desc}</span>
      <span>{data.price}</span>
      <span>{data.maxPeople}</span>
      <button onClick={deleteRoomHandler}>Delete</button>
    </div>
  );
};
export default RoomListItem;
