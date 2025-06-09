export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    assignee: string;
    columnId: string;
}

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

export interface BoardState {
    columns: Column[];
    tasks: Task[];
    loading: boolean;
    error: string | null;
}