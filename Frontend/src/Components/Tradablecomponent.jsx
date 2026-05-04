const Tradablecomponent = ({ Tradableimg, Tradablename }) => {
  return (
    <div className="flex gap-2.5">
      <img src={Tradableimg} alt="" className="max-w-15 max-h-15 " />
      <h1>{Tradablename}</h1>
    </div>
  );
};

export default Tradablecomponent;
