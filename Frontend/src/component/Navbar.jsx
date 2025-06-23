import { useSelector, useDispatch } from "react-redux";
import NavBarItem from "./NavBarItem";
import "./Navbar.css";
import { Link, Outlet } from "react-router";
import { logout } from "../store/slices";
const data = [
  {
    type: "Stays",
    icon: "fa-bed",
    active: true,
  },
  {
    type: "Flights",
    icon: "fa-plane",
    active: false,
  },
  {
    type: "Car rentals",
    icon: "fa-car",
    active: false,
  },
  {
    type: "Attractions",
    icon: "fa-bed",
    active: false,
  },
  {
    type: "Airport taxis",
    icon: "fa-taxi",
    active: false,
  },
];

const Navbar = function () {
  const authStore = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = function () {
    dispatch(logout());
  };
  return (
    <>
      <div className="Navbar">
        <header>
          <Link to="/">
            <p>Booking Wesbsite</p>
          </Link>
          <div className="list-button">
            {authStore.isLogin ? (
              <>
                <p>{authStore.email}</p>
                <Link to="/transactions">
                  <button>Transactions</button>
                </Link>
                <button onClick={logoutHandler}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/sign-up">
                  <button>Register</button>
                </Link>
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </>
            )}
          </div>
        </header>
        <ul>
          {data.map(function (item) {
            return (
              <NavBarItem
                key={item.type}
                type={item.type}
                active={item.active}
                icon={item.icon}
              ></NavBarItem>
            );
          })}
        </ul>
      </div>
      <Outlet></Outlet>
    </>
  );
};
export default Navbar;
