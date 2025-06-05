# Recipe Book 📖

A client-side Angular application for creating, viewing, and managing a collection of recipes. Built to demonstrate dynamic data handling, reactive forms, and component-based architecture.

## Core Features

- **Recipe Listing**: Displays all available recipes with key details.
- **Recipe Details**: Shows full information for a selected recipe.
- **Add/Edit Recipes**: A reactive form to create new recipes or modify existing ones.
  - Dynamically add/remove ingredients (with name, quantity, unit).
  - Dynamically add/remove instruction steps.
- **Input Validation**: Ensures data integrity for all recipe fields.
- **Delete Recipes**: Removes recipes from the collection (with confirmation).
- **In-Memory Data**: Uses an Angular service with RxJS for reactive, in-memory data management.

## Key Angular Concepts Used

- **Angular Router**: For navigation between views (`/recipes`, `/recipes/new`, `/recipes/:id`, `/recipes/:id/edit`).
- **Reactive Forms**: `FormGroup`, `FormControl`, `FormArray` for complex, dynamic forms.
- **Services & Dependency Injection**: `RecipeService` for data management.
- **RxJS**: `BehaviorSubject` for reactive data streams and automatic view updates.
- **Components**: Modular UI structure.
- **TypeScript**: For typed data models (`Recipe`, `Ingredient`, `InstructionStep`).
- **Built-in Pipes**: Primarily `async`.
