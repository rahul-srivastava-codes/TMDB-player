import { useEffect, useState } from "react";
import Sidenav from "../../Partials/Sidenav";
import Topnav from "../../Partials/Topnav";
import instance from "../../utils/Axios";
import Header from "../../Partials/Header";
import HorizontalCards from "../../Partials/HorizontalCards";

function Home() {
  document.title = "SCDB | Homepage";
  const [wallpaper, setWallpaper] = useState(null);

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
  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
  }, [wallpaper]);
  return wallpaper ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <HorizontalCards />
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
}

export default Home;
