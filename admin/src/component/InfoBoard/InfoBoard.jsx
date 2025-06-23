import style from "./InfoBoard.module.css";
import { useLoaderData } from "react-router";

const InfoBoard = function () {
  const loaderData = useLoaderData();
  return (
    <div className={style.info}>
      <div className={style.info__item}>
        <h4>USER</h4>
        <span>{loaderData.users}</span>
      </div>
      <div className={style.info__item}>
        <h4>ODER</h4>
        <span>{loaderData.oders}</span>
      </div>
      <div className={style.info__item}>
        <h4>EARNINGS</h4>
        <span>$ {loaderData.earnings}</span>
      </div>
      <div className={style.info__item}>
        <h4>BLANCE</h4>
        <span>$ {loaderData.balance}</span>
      </div>
    </div>
  );
};

export default InfoBoard;
