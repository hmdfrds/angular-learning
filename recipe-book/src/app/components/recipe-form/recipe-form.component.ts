import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, map, of, Subscription, switchMap, take } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient, InstructionStep, Recipe } from '../../models/reicpe.model';

function positiveNumberValidator(
  control: FormControl
): { [key: string]: boolean } | null {
  if (
    control.value !== undefined &&
    control.value !== null &&
    control.value <= 0
  ) {
    return { positiveNumber: true };
  }
  return null;
}

@Component({
  selector: 'app-recipe-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  editMode = false;
  recipeId: string | null = null;
  private routeSubscription: Subscription | undefined;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      prepTime: [null, [Validators.required, positiveNumberValidator]],
      cookTime: [null, [Validators.required, positiveNumberValidator]],
      servings: [null, [Validators.required, positiveNumberValidator]],
      imageUrl: [''],
      ingredients: this.fb.array([], Validators.required),
      instructions: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.recipeId = params.get('id');
          if (this.recipeId) {
            this.isLoading = true;
            this.editMode = true;
            return this.recipeService.getRecipeById(this.recipeId);
          }
          this.editMode = false;
          this.isLoading = false;

          this.addIngredient();
          this.addInstruction();
          return of(null);
        }),
        catchError((error) => {
          console.error('Error loading recipe for edit:', error);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
          return of(null);
        })
      )
      .subscribe((recipe) => {
        if (this.editMode && recipe) {
          this.patchFormWithRecipeData(recipe);
        }
        this.isLoading = false;
      });
  }

  private patchFormWithRecipeData(recipe: Recipe) {
    this.recipeForm.patchValue({
      name: recipe.name,
      description: recipe.description,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      imageUrl: recipe.imageUrl,
    });

    this.ingredients.clear();
    this.instructions.clear();

    recipe.ingredients.forEach((ingredient) => {
      this.ingredients.push(this.createIngredientGroup(ingredient));
    });

    recipe.instructions.forEach((instruction) => {
      this.instructions.push(this.createInstructionControl(instruction));
    });

    if (this.ingredients.length === 0) {
      this.addIngredient();
    }
    if (this.instructions.length === 0) {
      this.addInstruction();
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredientGroup(ingredient?: Ingredient) {
    return this.fb.group({
      name: [ingredient?.name || '', Validators.required],
      quantity: [
        ingredient?.quantity || null,
        Validators.required,
        positiveNumberValidator,
      ],
      unit: [ingredient?.unit || '', Validators.required],
    });
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientGroup());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
    if (this.ingredients.length === 0) {
      this.addIngredient();
    }
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  createInstructionControl(instruction?: InstructionStep) {
    return this.fb.control(instruction?.description || '', Validators.required);
  }

  addInstruction() {
    this.instructions.push(this.createInstructionControl());
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
    if (this.instructions.length === 0) {
      this.addInstruction();
    }
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      console.error('Form is invalid:', this.recipeForm.value);
      console.log('Form Errors:', this.getFormValidationErrors());
    }

    this.isLoading = true;
    const formValue = this.recipeForm.value;

    const recipeData: Omit<Recipe, 'id'> | Recipe = {
      ...formValue,
      prepTime: Number(formValue.prepTime),
      cookTime: Number(formValue.cookTime),
      servings: Number(formValue.servings),
    };

    if (this.editMode && this.recipeId) {
      this.recipeService
        .updateRecipe({ ...recipeData, id: this.recipeId } as Recipe)
        .pipe(
          take(1),
          catchError((err) => {
            console.error('Error updating recipe:', err);
            this.isLoading = false;
            return of(null);
          })
        )
        .subscribe((updatedRecipe) => {
          this.isLoading = false;
          if (updatedRecipe) {
            this.router.navigate(['/recipes', updatedRecipe.id]);
          }
        });
    } else {
      this.recipeService
        .addRecipe(recipeData as Omit<Recipe, 'id'>)
        .pipe(
          take(1),
          catchError((err) => {
            console.error('Error adding recipe:', err);
            this.isLoading = false;
            return of(null);
          })
        )
        .subscribe((newRecipe) => {
          this.isLoading = false;
          if (newRecipe) {
            this.router.navigate(['/recipes', newRecipe.id]);
          }
        });
    }
  }

  getFormValidationErrors() {
    const errors: any = {};
    Object.keys(this.recipeForm.controls).forEach((key) => {
      const controlErrors = this.recipeForm.get(key)?.errors;
      if (controlErrors) {
        errors[key] = controlErrors;
      }
    });

    if (this.ingredients.errors) {
      errors.ingredientsArray = this.ingredients.errors;
    }

    this.ingredients.controls.forEach((control, index) => {
      if (control.errors) {
        errors[`ingredient_${index}`] = control.errors;
      }
    });

    if (this.instructions.errors) {
      errors.instructionsArray = this.instructions.errors;
    }

    this.instructions.controls.forEach((control, index) => {
      if (control.errors) {
        errors[`instruction_${index}`] = control.errors;
      }
    });
  }

  get name() {
    return this.recipeForm.get('name');
  }
  get description() {
    return this.recipeForm.get('description');
  }
  get prepTime() {
    return this.recipeForm.get('prepTime');
  }
  get cookTime() {
    return this.recipeForm.get('cookTime');
  }
  get servings() {
    return this.recipeForm.get('servings');
  }
  get imageUrl() {
    return this.recipeForm.get('imageUrl');
  }

  getIngredientControl(index: number, fieldName: string) {
    return this.ingredients.at(index)?.get(fieldName);
  }

  getInstructionControl(index: number) {
    return this.instructions.at(index);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
