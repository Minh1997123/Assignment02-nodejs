import style from "./SignUpPage.module.css";
import { Form, redirect } from "react-router";

const SigUpPage = function () {
  return (
    <Form className={style.form} method="POST">
      <h1>Sign Up</h1>
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
      <button>Create Account</button>
    </Form>
  );
};

export default SigUpPage;

// export const action = async function ({ request }) {
//   const formData = await request.formData();
//   const reqData = Object.fromEntries(formData.entries());
//   const res = await fetch("http://localhost:5000/sign-up", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(reqData),
//   });
//   const resData = await res.json();
//   if (res.status === 401) {
//     return alert(resData.message);
//   }
//   alert("dang ky tai khoan thanh cong");
//   return redirect("/login");
// };
