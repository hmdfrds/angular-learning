import { createFeature, createReducer, on } from "@ngrx/store";
import { BoardState } from "./board.state";
import { BoardActions } from "./board.actions";

export const initialState: BoardState = {
    columns: [
        {
            id: 'col-1',
            title: 'To Do',
            taskIds: []
        },
        {
            id: 'col-2',
            title: 'In Progress',
            taskIds: []
        },
        {
            id: 'col-3',
            title: 'Done',
            taskIds: []
        }
    ],
    tasks: [],
    loading: false,
    error: null
}

export const boardFeature = createFeature({
    name: 'board',
    reducer: createReducer(
        initialState,
        on(BoardActions.loadBoard, (state) => ({
            ...state,
            loading: true,
        })),
        on(BoardActions.loadBoardSuccess, (state, { columns, tasks }) => ({
            ...state,
            columns,
            tasks,
            loading: false,
            error: null,
        })),
        on(BoardActions.loadBoardFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        })),
        on(BoardActions.addTaskSuccess, (state, { task }) => {
            const newTasks = [...state.tasks, task];
            const newColumns = state.columns.map(col => {
                if (col.id === task.columnId) {
                    return {
                        ...col, taskIds: [...col.taskIds, task.id]
                    }
                }
                return col;
            })
            return { ...state, tasks: newTasks, columns: newColumns };
        })
    )
})

export const {
    name,
    reducer,
    selectBoardState,
    selectColumns,
    selectTasks,
    selectLoading,
    selectError
} = boardFeature;