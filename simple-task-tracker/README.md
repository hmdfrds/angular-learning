# Simple Task Tracker

This project is a basic To-Do List application built to practice the fundamentals of Angular.

## What the App Will Do

- **Add Tasks**: Input and add new tasks.
- **View Tasks**: Display the list of tasks.
- **Mark as Complete**: Visually mark tasks as completed (e.g., strikethrough).
- **Delete Tasks**: Remove tasks from the list.
- **Persist Tasks**: Tasks are saved in the browser's local storage.

---

## How It Looks and Behaves

![Simple Task Tracker Demo](./assets/demo1.gif)

---

## Core Angular Concepts Touched

This project provides a hands-on introduction to:

- **Components**: `AppComponent`, potentially `TaskListComponent` or `TaskItemComponent`.
- **Templates (HTML)**: Structuring component views.
- **Data Binding**:
  - One-way binding (displaying task data).
  - Two-way binding (e.g., `[(ngModel)]` for the input field).
  - Event binding (e.g., `(click)` for actions).
- **Directives**:
  - `*ngFor`: Looping through tasks.
  - `*ngIf`: Conditional display (e.g., for an empty task list message).
  - `[ngClass]` or `[ngStyle]`: Dynamic styling for tasks.
- **Basic TypeScript**: Using types and classes.
- **Services (Optional)**: Managing task data and logic (e.g., `TaskService`).
- **Angular CLI**: Generating projects, components, and services.

---

**Goal**: Focus on understanding Angular basics and getting core functionality working.
