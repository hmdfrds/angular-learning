import { Component, Input } from '@angular/core';
import { TaskState } from '../../../state/board.state';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCard {
  @Input({ required: true }) task!: TaskState;
}
