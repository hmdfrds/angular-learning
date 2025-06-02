export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface InstructionStep {
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  imageUrl?: string;
}
