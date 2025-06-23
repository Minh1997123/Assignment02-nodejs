import style from "./BookForm.module.css";
import { useSelector } from "react-redux";
const BookForm = function () {
  const auth = useSelector((state) => state.auth);
  return (
    <div className={style.form}>
      <h2>Reserve info</h2>
      <label htmlFor="fullName">Your Full Name:</label>
      <input name="user" id="user" placeholder="User name" required></input>
      <label htmlFor="email">Your Email:</label>
      <input
        name="email"
        id="email"
        placeholder="Email"
        type="email"
        defaultValue={auth.email}
        required
      ></input>
      <label htmlFor="phoneNumber">Your Phone Number:</label>
      <input
        name="phoneNumber"
        id="phoneNumber"
        placeholder="Phone Number"
        type="number"
        required
      ></input>
      <label htmlFor="cardNumber">Your Identity Card Number</label>
      <input
        name="cardNumber"
        id="cardNumber"
        placeholder="Card Number"
        required
      ></input>
    </div>
  );
};

export default BookForm;
