import TypeHotelItem from "./TypeHotelItem";
import "./TypeHotel.css";
const data = [
  {
    name: "Hotels",
    count: 233,
    image: "./images/type_1.webp",
  },
  {
    name: "Apartments",
    count: 2331,
    image: "./images/type_2.jpg",
  },
  {
    name: "Resorts",
    count: 2331,
    image: "./images/type_3.jpg",
  },
  {
    name: "Villas",
    count: 2331,
    image: "./images/type_4.jpg",
  },
  {
    name: "Cabins",
    count: 2331,
    image: "./images/type_5.jpg",
  },
];

const TypeHotel = function () {
  return (
    <section className="Type-Hotel">
      <h1>Browse by property type</h1>
      <ul>
        {data.map(function (item) {
          return (
            <TypeHotelItem
              key={item.name}
              name={item.name}
              count={item.count}
              image={item.image}
            ></TypeHotelItem>
          );
        })}
      </ul>
    </section>
  );
};
export default TypeHotel;
