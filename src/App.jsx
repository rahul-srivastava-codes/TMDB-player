import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Trending from "./Components/Home/Trending";
import Popular from "./Components/Home/Popular";
import Movie from "./Components/Home/Movie";
import Tvshows from "./Components/Home/Tvshows";
import Person from "./Components/Home/People";
import Moviedetails from "./Components/Home/Moviedetails";
import Tvdetails from "./Components/Home/Tvdetails";
import Persondetails from "./Components/Home/Persondetails";
import Trailer from "./Components/Home/Partials/Trailer";
import Notfound from "./Components/Home/Notfound";

function App() {
  return (
    <div className="w-screen h-screen flex bg-[#1F1E24]">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
        <Route
          path="/movie/details/:id"
          element={<Moviedetails></Moviedetails>}
        >
          <Route
            path="/movie/details/:id/trailer"
            element={<Trailer></Trailer>}
          ></Route>
        </Route>
        <Route path="/tv" element={<Tvshows />}></Route>
        <Route path="/tv/details/:id" element={<Tvdetails></Tvdetails>}>
          <Route
            path="/tv/details/:id/trailer"
            element={<Trailer></Trailer>}
          ></Route>
        </Route>
        <Route path="/person" element={<Person />}></Route>
        <Route
          path="/person/details/:id"
          element={<Persondetails></Persondetails>}
        ></Route>
        <Route path="*" element={<Notfound></Notfound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
