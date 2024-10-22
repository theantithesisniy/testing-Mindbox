import React from 'react';
import cls from './TaskItem.module.scss';
import {Checkbox} from "../../../../hooks/useTodo/useTodo";

interface TaskItemProps {
    task: Checkbox;
    index: number;
    toggleTaskStatus: (index: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {
    const {task, index, toggleTaskStatus} = props;
    return (
        <div className={cls.ToDoCardItem}>
            <label className={cls.checkbox}>
                <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleTaskStatus(index)}
                />
                <span className={cls.checkmark}></span>
            </label>
            <span className={`${task.checked ? cls.checked : ''}`}>
                {task.label}
            </span>
        </div>
    );
};

export default React.memo(TaskItem);
