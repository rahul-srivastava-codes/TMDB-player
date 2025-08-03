import { Link } from "react-router-dom";

function Cards({ data, title }) {
  return (
    <div className=" flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24]">
      {console.log(data)}
      {data.map((c, i) => (
        <Link key={i} className="w-[25vh] mr-[5%] relative mb-[5%]">
          <img
            className="h-[40vh] object-cover shadown-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.poster_path || c.profile_path
            }`}
            alt=""
          />
          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold  ">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.average_vote && (
            <div className="absolute -right-[10%] bottom-[25%] rounded-full  text-white w-[7vh] h-[5vh] flex justify-center items-center text-xl bg-yellow-600">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
