import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notfound from "../Notfound";
function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="bg-[rgba(0,0,0,0.9)] absolute top-0 left-0 z-[100] w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className=" absolute ri-close-fill hover:text-[#6556CD] hover:cursor-pointer text-3xl text-white right-[5%] top-[5%]"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          controls
          height={800}
          width={1500}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        ></ReactPlayer>
      ) : (
        <Notfound />
      )}
    </div>
  );
}

export default Trailer;
