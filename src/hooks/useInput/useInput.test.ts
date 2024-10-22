import React from "react";
import {renderHook, act} from '@testing-library/react';
import useInput from './useInput';

describe('useInput hook', () => {
    test('should initialize with the given initial value', () => {
        const {result} = renderHook(() => useInput('Initial Value'));

        expect(result.current.value).toBe('Initial Value');
        expect(result.current.isActive).toBe(false);
        expect(result.current.error).toBe(null);
    });

    test('should update value on change', () => {
        const {result} = renderHook(() => useInput(''));

        act(() => {
            result.current.handleChange({target: {value: 'New Value'}} as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.value).toBe('New Value');
        expect(result.current.error).toBe(null);
    });

    test('should set error if value is less than 3 characters', () => {
        const {result} = renderHook(() => useInput(''));

        act(() => {
            result.current.handleChange({target: {value: 'ab'}} as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.error).toBe('Minimum 3 characters required');
    });

    test('should set error if value is more than 70 characters', () => {
        const longValue = 'a'.repeat(71);
        const {result} = renderHook(() => useInput(''));

        act(() => {
            result.current.handleChange({target: {value: longValue}} as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.error).toBe('Maximum 70 characters allowed');
    });

    test('should clear error when value is valid', () => {
        const {result} = renderHook(() => useInput(''));

        act(() => {
            result.current.handleChange({target: {value: 'Valid Value'}} as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.error).toBe(null);
    });

    test('should set isActive to true on focus', () => {
        const {result} = renderHook(() => useInput(''));

        act(() => {
            result.current.handleFocus();
        });

        expect(result.current.isActive).toBe(true);
    });

    test('should set isActive to false on blur if value is empty', () => {
        const {result} = renderHook(() => useInput(''));

        act(() => {
            result.current.handleFocus(); // Сначала устанавливаем isActive в true
        });

        act(() => {
            result.current.handleBlur(); // Потеря фокуса при пустом значении
        });

        expect(result.current.isActive).toBe(false);
    });

    test('should not change isActive on blur if value is not empty', () => {
        const {result} = renderHook(() => useInput('Some Value'));

        act(() => {
            result.current.handleFocus(); // Устанавливаем isActive в true
        });

        act(() => {
            result.current.handleBlur(); // Потеря фокуса при непустом значении
        });

        expect(result.current.isActive).toBe(true); // isActive остается true
    });
});
