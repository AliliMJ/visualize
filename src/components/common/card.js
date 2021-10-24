const Card = ({ title, src, description }) => (
  <div className="flex flex-col items-center w-40 h-full p-3">
    <div className="text-xl font-bold">{title}</div>
    <img src={src} alt={`${title}`} />
    <div className="text-xs text-gray-300 text-left">{description}</div>
  </div>
);

export default Card;
