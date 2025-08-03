import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 25%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        scale: 1,
      }}
      className="w-full h-[50vh] flex  flex-col justify-end p-[5%] select-none "
    >
      <h1 className="text-5xl font-black w-[100%] text-sky-200">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] mt-3  mb-3 text-white">
        {data.overview.slice(0, 200)}...
        <Link className="text-blue-500">more</Link>
      </p>
      <p className="text-white">
        <i class="text-yellow-400 ri-megaphone-fill"></i>
        {data.release_date || "No information"}
        <i class="ml-5 text-yellow-400 ri-album-fill"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link className="bg-[#6556CD] p-4 rounded text-white font-semibold w-[10vw] mt-5">
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
