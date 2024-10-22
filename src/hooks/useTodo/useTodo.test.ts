import {renderHook, act} from '@testing-library/react';
import {useDispatch, useSelector} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import useTodo, {Checkbox} from './useTodo';
import {addTask, toggleTask, clearCompletedTasks} from '../../store/slices/TodoSlice';

const initialState = {};
const mockStore = configureMockStore([]);
let store = mockStore(initialState);

// Замокать хуки до начала тестов
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Переменные для mock-функций
let mockDispatch: jest.Mock;
let mockedUseSelector: jest.Mock;
let mockedUseDispatch: jest.Mock;

describe('useTodo hook', () => {
    beforeEach(() => {
        store = mockStore({
            todo: {
                tasks: [
                    {label: 'Task 1', checked: false},
                    {label: 'Task 2', checked: true},
                ] as Checkbox[],
            },
        });

        // Присваиваем mock-функции для useSelector и useDispatch
        mockedUseSelector = useSelector as unknown as jest.Mock;
        mockedUseDispatch = useDispatch as unknown as jest.Mock;

        // Очищаем моки перед каждым тестом
        mockedUseSelector.mockClear();
        mockedUseDispatch.mockClear();

        // Создаем мок-функцию для dispatch
        mockDispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(mockDispatch);

        // Мокаем useSelector, чтобы возвращать данные из store
        mockedUseSelector.mockImplementation((selectorFn) => selectorFn(store.getState()));
    });

    test('should add a new task', () => {
        const {result} = renderHook(() => useTodo());

        act(() => {
            result.current.addNewTask('New Task');
        });

        expect(mockDispatch).toHaveBeenCalledWith(addTask('New Task'));
    });

    test('should toggle task status', () => {
        const {result} = renderHook(() => useTodo());

        act(() => {
            result.current.toggleTaskStatus(0);
        });

        expect(mockDispatch).toHaveBeenCalledWith(toggleTask(0));
    });

    test('should clear completed tasks', () => {
        const {result} = renderHook(() => useTodo());

        act(() => {
            result.current.clearCompleted();
        });

        expect(mockDispatch).toHaveBeenCalledWith(clearCompletedTasks());
    });

    test('should filter tasks by "all"', () => {
        const {result} = renderHook(() => useTodo());

        const tasks = result.current.filteredTasks('all');
        expect(tasks).toEqual([
            {label: 'Task 1', checked: false},
            {label: 'Task 2', checked: true},
        ]);
    });

    test('should filter tasks by "active"', () => {
        const {result} = renderHook(() => useTodo());

        const tasks = result.current.filteredTasks('active');
        expect(tasks).toEqual([{label: 'Task 1', checked: false}]);
    });

    test('should filter tasks by "completed"', () => {
        const {result} = renderHook(() => useTodo());

        const tasks = result.current.filteredTasks('completed');
        expect(tasks).toEqual([{label: 'Task 2', checked: true}]);
    });
});
