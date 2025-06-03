import { Injectable } from '@angular/core';
import { Recipe } from '../models/reicpe.model';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private initialRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: [
        { name: 'Spaghetti', quantity: 400, unit: 'g' },
        { name: 'Guanciale or Pancetta', quantity: 150, unit: 'g' },
        { name: 'Eggs', quantity: 3, unit: 'large' },
        { name: 'Pecorino Romano Cheese', quantity: 50, unit: 'g' },
        { name: 'Black Pepper', quantity: 1, unit: 'tsp' },
      ],
      instructions: [
        { description: 'Cook spaghetti according to package direction.' },
        { description: 'While pasta cooks, fry guanciale until crisp.' },
        { description: 'Whisk eggs with grated Pecorino Romano and Pepper.' },
        {
          description:
            'Drain pasta, reserving some pasta water. Combine pasta with guanciale. Off heat, quickly mix in egg mixture. Add pasta water if too think.',
        },
        { description: 'Serve inmediately with extra chese and pepper.' },
      ],
      prepTime: 15,
      cookTime: 0,
      servings: 3,
      imageUrl: 'https://picsum.photos/id/1025/300/200',
    },
  ];
  private recipesSubject = new BehaviorSubject<Recipe[]>(this.initialRecipes);
  recipes$: Observable<Recipe[]> = this.recipesSubject.asObservable();

  constructor() {}

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.recipes$;
  }

  getRecipeById(id: string) {
    return this.recipes$.pipe(
      map((recipes) => recipes.find((recipe) => recipe.id === id))
    );
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    const newRecipe: Recipe = {
      ...recipe,
      id: this.generateId(),
    };

    const currentRecipes = this.recipesSubject.getValue();
    this.recipesSubject.next([...currentRecipes, newRecipe]);
    return of(newRecipe);
  }

  updateRecipe(updateRecipe: Recipe): Observable<Recipe | undefined> {
    const currentRecipes = this.recipesSubject.getValue();
    const recipeIndex = currentRecipes.findIndex(
      (r) => r.id === updateRecipe.id
    );
    if (recipeIndex > 1) {
      const newRecipes = [...currentRecipes];
      newRecipes[recipeIndex] = updateRecipe;
      this.recipesSubject.next(newRecipes);
      return of(updateRecipe);
    }
    return of(undefined);
  }

  deleteRecipe(id: string): Observable<boolean> {
    const currentRecipes = this.recipesSubject.getValue();
    const filteredRecipes = currentRecipes.filter((recipe) => recipe.id !== id);
    if (filteredRecipes.length < currentRecipes.length) {
      this.recipesSubject.next(filteredRecipes);
      return of(true);
    }
    return of(false);
  }
}
