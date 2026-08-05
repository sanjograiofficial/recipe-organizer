import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipe.api";

interface Recipe {
    id: number;
    title: string;
    description: string;
}

const Recipe = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    useEffect(() => {
        const fetchRecipes = async () => {

            try {
                const response = await getRecipes()
                setRecipes(response.data)

            } catch (e) {
                console.log(e);
            }
        }
        fetchRecipes();
    })
    return (
        <div>
            {recipes.map((recipe) => {
                return <div key={recipe.id}>
                    {recipe.title}
                </div>
            })}
        </div>
    )
}

export default Recipe
