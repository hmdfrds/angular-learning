import { Component, Input, OnInit } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { ColumnState, TaskState } from '../../../state/board.state';

@Component({
  selector: 'app-column',
  imports: [TaskCard],
  templateUrl: './column.html',
  styleUrl: './column.scss'
})
export class Column implements OnInit {

  @Input({ required: true }) column!: ColumnState;
  @Input({ required: true }) tasks!: TaskState[];

  columnTasks: TaskState[] = [];

  ngOnInit(): void {
    const taskMap = new Map(this.tasks.map(task => [task.id, task]));
    this.columnTasks = this.column.taskIds.map(taskId => taskMap.get(taskId)!);
  }
}
