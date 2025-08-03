import loader from "../../../public/second.gif";
function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[50%] object-cover bg-yellow-300" src={loader} alt="" />
    </div>
  );
}

export default Loading;
