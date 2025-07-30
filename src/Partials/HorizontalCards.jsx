function HorizontalCards({ data }) {
  return (
    <div className="w-[100%] overflow-y-hidden flex mb-5 p-5">
      {data.map((d, i) => (
        <div key={i} className="min-w-[15%] h-full bg-zinc-900 mr-5 mb-5">
          <img
            className="w-full h-[45%] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.poster_path
            }`}
            alt=""
          />
          <div className="text-white p-3 h-[45%] ">
            <h1 className="text-xl font-semibold mt-3 ">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className=" ">
              {d.overview.slice(0, 50)}...
              <span className="text-zinc-500">more</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HorizontalCards;
