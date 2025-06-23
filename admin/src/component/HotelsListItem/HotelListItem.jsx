import style from "./HotelListItem.module.css";
import { useNavigate } from "react-router";
const HotelListItem = function ({ data }) {
  const navigate = useNavigate();
  const deleteHotelHandler = async function () {
    const isDelete = window.confirm("ban co chac muon xoa!");
    if (!isDelete) {
      return;
    }
    const res = await fetch(`http://localhost:5000/admin/hotel/${data._id}`, {
      method: "DELETE",
    });
    if (res.status === 404) {
      const resData = await res.json();
      alert(resData);
    }
    return navigate("/hotel-list");
  };

  return (
    <div className={style.item}>
      <input type="checkbox" />
      <span>{data._id}</span>
      <span>{data.name}</span>
      <span>{data.type}</span>
      <span>{data.title}</span>
      <span>{data.city}</span>
      <button onClick={deleteHotelHandler}>Delete</button>
    </div>
  );
};

export default HotelListItem;
