import style from "./loginPage.module.css";
import { login } from "../../store/slices";
import { Form, redirect } from "react-router";
import store from "../../store/store";

const LoginPage = function () {
  return (
    <Form className={style.form} method="POST">
      <h1>Login</h1>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
      ></input>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      ></input>
      <button>Login</button>
    </Form>
  );
};

export default LoginPage;

export const action = async function ({ request }) {
  const formData = await request.formData();
  const reqData = Object.fromEntries(formData.entries());
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  });
  const resData = await res.json();
  if (res.status === 401) {
    return alert(resData.message);
  }
  store.dispatch(login(resData.email));
  return redirect("/");
};
