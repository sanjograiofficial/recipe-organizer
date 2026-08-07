import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipe.api";
import ImageCard from "../card/Card";

interface Recipe {
    id: number;
    title: string;
    description: string;
    image: string;
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
                return <ImageCard item={recipe} />

            })}
        </div>
    )
}

export default Recipe
