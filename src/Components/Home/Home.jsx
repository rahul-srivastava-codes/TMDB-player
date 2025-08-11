import { useEffect, useState } from "react";
import Sidenav from "./Partials/Sidenav";
import Topnav from "./Partials/Topnav";
import instance from "../../utils/Axios";
import Header from "./Partials/Header";
import HorizontalCards from "./Partials/HorizontalCards";
import Dropdown from "./Partials/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title = "SCDB | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await instance.get(`/trending/all/day`);

      setWallpaper(
        data.results[(Math.random() * data.results.length).toFixed()]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await instance.get(`/trending/${category}/day`);

      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [wallpaper, trending, category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between p-10">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <h1>
      <Loading></Loading>
    </h1>
  );
}

export default Home;
