import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Trending from "./Components/Home/Trending";

function App() {
  return (
    <div className="w-screen h-screen flex bg-[#1F1E24]">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
      </Routes>
    </div>
  );
}

export default App;
