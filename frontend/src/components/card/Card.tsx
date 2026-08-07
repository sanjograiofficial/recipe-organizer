import React from "react";
import { useNavigate } from "react-router-dom";

interface CardData {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface ImageCardProps {
  item: CardData;
}

const ImageCard: React.FC<ImageCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${item.id}`);
  };
  return (
    <div
      className="group relative h-105 w-80 overflow-hidden rounded-2xl shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      {/* Background Image */}
      <img
        src={`${import.meta.env.VITE_API_URL}${item.image}`}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent transition-all duration-500 group-hover:from-black/90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {/* Title */}
        <h2 className="text-2xl font-bold transition-all duration-500 group-hover:-translate-y-2">
          {item.title}
        </h2>

        {/* Description */}
        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-700 ease-in-out group-hover:max-h-40 group-hover:opacity-100 mt-2">
          <p className="text-sm leading-6 text-gray-200">{item.description}</p>
        </div>

        {/* Button */}
        <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
