import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent {
  newTaskTitle = '';
  tasks: any[] = [];

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
  }
}
