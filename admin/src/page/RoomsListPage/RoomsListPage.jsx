import RoomListItem from "../../component/RoomsList/RoomListItem";
import style from "./RoomsListPage.module.css";
import { Link, useLoaderData } from "react-router";
const RoomListPage = function () {
  const loaderData = useLoaderData();
  return (
    <>
      <header className={style.header}>
        <h2>Room List</h2>
        <Link to="/add-room">
          <button>Add New</button>
        </Link>
      </header>
      <div className={style.list}>
        <div className={style.title}>
          <input type="checkbox" />
          <span>ID</span>
          <span>Tile</span>
          <span>Description</span>
          <span>Price</span>
          <span>Max People</span>
          <span>Action</span>
        </div>
        {loaderData.map((item) => {
          return <RoomListItem key={item._id} data={item}></RoomListItem>;
        })}
      </div>
    </>
  );
};

export default RoomListPage;

export const loader = async function () {
  const res = await fetch("http://localhost:5000/admin/rooms");
  const resData = await res.json();
  return resData;
};
