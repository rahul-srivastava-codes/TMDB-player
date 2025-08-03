import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Top_nav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import instance from "../../utils/Axios";
import Loading from "./Loading";
import Cards from "./Partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  const navigate = useNavigate();
  document.title = "SCDB | Trending";
  const [trending, settrending] = useState([]);
  const [duration, setduration] = useState("day");
  const [category, setcategory] = useState("all");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await instance.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        settrending((prevstate) => [...prevstate, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
      // settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = () => {
    if (trending === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [duration, category]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className=" px-[5%] w-full   flex items-center justify-between gap-5 ">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          {" "}
          <i
            onClick={() => navigate(-1)}
            className="bg-amber-300"
            class="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[80%] gap-2">
          <Top_nav />
          <Dropdown
            title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length} //This is important field to render the next data
        next={GetTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality

        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3
            className="text-3xl text-amber-400"
            style={{ textAlign: "center" }}
          >
            &#8595; Pull down to refresh
          </h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        <Cards data={trending} title={category}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
