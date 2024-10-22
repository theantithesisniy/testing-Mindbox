import React, {KeyboardEvent} from 'react';
import cls from './TaskInput.module.scss';
import logo from '../../../../images/icons8-шеврон-вниз-30.png'

interface TaskInputProps {
    value: string;
    isActive: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    handleFocus: () => void;
    handleBlur: () => void;
}

const TaskInput: React.FC<TaskInputProps> = (props) => {
    const {
        value,
        isActive,
        handleChange,
        handleKeyDown,
        handleFocus,
        handleBlur,
    } = props;

    return (
        <div className={cls.ToDoCard}>
            <img src={logo} alt="arrow down" className={cls.icon}/>
            <input
                type="text"
                className={`${cls.input} ${isActive ? cls.activeInput : ''}`}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Whats needs to be done?"
            />
        </div>
    );
};

export default React.memo(TaskInput);
