import "./SearchPopup.css";
import { Form } from "react-router";
import { useState } from "react";
const SearchForm = function () {
  const getMinDateHandler = function () {
    const newDate = new Date();
    const date = newDate.getDate().toString().padStart(2, 0);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, 0);
    const dateString = `${year}-${month}-${date}`;
    return dateString;
  };
  const [minOutDate, setMinOutDate] = useState(getMinDateHandler());

  const chanDateStartHandler = function (event) {
    setMinOutDate(event.target.value);
  };
  return (
    <Form className="SearchPopup" method="GET">
      <h2>Search</h2>
      <div className="SearchPopup_item">
        <label htmlFor="city">City</label>
        <input name="city" id="city" required></input>
      </div>
      <div className="SearchPopup_item">
        <label htmlFor="startDate">Check-in Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          min={getMinDateHandler()}
          onChange={chanDateStartHandler}
        />
      </div>
      <div className="SearchPopup_item">
        <label htmlFor="endDate">Check-out Date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          required
          min={minOutDate}
        />
      </div>
      <div className="SearchPopup_option">
        <h5>Option</h5>
        <div className="SearchPopup_option-item">
          <label htmlFor="peoples">Peoples</label>
          <input
            name="peoples"
            id="peoples"
            type="number"
            min={1}
            required
            defaultValue={1}
          ></input>
        </div>
        <div className="SearchPopup_option-item">
          <label htmlFor="room">Room</label>
          <input
            name="room"
            id="room"
            type="number"
            min={1}
            defaultValue={1}
          ></input>
        </div>
      </div>
      <button>Search</button>
    </Form>
  );
};
export default SearchForm;
