import HotelListItem from "./HotelListItem";
import "./HotelList.css";
import { useLoaderData } from "react-router";

const HotelList = function () {
  const { topRatingHotel } = useLoaderData();
  return (
    <section className="HotelList">
      <h1>Homes guests love</h1>
      <ul>
        {topRatingHotel.map(function (item) {
          console.log(item);
          return (
            <HotelListItem
              key={item._id}
              image={item.photos[0]}
              type={item.type}
              rate={item.rating}
              city={item.city}
              name={item.name}
              price={item.rooms.length ? item.rooms[0].price : 0}
              id={item._id}
            ></HotelListItem>
          );
        })}
      </ul>
    </section>
  );
};
export default HotelList;
