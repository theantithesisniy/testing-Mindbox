import {useSelector, useDispatch} from "react-redux";
import {addTask, clearCompletedTasks, toggleTask} from "../../store/slices/TodoSlice";

export interface Checkbox {
    label: string;
    checked: boolean;
}

const useTodo = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: any) => state.todo.tasks) as Checkbox[];

    const addNewTask = (label: string) => {
        if (label.trim()) {
            dispatch(addTask(label));
        }
    };

    const toggleTaskStatus = (index: number) => {
        dispatch(toggleTask(index));
    };

    const clearCompleted = () => {
        dispatch(clearCompletedTasks());
    };

    const filteredTasks = (filter: 'all' | 'active' | 'completed'): Checkbox[] => {
        return tasks.filter((task) => {
            if (filter === 'active') {
                return !task.checked;
            }
            if (filter === 'completed') {
                return task.checked;
            }
            return true; // Если фильтр "all", показываем все задачи
        });
    };

    return {tasks, addNewTask, toggleTaskStatus, clearCompleted, filteredTasks};
};

export default useTodo;
