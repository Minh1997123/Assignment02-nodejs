import "./Header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { Form } from "react-router";

const HeaderForm = function () {
  const [isShowDate, setIsShowDate] = useState(false);
  const [dateRange, serDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <Form className="header-form" method="GET" action="/search">
      <div>
        <i className="fa fa-bed"></i>
        <input type="text" name="city" className="form-input"></input>
      </div>
      <div>
        <div className={`popup_input ${!isShowDate && "hiden"}`}>
          <DateRange
            minDate={new Date()}
            editableDateInputs={true}
            onChange={(value) => serDateRange([value.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          ></DateRange>
        </div>
        <i className="fa fa-calendar" />
        <input
          type="text"
          className="form-input"
          name="date"
          id="date"
          onFocus={() => setIsShowDate(true)}
          value={JSON.stringify(dateRange[0])}
          readOnly
        ></input>
      </div>
      <div>
        <i className="fa fa-female"></i>
        <input
          type="number"
          className="form-input"
          name="room"
          id="room"
          min={1}
          defaultValue={1}
        ></input>
      </div>
      <button>Search</button>
    </Form>
  );
};
export default HeaderForm;
