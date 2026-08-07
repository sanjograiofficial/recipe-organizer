export interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}

export interface Instruction {
  id: number;
  order: number;
  description: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;

  prepTime: number;
  cookTime: number;
  servings: number;

  difficulty: string;
  category: string;

  ingredients: Ingredient[];
  steps: Instruction[];

  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}
