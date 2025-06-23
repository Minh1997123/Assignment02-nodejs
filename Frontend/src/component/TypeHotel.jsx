import TypeHotelItem from "./TypeHotelItem";
import "./TypeHotel.css";
import { useLoaderData } from "react-router";

const TypeHotel = function () {
  const { typeHotels } = useLoaderData();
  return (
    <section className="Type-Hotel">
      <h1>Browse by property type</h1>
      <ul>
        {typeHotels.map(function (item) {
          return (
            <TypeHotelItem
              key={item.type}
              name={item.type}
              count={item.count}
              image={item.imgUrl}
            ></TypeHotelItem>
          );
        })}
      </ul>
    </section>
  );
};
export default TypeHotel;
