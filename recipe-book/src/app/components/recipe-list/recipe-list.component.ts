import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/reicpe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',

  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getAllRecipes();
  }

  getShortDescription(recipe: Recipe): string {
    if (recipe.description) {
      return recipe.description.length > 100
        ? recipe.description.substring(0, 97) + '...'
        : recipe.description;
    }

    if (recipe.ingredients && recipe.ingredients.length > 0) {
      return `Ingredients: ${recipe.ingredients
        .slice(0, 2)
        .map((i) => i.name)
        .join(', ')}...`;
    }
    return 'No description available.';
  }
}
