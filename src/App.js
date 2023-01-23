import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinDetails from "./component/CoinDetails";
import Coins from "./component/Coins";
import Exchanges from "./component/Exchanges";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./component/Home";



function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coins/coin-details/:id" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
