import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Containers from "./pages/Containers";
import Boxes from "./pages/Boxes";
import Plans from "./pages/Plans";
import Calculate from "./pages/Calculate";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/containers" element={<Containers />} />
        <Route path="/boxes" element={<Boxes />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/calculate" element={<Calculate />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
