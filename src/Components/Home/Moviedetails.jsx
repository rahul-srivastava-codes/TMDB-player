import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { asyncloadmovie } from "../../Store/actions/Movieactions";
import { useParams } from "react-router-dom";
import { removemovie } from "../../Store/reducers/MovieSlice";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./Partials/HorizontalCards";

function Moviedetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  {
    console.log(info.details);
  }
  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "top 25%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        scale: 1,
      }}
      className="relative w-screen h-[180vh]  px-[10%] "
    >
      {/* Part 1 navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center  gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556CD] hover:cursor-pointer"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i class="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
        >
          <i class="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDB
        </a>
      </nav>

      {/* part 2 poster and details  */}
      <div className="w-full flex">
        <img
          className="h-[50vh]  object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.backdrop_path || info.details.poster_path
          }`}
          alt=""
        />
        <div className="content ml-[2%] text-white">
          <h1 className="text-2xl font-black  ">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}
            <small className="text-xl font-bold text-zinc-300">
              ({info.details.release_date.split("-")[0]})
            </small>
          </h1>
          <div className="mt-2 mb-5 flex  items-center gap-x-5 gap-y-10">
            <span className="rounded-full  text-white w-[7vh] h-[5vh] flex justify-center items-center text-xl bg-yellow-600">
              {(info.details.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-5">
              User Score
            </h1>
            <h1>({info.details.release_date})</h1>
            <h1>{info.details.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.details.runtime}min</h1>
          </div>
          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.details.tagline}
          </h1>
          <h1 className="text-xl mt-2 ">Overview</h1>
          <p className="text-xm mb-1 mr-5 max-w-fit">{info.details.overview}</p>
          <h1 className="text-xl mt-1 ">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>
          <Link
            className="p-5 bg-[#6556CD] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i class="text-xl ri-play-fill mr-3 "></i>
            Play Trailer
          </Link>
        </div>
      </div>
      {/* part 3 Available on platform  */}
      <div className="w-[80%]  flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={`${w.provider_name}`}
                className="w-[7vh] h-[7vh] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={`${w.provider_name}`}
                className="w-[7vh] h-[7vh] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={`${w.provider_name}`}
                className="w-[7vh] h-[7vh] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>
      {/* part 4 Seasons*/}

      {/* part 4 Seasons */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-semibold text-white">Seasons</h1>
      <div className="w-[100%] overflow-y-hidden flex mb-5 p-5">
        {info.details.seasons.length > 0 ? (
          info.details.seasons.map((s, i) => (
            <div key={i} className="w-[15vh] m-[8%]">
              <img
                className="h-[30vh] object-cover shadown-[8px_17px_38px_2px_rgba(0,0,0,0.5)] min-w-[14vw]"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                alt=""
              />
              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
                {s.name || s.title || s.original_name || s.original_title}
              </h1>
            </div>
          ))
        ) : (
          <h1>Not Loading</h1>
        )}
      </div>

      {/* part 5 Recommendations */}
      <hr className="mt-10  mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-semibold text-white">
        Recommendations & Similar stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      ></HorizontalCards>
      <Outlet></Outlet>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default Moviedetails;
