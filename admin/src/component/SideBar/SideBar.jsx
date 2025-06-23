import { Outlet, Link } from "react-router";
import style from "./SideBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const SideBar = function () {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(function () {
    if (!auth.isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={style.layout}>
      <h1>Admin Page</h1>
      <span></span>
      <nav className={style.sidebar}>
        {!auth.isLogin ? (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/sign-up">
              <button>Signup</button>
            </Link>
          </>
        ) : (
          <>
            <h4>Main</h4>
            <Link to="/">Dashboard</Link>
            <h4>LIST</h4>
            <span>Users</span>
            <Link to="/hotel-list">Hotels</Link>
            <Link to="/room-list">Rooms</Link>
            <Link to="/transactions">Transacitons</Link>
            <h4>NEW</h4>
            <Link to="/add-hotel">New Hotel</Link>
            <Link to="/add-room">New Room</Link>
            <h4>USER</h4>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SideBar;
