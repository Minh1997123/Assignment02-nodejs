import "./Citys.css";
import { useLoaderData } from "react-router";

const Citys = function (props) {
  const { countHotel } = useLoaderData();
  return (
    <section className="Citys">
      {countHotel.map(function (item) {
        return (
          <div className="Citys-info" key={item.city}>
            <img src={item.imgUrl}></img>
            <span>
              <h2>{item.city}</h2>
              <h2>{`${item.count} properties`}</h2>
            </span>
          </div>
        );
      })}
    </section>
  );
};
export default Citys;
