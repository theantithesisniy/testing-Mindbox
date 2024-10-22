import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Checkbox {
    label: string;
    checked: boolean;
}

interface TodoState {
    tasks: Checkbox[];
}

const initialState: TodoState = {
    tasks: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            if (action.payload.trim()) {
                state.tasks.push({label: action.payload, checked: false});
            }
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            const task = state.tasks[action.payload];
            if (task) {
                task.checked = !task.checked;
            }
        },
        clearCompletedTasks: (state) => {
            state.tasks = state.tasks.filter((task) => !task.checked);
        }
    },
});

export const {addTask, toggleTask, clearCompletedTasks} = todoSlice.actions;
export default todoSlice.reducer;
