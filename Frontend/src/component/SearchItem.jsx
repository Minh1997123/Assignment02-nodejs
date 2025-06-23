import "./SearchItem.css";
import { Link } from "react-router";
const SearchItem = function ({
  name,
  distance,
  type,
  description,
  price,
  rate,
  image_url,
  id,
}) {
  return (
    <section className="SearchItem">
      <img src={image_url}></img>

      <div className="SearchItem-description">
        <h1>{name}</h1>
        <p>{`${distance} from center`}</p>
        <p className="SearchItem-description-tag">Free Breakfast</p>
        <p>
          <strong>{description}</strong>
        </p>
        <p>{type}</p>
      </div>
      <div className="SearchItem-rate">
        <div>
          <span>Excellent</span>
          <span>{rate}</span>
        </div>
        <div>
          <h1>{`$${price}`}</h1>
          <p>Includer taxes and fees</p>
          <Link to={`/detail/${id}`}>
            <button>See availavility</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default SearchItem;
