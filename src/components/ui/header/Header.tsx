import React from 'react';
import {classNames} from "../../../utils/classNames/classNames";
import cls from "./Header.module.scss";

interface HeaderProps {
    header: string;
}

const Header = ({header}: HeaderProps) => {
    return (
        <div>
            <h3 className={classNames(cls.header)}>{header}</h3>
        </div>
    );
};

export default Header;