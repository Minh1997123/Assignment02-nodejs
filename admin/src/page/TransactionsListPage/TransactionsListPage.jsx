import TransactionsItem from "../../component/TransactionsItem/TransactionsItem";
import style from "./TransactionsListPage.module.css";
import { useLoaderData } from "react-router";
const TransactionsListPage = function () {
  const loaderData = useLoaderData();
  return (
    <div className={style.page}>
      <header className={style.header}>
        <h2>Transactions List</h2>
      </header>
      <div className={style.list}>
        <div className={style.title}>
          <input type="checkbox"></input>
          <span>ID</span>
          <span>User</span>
          <span>Hotel</span>
          <span>Room</span>
          <span>Date</span>
          <span>Price</span>
          <span>Payment Method</span>
          <span>Status</span>
        </div>
        {loaderData.map((item) => {
          return (
            <TransactionsItem key={item._id} data={item}></TransactionsItem>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionsListPage;

export const loader = async function () {
  const res = await fetch(`http://localhost:5000/admin/transaction`);
  const resData = await res.json();
  return resData;
};
