import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ColumnState, TaskState } from './board.state';
export type TaskFormData = Omit<TaskState, 'id' | 'columnId'>;
export const BoardActions = createActionGroup({
    source: 'Board',
    events: {
        'Load Board': emptyProps(),
        'Load Board Success': props<{ columns: ColumnState[], tasks: TaskState[] }>(),
        'Load Board Failure': props<{ error: string }>(),
        'Add Task': props<{ taskData: TaskFormData }>(),
        'Add Task Success': props<{ task: TaskState }>(),
        'Add Task Failure': props<{ error: string }>(),
    }
})