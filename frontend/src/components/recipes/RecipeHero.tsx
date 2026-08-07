import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { Recipe } from "../../interfaces/recipe";

interface Props {
  recipe: Recipe;
}

const RecipeHero = ({ recipe }: Props) => {
  return (
    <div className="relative h-112.5">
      <img
        src={`${import.meta.env.VITE_API_URL}${recipe.image}`}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <Link
        to="/"
        className="absolute top-5 left-5 bg-white px-4 py-2 rounded-lg flex gap-2"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      <div className="absolute bottom-8 left-8 text-white">
        <span className="bg-orange-500 px-3 py-1 rounded-full">
          {recipe.category}
        </span>

        <h1 className="text-5xl font-bold mt-4">{recipe.title}</h1>

        <p className="mt-3 max-w-2xl">{recipe.description}</p>
      </div>
    </div>
  );
};

export default RecipeHero;
