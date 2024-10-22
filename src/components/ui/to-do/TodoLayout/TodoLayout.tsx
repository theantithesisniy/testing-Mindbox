import React from 'react';
import {classNames} from '../../../../utils/classNames/classNames';
import cls from './TodoLayout.module.scss';

interface ToDoLayoutProps {
    children: React.ReactNode;
}

const TodoLayout = ({children}: ToDoLayoutProps) => {
    return (
        <div className={classNames(cls.ToDoLayout)}>
            {children}
        </div>
    );
};

export default TodoLayout;