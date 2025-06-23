import InfoBoard from "../../component/InfoBoard/InfoBoard";
import TransactionsItem from "../../component/TransactionsItem/TransactionsItem";
import style from "./DashBoardPage.module.css";
import { useLoaderData } from "react-router";

const DashBoardPage = function () {
  const loaderData = useLoaderData();
  return (
    <>
      <InfoBoard></InfoBoard>
      <div className={style.dashboard__content}>
        <h2>Latest Transactions</h2>
        <div className={style.dashboard__content__stransactions}>
          <div className={style.dashboard__content__title}>
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
          {loaderData.transaction.map((item) => (
            <TransactionsItem data={item}></TransactionsItem>
          ))}
        </div>
      </div>
    </>
  );
};
export default DashBoardPage;

export const loader = async function () {
  try {
    const res = await fetch("http://localhost:5000/admin/home");
    const resData = await res.json();
    console.log(resData);
    if (res.status === 404) {
      console.log(resData);
    }
    return resData;
  } catch (err) {
    console.log(err);
  }
};
