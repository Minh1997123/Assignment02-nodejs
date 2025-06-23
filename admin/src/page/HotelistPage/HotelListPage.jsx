import HotelListItem from "../../component/HotelsListItem/HotelListItem";
import style from "./HotelListPage.module.css";
import { Link, useLoaderData } from "react-router";

const HotelListPage = function () {
  const loaderData = useLoaderData();
  return (
    <>
      <header className={style.header}>
        <h2>Hotels List</h2>
        <Link to="/add-hotel">
          <button>Add New</button>
        </Link>
      </header>
      <div className={style[`hotel-list__content`]}>
        <div className={style.title}>
          <input type="checkbox" />
          <span>ID</span>
          <span>Name</span>
          <span>Type</span>
          <span>Title</span>
          <span>City</span>
          <span>Action</span>
        </div>
        {loaderData.map((item) => {
          return <HotelListItem data={item} key={item._id}></HotelListItem>;
        })}
      </div>
    </>
  );
};
export default HotelListPage;

export const loader = async function () {
  const res = await fetch("http://localhost:5000/admin/hotels");
  const resData = await res.json();
  return resData;
};
