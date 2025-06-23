import style from "./SelectRoomItem.module.css";

const SelectRoomItem = function (props) {
  const rooms = props.data;
  const getNumberRoomHandler = props.getNumberRoomHandler;

  return (
    <section className={style.item}>
      <div className={style.info}>
        <h3>{rooms.title}</h3>
        <span>{rooms.desc}</span>
        <span>
          Max people :<strong>{rooms.maxPeople}</strong>
        </span>
        <span> $ {rooms.price}</span>
      </div>
      <div className={style.select}>
        {rooms.roomNumbers.map((room) => {
          return (
            <div key={room}>
              <label htmlFor={`room_${room}`}>{room}</label>
              <input
                type="checkbox"
                name={`${room}`}
                id={`${room}`}
                onClick={(event) =>
                  getNumberRoomHandler(
                    { price: rooms.price, room },
                    event.target.checked
                  )
                }
                value={room}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default SelectRoomItem;
