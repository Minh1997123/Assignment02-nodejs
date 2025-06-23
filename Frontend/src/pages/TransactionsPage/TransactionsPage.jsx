import { useLoaderData } from "react-router";
import style from "./TransactionsPage.module.css";
import store from "../../store/store";

const TransactionsPage = function () {
  const loaderData = useLoaderData();
  const getDate = function (startDate, endDate) {
    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);
    const newDateStart = dateStart.toLocaleDateString();
    const newDateEnd = dateEnd.toLocaleDateString();
    return `${newDateStart} - ${newDateEnd}`;
  };
  const statusClassName = function (status) {
    if (status === "Booked") {
      return style.booked;
    }
    if (status === "Checkin") {
      return style.checkin;
    }
    return style.checkout;
  };
  return (
    <div className={style.page}>
      <header className={style.header}>
        <h3>Your Transactions</h3>
      </header>
      <table>
        <thead>
          <tr className={style.title}>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loaderData.map((item, index) => {
            const hotel = item.hotel;
            return (
              <tr className={style.item} key={item._id}>
                <td>{index + 1}</td>
                <td>{hotel.name}</td>
                <td>{item.room.toString().replaceAll(",", " , ")}</td>
                <td>{getDate(item.dateStart, item.dateEnd)}</td>
                <td>${item.price}</td>
                <td>{item.payment}</td>
                <td>
                  <span className={statusClassName(item.status)}>
                    {item.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;

export const loader = async function () {
  const { auth } = store.getState();
  const res = await fetch(
    `http://localhost:5000/transaction?userEmail=${auth.email}`
  );
  const resData = await res.json();
  return resData;
};
