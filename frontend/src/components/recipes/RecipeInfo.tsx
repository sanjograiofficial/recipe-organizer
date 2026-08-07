import { Clock, ChefHat, Users, Tag } from "lucide-react";
import type { Recipe } from "../../interfaces/recipe";

interface Props {
  recipe: Recipe;
}

const RecipeInfo = ({ recipe }: Props) => {
  return (
    <div className="grid md:grid-cols-4 gap-5">
      <InfoCard
        icon={<Clock />}
        title="Prep"
        value={`${recipe.prepTime} mins`}
      />

      <InfoCard
        icon={<ChefHat />}
        title="Cook"
        value={`${recipe.cookTime} mins`}
      />

      <InfoCard icon={<Users />} title="Servings" value={recipe.servings} />

      <InfoCard icon={<Tag />} title="Difficulty" value={recipe.difficulty} />
    </div>
  );
};

export default RecipeInfo;

const InfoCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) => (
  <div className="bg-white shadow rounded-xl p-5">
    <div className="text-orange-500">{icon}</div>

    <h3 className="font-semibold mt-2">{title}</h3>

    <p>{value}</p>
  </div>
);
