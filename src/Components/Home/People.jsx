import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Top_nav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import instance from "../../utils/Axios";
import Loading from "./Loading";
import Cards from "./Partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function person() {
  document.title = "SCDB | Persons";
  const navigate = useNavigate();

  const [person, setperson] = useState([]);
  const [category, setcategory] = useState("popular");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [error, setError] = useState(false); // Optional error flag

  const GetPerson = async () => {
    try {
      const url = `/person/${category}?page=${page}`;
      console.log("Fetching:", url); // helpful debug
      const { data } = await instance.get(url);

      if (data.results && data.results.length > 0) {
        setperson((prevstate) => [...prevstate, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setpage(1);
      setperson([]);
      sethasMore(true);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  if (error) {
    return (
      <div className="text-red-500 text-center mt-5">
        Something went wrong fetching data.
      </div>
    );
  }

  return person.length > 0 ? (
    <div className="w-screen h-screen">
      <div className=" px-[5%] w-full flex items-center justify-between gap-5">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] hover:cursor-pointer"
          ></i>
          Person
          <small className="ml-2 text-sm text-zinc-600">{category}</small>
        </h1>
        <div className="flex items-center w-[80%] gap-2">
          <Top_nav />
          <Dropdown
            title="Category"
            options={[
              "popular",
              "top_rated",
              "upcomingon_the_air",
              "airing_today",
            ]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h4 className="text-center text-zinc-400">Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
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
        <Cards data={person} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default person;
