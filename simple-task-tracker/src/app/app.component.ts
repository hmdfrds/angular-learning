import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit {
  newTaskTitle = '';
  tasks: any[] = [];
  private readonly storageKey = 'angularTaskTrackerTasks';

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  private loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem(this.storageKey);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  addTask() {
    if (this.newTaskTitle.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: this.newTaskTitle.trim(),
      completed: false,
    };
    this.tasks.push(newTask);
    this.newTaskTitle = '';
    this.saveTasksToLocalStorage();
  }

  toggleComplete(task: any) {
    task.completed = !task.completed;
    this.saveTasksToLocalStorage();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasksToLocalStorage();
  }
}
