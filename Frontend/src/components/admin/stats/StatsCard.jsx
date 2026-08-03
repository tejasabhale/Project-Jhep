const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div
      className="
bg-white
rounded-xl
shadow
p-5
flex
items-center
gap-4
"
    >
      <div
        className="
p-3
rounded-lg
bg-orange-100
"
      >
        <Icon />
      </div>

      <div>
        <p
          className="
text-gray-500
text-sm
"
        >
          {title}
        </p>

        <h2
          className="
text-3xl
font-bold
"
        >
          {value}
        </h2>
      </div>
    </div>
  );
};

export default StatsCard;
