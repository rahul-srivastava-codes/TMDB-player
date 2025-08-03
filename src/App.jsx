import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Trending from "./Components/Home/Trending";
import Popular from "./Components/Home/Popular";
import Movie from "./Components/Home/Movie";
import Tvshows from "./Components/Home/Tvshows";
import Person from "./Components/Home/People";

function App() {
  return (
    <div className="w-screen h-screen flex bg-[#1F1E24]">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/tv" element={<Tvshows />}></Route>
        <Route path="/person" element={<Person />}></Route>
      </Routes>
    </div>
  );
}

export default App;
