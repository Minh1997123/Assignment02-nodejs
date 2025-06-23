import "./NavBarItem.css";
const NavBarItem = function (props) {
  return (
    <li className={`Navbar-item ${props.active && "active"}`}>
      <i className={`fa ${props.icon}`}></i>
      <p>{props.type}</p>
    </li>
  );
};
export default NavBarItem;
