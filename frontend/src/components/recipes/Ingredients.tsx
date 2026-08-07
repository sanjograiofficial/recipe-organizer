interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}

interface Props {
  ingredients: Ingredient[];
}

const Ingredients = ({ ingredients }: Props) => {
  return (
    <section className="bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-6">Ingredients</h2>

      <ul className="space-y-3">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className="flex gap-3 items-start">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
            <span>
              <span className="font-semibold">{ingredient.quantity}</span>{" "}
              {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Ingredients;
