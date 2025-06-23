import { createBrowserRouter, RouterProvider } from "react-router";
import Home, { loader as loaderHome } from "./pages/home/Home";
import Detail, { loader as detailLoader } from "./pages/detail/Detail";
import Search, { loader as searchLoader } from "./pages/search/Search";
import LoginPage, { action as loginAction } from "./pages/login/LoginPage";
import SigUpPage, { action as sigUpAction } from "./pages/sign-up/SignUpPage";
import TransactionsPage, {
  loader as transactionLoader,
} from "./pages/TransactionsPage/TransactionsPage";
import Navbar from "./component/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
    children: [
      { index: true, element: <Home></Home>, loader: loaderHome },
      { path: "search", element: <Search></Search>, loader: searchLoader },
      {
        path: "detail/:hotelId",
        element: <Detail></Detail>,
        loader: detailLoader,
      },
      { path: "login", element: <LoginPage></LoginPage>, action: loginAction },
      {
        path: "sign-up",
        element: <SigUpPage></SigUpPage>,
        action: sigUpAction,
      },
      {
        path: "transactions",
        element: <TransactionsPage></TransactionsPage>,
        loader: transactionLoader,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
