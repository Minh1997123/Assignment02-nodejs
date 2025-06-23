import "./HotelList.css";
import { Link } from "react-router";

const HotelListItem = function (props) {
  return (
    <li className="HotelList-item">
      <img src={props.image}>{props.img}</img>
      <div>
        <Link to={`/detail/${props.id}`}>{props.name}</Link>
      </div>
      <p>{props.city}</p>
      <h3>{`Starting $${props.price}`}</h3>
    </li>
  );
};
export default HotelListItem;
