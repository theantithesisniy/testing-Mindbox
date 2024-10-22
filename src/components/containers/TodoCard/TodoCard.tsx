import React, {KeyboardEvent, useState, useCallback} from 'react';
import useTodo from '../../../hooks/useTodo/useTodo';
import useInput from '../../../hooks/useInput/useInput';
import {Checkbox} from "../../../hooks/useTodo/useTodo";
import TaskItem from "../../ui/to-do/TaskItem/TaskItem";
import TodoCardFilterControls from "../../ui/to-do/TodoCardFilters/TodoCardFilters";
import TaskInput from "../../ui/to-do/TaskInput/TaskInput";
import TodoLayout from "../../ui/to-do/TodoLayout/TodoLayout";
import Header from "../../ui/header/Header";

const FILTER_OPTIONS = {
    ALL: 'all' as const,
    ACTIVE: 'active' as const,
    COMPLETED: 'completed' as const,
};

const TodoCard: React.FC = () => {
    const {addNewTask, toggleTaskStatus, clearCompleted, filteredTasks} = useTodo();
    const {value, isActive, error, handleChange, handleFocus, handleBlur, setValue} = useInput('');
    const [filter, setFilter] = useState<typeof FILTER_OPTIONS[keyof typeof FILTER_OPTIONS]>(FILTER_OPTIONS.ALL);

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !error) {
            addNewTask(value);
            setValue('');
        }
    }, [addNewTask, error, setValue, value]);

    const tasks = filteredTasks(filter);
    const tasksCount = tasks.length;

    return (
        <TodoLayout>
            <Header header='todos'/>
            <TaskInput
                value={value}
                isActive={isActive}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
            />
            {tasks.map((task: Checkbox, index: number) => (
                <TaskItem key={task.label} task={task} index={index} toggleTaskStatus={toggleTaskStatus}/>
            ))}
            <TodoCardFilterControls
                filter={filter}
                setFilter={setFilter}
                clearCompleted={clearCompleted}
                tasksCount={tasksCount}
            />
        </TodoLayout>
    );
};

export default TodoCard;
