import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../components/api/client";

import type { Recipe } from "../../interfaces/recipe";

import RecipeHero from "../../components/recipes/RecipeHero";
import RecipeInfo from "../../components/recipes/RecipeInfo";
import Ingredients from "../../components/recipes/Ingredients";
import Instructions from "../../components/recipes/Instructions";
import Nutrition from "../../components/recipes/Nutrition";

const RecipePage = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await api(`/recipes/${id}`);
        setRecipe(data.data);        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading recipe...
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Recipe not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <RecipeHero recipe={recipe} />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <RecipeInfo recipe={recipe} />

          <Ingredients ingredients={recipe.ingredients} />

          <Instructions instructions={recipe.steps} />
        </div>

        <div className="space-y-8">
          <Nutrition recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
