import "./TypeHotel.css";
const TypeHotelItem = function (props) {
  return (
    <li className="Type-Hotel-item">
      <img src={props.image} />
      <h2>{props.name}</h2>
      <p>{`${props.count} hotels`}</p>
    </li>
  );
};
export default TypeHotelItem;
