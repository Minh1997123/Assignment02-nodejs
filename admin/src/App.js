import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import SideBar from "./component/SideBar/SideBar";
import DashBoardPage, {
  loader as loaderHome,
} from "./page/DashboardPage/DashboardPage.jsx";
import HotelListPage, {
  loader as hotelListLoader,
} from "./page/HotelistPage/HotelListPage.jsx";
import HotelAddPage, {
  action as hotelAddAction,
} from "./page/HotelAddPage/HotelAddPage.jsx";
import RoomListPage, {
  loader as roomListLoader,
} from "./page/RoomsListPage/RoomsListPage.jsx";
import RoomAddPage, {
  loader as roomAddLoader,
  action as roomAddAction,
} from "./page/RoomAddPage/RoomAddPage.jsx";
import TransactionsListPage, {
  loader as transactionLoader,
} from "./page/TransactionsListPage/TransactionsListPage.jsx";
import SigUpPage from "./page/sign-up/SignUpPage.jsx";
import LoginPage, { action as loginAction } from "./page/login/LoginPage.jsx";

import store from "./store/store.js";
import "./App.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SideBar></SideBar>,
    children: [
      {
        index: true,
        element: <DashBoardPage></DashBoardPage>,
        loader: loaderHome,
      },
      {
        path: "hotel-list",
        element: <HotelListPage></HotelListPage>,
        loader: hotelListLoader,
      },
      {
        path: "add-hotel",
        element: <HotelAddPage></HotelAddPage>,
        action: hotelAddAction,
      },
      {
        path: "room-list",
        element: <RoomListPage></RoomListPage>,
        loader: roomListLoader,
      },
      {
        path: "add-room",
        element: <RoomAddPage></RoomAddPage>,
        loader: roomAddLoader,
        action: roomAddAction,
      },
      {
        path: "transactions",
        element: <TransactionsListPage></TransactionsListPage>,
        loader: transactionLoader,
      },
      {
        path: "login",
        element: <LoginPage></LoginPage>,
        action: loginAction,
      },
      {
        path: "sign-up",
        element: <SigUpPage></SigUpPage>,
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
