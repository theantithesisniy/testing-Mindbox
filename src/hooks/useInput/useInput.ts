import React, {useState} from "react";

const useInput = (initialValue: string) => {
    const [value, setValue] = useState<string>(initialValue);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (newValue.length < 3) {
            setError('Minimum 3 characters required');
        } else if (newValue.length > 70) {
            setError('Maximum 70 characters allowed');
        } else {
            setError(null);
        }

        setValue(newValue);
    };

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        if (value.trim() === '') {
            setIsActive(false);
        }
    };

    return {value, isActive, error, handleChange, handleFocus, handleBlur, setValue};
};

export default useInput;
