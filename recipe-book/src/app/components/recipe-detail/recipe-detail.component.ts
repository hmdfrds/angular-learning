import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, Observable, of, Subscription, switchMap } from 'rxjs';
import { Recipe } from '../../models/reicpe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe$: Observable<Recipe | undefined | null>;
  private routeSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipe$ = of(null);
  }

  ngOnInit(): void {
    this.recipe$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return this.recipeService.getRecipeById(id).pipe(
            catchError((error) => {
              console.error('Error fetching recipe:', error);
              return of(undefined);
            })
          );
        }
        return of(undefined);
      })
    );
  }

  editRecipe(recipeId: string) {
    this.router.navigate(['/recipes', recipeId, 'edit']);
  }

  deleteRecipe(recipeId: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(recipeId).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/recipes']);
          } else {
            alert(
              'Failed to delete the recipe. It might have already been removed.'
            );
            this.router.navigate(['/recipes']);
          }
        },
        error: (err) => {
          console.error('Error deleting recipe:', err);
          alert('An error occurred while trying to delete the recipe.');
        },
      });
    }
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
