import Header from "../../component/Header";
import Citys from "../../component/Citys";
import TypeHotel from "../../component/TypeHotel";
import HotelList from "../../component/HotelList";
import FormSign from "../../component/FormSign";
import Footer from "../../component/Footer";
const Home = () => {
  return (
    <div>
      <Header></Header>
      <Citys></Citys>
      <TypeHotel></TypeHotel>
      <HotelList></HotelList>
      <FormSign></FormSign>
      <Footer></Footer>
    </div>
  );
};

export default Home;

export const loader = async function () {
  try {
    const res = await fetch("http://localhost:5000/hotel");
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};
