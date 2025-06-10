export interface TaskState {
    id: string;
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    assignee: string;
    columnId: string;
}

export interface ColumnState {
    id: string;
    title: string;
    taskIds: string[];
}

export interface BoardState {
    columns: ColumnState[];
    tasks: TaskState[];
    loading: boolean;
    error: string | null;
}