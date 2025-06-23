import "./FormSign.css";
const FormSign = function () {
  return (
    <section className="FormsSign">
      <h1>Save time , save money</h1>
      <p>Sign Up and we'll send the best deals to you</p>
      <form className="FormsSign_form">
        <input placeholder="Your Email"></input>
        <button>Subscribe</button>
      </form>
    </section>
  );
};
export default FormSign;
