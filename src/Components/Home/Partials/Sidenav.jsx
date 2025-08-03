import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="w-[20%] h-full  border-r-2 border-zinc-400 p-10 overflow-scroll">
      <h1
        className="text-2xl text-white
      font-bold mr-2"
      >
        <i className="text-[#6556CD] ri-tv-fill"></i>
        <span>SCSDB</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link
          to={"/trending"}
          className="hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-300 hover:scale-110 text-base"
        >
          <i class="text-white mr-2 ri-fire-fill"></i> Trending
        </Link>
        <Link
          to={"/popular"}
          className="hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-300 hover:scale-110 text-base"
        >
          <i class="text-white mr-2 ri-bard-fill"></i> Popular
        </Link>
        <Link
          to={"/movie"}
          className="hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-300 hover:scale-110 text-base"
        >
          <i class="text-white mr-2 ri-film-fill"></i> Movies
        </Link>
        <Link
          to={"/tv"}
          className="hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-300 hover:scale-110 text-base"
        >
          <i class="text-white mr-2 ri-tv-2-fill"></i>TV Shows
        </Link>
        <Link
          to={"/person"}
          className="hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-300 hover:scale-110 text-base"
        >
          <i class="text-white mr-2 ri-user-3-line"></i>People
        </Link>
      </nav>
      <hr className="border-1 text-transparent bg-zinc-100" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          Website - INFO
        </h1>

        <Link className="hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-300 hover:scale-110 text-base">
          <i class="text-white mr-2 ri-tv-2-fill"></i>About
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white p-3 rounded-lg duration-300 hover:scale-110 text-base">
          <i class="text-white mr-2 ri-user-3-line"></i>Contact
        </Link>
      </nav>
    </div>
  );
}

export default Sidenav;
