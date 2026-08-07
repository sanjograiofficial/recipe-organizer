import type { Recipe } from "../../interfaces/recipe";

interface Props {
  recipe: Recipe;
}

const Nutrition = ({ recipe }: Props) => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Nutrition</h2>

      <Row title="Calories" value={`${recipe.calories} kcal`} />
      <Row title="Protein" value={`${recipe.protein} g`} />
      <Row title="Carbs" value={`${recipe.carbs} g`} />
      <Row title="Fat" value={`${recipe.fat} g`} />
    </div>
  );
};

export default Nutrition;

const Row = ({ title, value }: { title: string; value: string }) => (
  <div className="flex justify-between py-2 border-b">
    <span>{title}</span>
    <span>{value}</span>
  </div>
);
