import style from "./RoomAddPage.module.css";
import { useLoaderData, Form, redirect } from "react-router";

const RoomAddPage = function () {
  const loaderData = useLoaderData();

  return (
    <>
      <header className={style.header}>
        <h2>Add New Room</h2>
      </header>
      <Form className={style.form} method="POST">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" required />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" min="1" required />
        </div>
        <div>
          <label htmlFor="maxPeople">Max People</label>
          <input
            type="number"
            name="maxPeople"
            id="maxPeople"
            min="1"
            required
          />
        </div>
        <div className={style.rooms_hotel}>
          <div>
            <label htmlFor="rooms">Rooms</label>
            <textarea name="rooms" id="rooms" placeholder="nhap so phong" />
          </div>
          <div>
            <label htmlFor="hotel">Choose a hotel</label>
            <select name="hotel" id="hotel">
              {loaderData.map((item) => {
                return (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button>Send</button>
        </div>
      </Form>
    </>
  );
};

export default RoomAddPage;

export const loader = async function () {
  const res = await fetch("http://localhost:5000/admin/hotels");
  const resData = await res.json();
  return resData;
};

export const action = async function ({ request }) {
  const formData = await request.formData();
  const reqData = Object.fromEntries(formData.entries());
  const res = await fetch("http://localhost:5000/admin/rooms", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reqData),
  });
  if (res.status === 200) {
    return redirect("/room-list");
  }
};
