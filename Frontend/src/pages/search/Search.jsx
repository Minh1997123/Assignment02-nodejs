import SearchForm from "../../component/SearchPopup";
import SearchItem from "../../component/SearchItem";
import "../../component/Search.css";
import { useLoaderData } from "react-router";

const Search = () => {
  const loaderData = useLoaderData();
  return (
    <div className="Search">
      <SearchForm></SearchForm>
      <div className="SearchItem-container">
        {loaderData.map(function (hotel) {
          return (
            <SearchItem
              key={hotel._id}
              name={hotel.name}
              distance={hotel.distance}
              type={hotel.type}
              description={hotel.desc.split(".")[0]}
              price={hotel.rooms.length ? hotel.rooms[0].price : 0}
              rate={hotel.rating}
              image_url={hotel.photos[0]}
              id={hotel._id}
            ></SearchItem>
          );
        })}
      </div>
    </div>
  );
};

export default Search;

export const loader = async function ({ request }) {
  try {
    const url = new URL(request.url);
    let newSearch = url.search;
    if (url.search && !url.searchParams.get("date")) {
      const date = {
        startDate: url.searchParams.get("startDate"),
        endDate: url.searchParams.get("endDate"),
      };
      newSearch = `${url.search}&date=${JSON.stringify(date)}`;
    }
    if (!url.searchParams.get("city") || !url.searchParams.get("room")) {
      newSearch = "";
    }
    let res = await fetch(`http://localhost:5000/search-hotel${newSearch}`);
    const resData = await res.json();
    console.log(resData);
    return resData;
  } catch (err) {
    console.log(err);
  }
};
