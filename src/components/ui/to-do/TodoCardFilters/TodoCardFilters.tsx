import React from 'react';
import cls from './TodoCardFilters.module.scss';

interface TodoCardFilterControlsProps {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
    clearCompleted: () => void;
    tasksCount: number;
}

const TodoCardFilterControls: React.FC<TodoCardFilterControlsProps> = (props) => {
    const {
        filter,
        setFilter,
        clearCompleted,
        tasksCount
    } = props;

    return (
        <>
            <div className={cls.ToDoCardFilters}>
                <div className={cls.amount}>{tasksCount} items left</div>
                <div className={cls.filters}>
                    <button
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? cls.activeFilter : ''}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={filter === 'active' ? cls.activeFilter : ''}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={filter === 'completed' ? cls.activeFilter : ''}
                    >
                        Completed
                    </button>
                </div>
                <button onClick={clearCompleted} className={cls.clearCompleted}>
                    Clear Completed
                </button>
            </div>
            <span className={cls.overlayEffect}></span>
            <span className={cls.second__overlayEffect}></span></>

    )
        ;
};

export default React.memo(TodoCardFilterControls);
