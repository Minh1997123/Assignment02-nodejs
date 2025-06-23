import style from "./HotelAddPage.module.css";
import { Form, redirect } from "react-router";
const HotelAddPage = function () {
  return (
    <>
      <header className={style.header}>
        <h2>Add New Product </h2>
      </header>
      <Form className={style.form} method="POST">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select name="type" id="type" required>
            <option value="Hotel">Hotel</option>
            <option value="Apartments">Apartments</option>
            <option value="Resorts">Resorts</option>
            <option value="Villas">Villas</option>
            <option value="Cabins">Cabins</option>
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" required />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" required />
        </div>
        <div>
          <label htmlFor="distance">Distance From City Center </label>
          <input type="number" name="distance" id="distance" min={1} required />
        </div>
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
          <input type="number" name="price" id="price" min={1} required />
        </div>
        <div>
          <label htmlFor="photos">Images</label>
          <textarea type="text" name="photos" id="photos" required />
        </div>
        <div>
          <label htmlFor="featured">Featured</label>
          <select name="featured" required>
            <option value={false}>no</option>
            <option value={true}>yes</option>
          </select>
        </div>
        <div className={style.rooms__input}>
          <label htmlFor="rooms">Rooms</label>
          <textarea name="rooms" id="rooms"></textarea>
        </div>
        <button>Send</button>
      </Form>
    </>
  );
};

export default HotelAddPage;

export const action = async function ({ request }) {
  const formData = await request.formData();
  const reqData = Object.fromEntries(formData.entries());
  const res = await fetch("http://localhost:5000/admin/hotel", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reqData),
  });
  return redirect("/hotel-list");
};
