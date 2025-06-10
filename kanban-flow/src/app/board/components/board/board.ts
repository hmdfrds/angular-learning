import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Column } from '../column/column';
import { Store } from '@ngrx/store';
import { BoardActions, TaskFormData } from '../../../state/board.actions';
import { selectColumns, selectTasks } from '../../../state/board.reducer';
import { Observable } from 'rxjs';
import { ColumnState, TaskState } from '../../../state/board.state';
import { Header } from "../header/header";
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-board',
  imports: [AsyncPipe, Column, Header],
  templateUrl: './board.html',
  styleUrl: './board.scss'
})
export class Board implements OnInit {
  columns$: Observable<ColumnState[]>;
  tasks$: Observable<TaskState[]>;

  constructor(private store: Store, private dialog: MatDialog) {

    this.columns$ = store.select(selectColumns);
    this.tasks$ = store.select(selectTasks);
    this.store.dispatch(BoardActions.loadBoard());
  }

  ngOnInit() {
    this.store.dispatch(BoardActions.loadBoard());
  }

  onAddTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      panelClass: 'task-dialog',
    });
    dialogRef.afterClosed().subscribe((result: TaskFormData | undefined) => {
      if (result) {
        this.store.dispatch(BoardActions.addTask({ taskData: result }))
      }
    })
  }

}
