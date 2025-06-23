import "../../component/Detail.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DetailImg from "../../component/DetailImg";
import { redirect, useLoaderData, useParams, useNavigate } from "react-router";
import { DateRange } from "react-date-range";
import BookForm from "../../component/detail/book-form/BookForm";
import SelectRoomItem from "../../component/detail/select-room-item/SelectRoomItem";

const Detail = () => {
  const loaderData = useLoaderData();
  const auth = useSelector((state) => state.auth);
  const [selectRoom, setSlelectRoom] = useState([]);
  const [isReserve, setIsReserve] = useState(false);
  const [numberRoom, setNumberRoom] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  const [dateRange, serDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const resesrveHandler = function () {
    setIsReserve(true);
  };

  // ham lay so luong phong duoc dat
  const getNumberRoomHandler = function (roomCurrent, isCheck) {
    if (isCheck) {
      setNumberRoom((state) => [...state, roomCurrent]);
    } else {
      setNumberRoom((state) => {
        return state.filter((room) => {
          return room.room !== roomCurrent.room;
        });
      });
    }
  };

  useEffect(
    function () {
      // ham lay thong tin phong khi thay doi ngay
      const getRoom = async function () {
        const query = `hotelId=${loaderData._id}&dateRange=${JSON.stringify(
          dateRange[0]
        )}`;
        const res = await fetch(`http://localhost:5000/room?${query}`);
        const resData = await res.json();
        setSlelectRoom(resData);
      };
      // ham tinh tong so tien
      const totalHandler = function () {
        const dateSelected =
          Math.floor(
            (dateRange[0].endDate - dateRange[0].startDate) /
              1000 /
              60 /
              60 /
              24
          ) + 1;
        let total = 0;
        numberRoom.map((item) => {
          total = total + item.price;
        });
        const newTotalBill = total * dateSelected;
        setTotalBill(newTotalBill);
      };
      getRoom();
      totalHandler();
    },
    [dateRange, isReserve, numberRoom]
  );

  const submitHandler = async function (event) {
    event.preventDefault();
    console.log(auth);
    if (!auth.isLogin) {
      return alert("moi dang nhap de dat phong");
    }
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const room = [];
    for (let key in data) {
      if (Number(key) == Number(data[key])) {
        room.push(key);
      }
    }
    const newData = {
      ...data,
      room,
      date: dateRange,
      dateStart: dateRange[0].startDate,
      dateEnd: dateRange[0].endDate,
      price: totalBill,
      email: auth.email,
    };
    const res = await fetch(
      `http://localhost:5000/transaction?hotelId=${params.hotelId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    const resData = await res.json();
    if (res.status === 404) {
      return console.log(resData);
    }
    if (res.status === 401) {
      return alert(resData);
    }
    return navigate("/transactions");
  };
  return (
    <div className="Detail">
      <div className="Detail-header">
        <div className="Detail-header-info">
          <h2>{loaderData.name}</h2>
          <p>{loaderData.address}</p>
          <p className="Detail-header-info-distance">
            <strong>{`Excellent location - ${loaderData.distance}m from center`}</strong>
          </p>
          <p>
            <strong>{`Book a stay over $${
              loaderData.rooms.length ? loaderData.rooms[0].price : 0
            } at this property and get a free airport taxi`}</strong>
          </p>
        </div>
        <button onClick={resesrveHandler}>Reserve or Book Now!</button>
      </div>
      <div className="Detail-image">
        {loaderData.photos.map(function (photo) {
          return <DetailImg url={photo} key={photo}></DetailImg>;
        })}
      </div>
      <div className="Detail-Footer">
        <div className="Detail-Footer-description">
          <h2>{loaderData.title}</h2>
          <p>{loaderData.desc}</p>
        </div>
        <div className="Detail-Footer-rate">
          <div className="Detail-Footer-rate-price">
            <h2>{`$${
              loaderData.rooms.length ? loaderData.rooms[0].price : 0
            } `}</h2>
            <h2>(1 nights)</h2>
          </div>
          <button onClick={resesrveHandler}>Resesrve or Book Now!</button>
        </div>
      </div>
      {isReserve && (
        <form className="form-booking" onSubmit={submitHandler}>
          <div className="form-booking-date">
            <h2>Dates</h2>
            <DateRange
              minDate={new Date()}
              editableDateInputs={true}
              onChange={(value) => {
                serDateRange([value.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            ></DateRange>
          </div>
          <BookForm></BookForm>
          <div className="form-booking__select">
            <h1>Select Room</h1>
            {selectRoom.map((item) => {
              return (
                <SelectRoomItem
                  key={item._id}
                  data={item}
                  getNumberRoomHandler={getNumberRoomHandler}
                ></SelectRoomItem>
              );
            })}
          </div>
          <div className="form-booking__pay">
            <h1>Total Bill : {totalBill}$</h1>
            <select name="payment" id="payment" required>
              <option value="Credit">Select Payment Method</option>
              <option value="Credit">Credit </option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
            </select>
            <button>Reserve Now</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Detail;

export const loader = async function ({ params }) {
  const res = await fetch(`http://localhost:5000/detail/${params.hotelId}`);
  if (res.status === 404) {
    redirect("/");
  }
  const resData = await res.json();
  return resData;
};
