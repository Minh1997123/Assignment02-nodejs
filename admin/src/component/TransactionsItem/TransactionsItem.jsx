import style from "./TransactionsItem.module.css";

const TransactionsItem = function (props) {
  const data = props.data;
  const newDateStart = new Date(data.dateStart).toLocaleDateString();
  const newDateEnd = new Date(data.dateEnd).toLocaleDateString();
  const getStatusClassName = function (status) {
    if (status === "Booked") {
      return style["button--booked"];
    } else if (status === "Checkin") {
      return style["button--checkin"];
    } else {
      return style["button--checkout"];
    }
  };
  return (
    <div className={style.item}>
      <input type="checkbox" />
      <span>{data._id}</span>
      <span>{data.user}</span>
      <span>{data.hotel.name}</span>
      <span>{data.room.toString().replaceAll(",", " , ")}</span>
      <span>{`${newDateStart} - ${newDateEnd}`}</span>
      <span>${data.price}</span>
      <span>{data.payment}</span>
      <span className={getStatusClassName(data.status)}>{data.status}</span>
    </div>
  );
};

export default TransactionsItem;
