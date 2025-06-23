import "./Footer.css";
const FooterItem = function (props) {
  return (
    <ul className="Footer-item">
      {props.values.map(function (value) {
        return <li key={value}>{value}</li>;
      })}
    </ul>
  );
};
export default FooterItem;
