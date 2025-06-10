import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BoardState } from './board.state';
import { BoardActions } from './board.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectBoardState } from './board.reducer';


const LOCAL_STORAGE_KEY = 'kanbanBoardState';

@Injectable()
export class BoardEffects {

  private actions$ = inject(Actions);
  private store = inject(Store<BoardState>);


  loadBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.loadBoard),
    switchMap(() => {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log('Loading board state from localStorage:', savedState);
      if (savedState) {
        try {
          ;
          const { columns, tasks } = JSON.parse(savedState);
          console.log('columns', columns);
          return of(BoardActions.loadBoardSuccess({ columns, tasks }));
        } catch (error) {
          return of(BoardActions.loadBoardFailure({ error: 'Failed to parse saved state.' }))
        }
      }
      console.log('No saved state found, loading default board state');
      return of(BoardActions.loadBoardSuccess({ columns: [], tasks: [] }));
    })
  ))

  saveBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoardSuccess, BoardActions.addTaskSuccess),
      withLatestFrom(this.store.select(selectBoardState)),
      tap(([action, boardState]) => {
        const stateToSave = {
          columns: boardState.columns,
          tasks: boardState.tasks
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
      }),
    ),
    { dispatch: false }
  )

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addTask),
      switchMap(({ taskData }) => of(
        BoardActions.addTaskSuccess({
          task: {
            ...taskData,
            id: `task-${Date.now()}`,
            columnId: 'col-1'
          }
        })
      ))
    )
  );
}
