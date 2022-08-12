import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../utils/model.utli";

export interface TaskState {
    tasks: Task[];
    loading: boolean;
}

const initialState: TaskState = {
    tasks: [] as Task[],
    loading: false,
} as const;

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasks: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.tasks>
        ) => {
            state.tasks = action.payload;
        },

        addTask: (
            state: Draft<typeof initialState>,
            action: PayloadAction<Task>
        ) => {
            state.tasks = [...state.tasks, action.payload];
        },

        updateTask: (
            state: Draft<typeof initialState>,
            action: PayloadAction<Task>
        ) => {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }
                return task;
            });
        },

        deleteTask: (
            state: Draft<typeof initialState>,
            action: PayloadAction<number>
        ) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        setTaskLoading: (state: Draft<typeof initialState>, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    },
});

export const { setTasks, addTask, updateTask, deleteTask, setTaskLoading } = taskSlice.actions;

// export const selectTaskState = (state: TaskState) => state;

export default taskSlice.reducer;
