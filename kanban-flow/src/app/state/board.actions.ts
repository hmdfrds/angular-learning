import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Column, Task } from './board.state';

export const BoardActions = createActionGroup({
    source: 'Board',
    events: {
        'Load Board': emptyProps(),
        'Load Board Success': props<{ columns: Column[], tasks: Task[] }>(),
        'Load Board Failure': props<{ error: string }>(),
    }
})