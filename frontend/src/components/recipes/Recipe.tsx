import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipe.api";

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
                return <div key={recipe.id} className="border h-80 w-80">
                    <div className="border h-full w-full bg-[{recipe.image}]" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}/uploads/recipe${recipe.image})` }} >

                    </div>

                </div>
            })}
        </div>
    )
}

export default Recipe
