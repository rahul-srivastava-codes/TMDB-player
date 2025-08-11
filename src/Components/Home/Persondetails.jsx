import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { asyncloadperson } from "../../Store/actions/personactions";
import { useParams } from "react-router-dom";
import { removeperson } from "../../Store/reducers/personSlice";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./Partials/HorizontalCards";
import Dropdown from "./Partials/Dropdown";

function persondetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="w-screen overflow-scroll px-[10%] bg-[#1F1E24] py-[5%]">
      {/* Part 1 navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center  gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556CD] hover:cursor-pointer"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* Part 2 left poster and details */}
        <div className="w-[20%]">
          <img
            className="h-[35vh]  object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt=""
          />
          <hr className="mt-10  mb-5 border-none h-[2px] bg-zinc-500" />
          {/* Social Media links */}
          <div className="tet-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
            >
              <i class="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
            >
              <i class="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
            >
              <i class="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://twitter.com/${info.externalid.twitter_id}/`}
            >
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal Information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>
          <h1 className="text-lg text-zinc-400">Known For</h1>
          <h1 className=" text-zinc-400">
            {info.details.known_for_department}
          </h1>
          <h1 className="text-lg text-zinc-400 mt-3">Gender</h1>
          <h1 className=" text-zinc-400">
            {info.details.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-lg text-zinc-400">Birthday</h1>
          <h1 className=" text-zinc-400">{info.details.birthday}</h1>
          <h1 className="text-lg text-zinc-400">Death Day</h1>
          <h1 className=" text-zinc-400">
            {info.details.deathday ? info.details.deathday : "Still Alive"}
          </h1>
          <h1 className="text-lg text-zinc-400">Place of Birth</h1>
          <h1 className=" text-zinc-400">{info.details.place_of_birth}</h1>
          <h1 className="text-lg text-zinc-400">Also known as</h1>
          <h1 className=" text-zinc-400">
            {info.details.also_known_as.join(", ")}
          </h1>
        </div>
        {/* Part 3 right details and information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.details.name}
          </h1>
          <h1 className="text-lg text-zinc-400">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.details.biography}</p>
          <h1 className="text-lg text-zinc-400">Known for</h1>
          <HorizontalCards data={info.combinedCredits.cast}></HorizontalCards>
          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              className="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            ></Dropdown>
          </div>
          <div className="w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,0.5)] mt-5 border-2 border-zinc-700 p-5 list-disc text-zinc-400">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5 mt-3">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default persondetails;
