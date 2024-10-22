import {render, screen, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import TodoCard from "./TodoCard";
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';


const initialState = {};
const mockStore = configureStore([]);
let store = mockStore(initialState);

describe('TodoCard', () => {

    beforeEach(() => {
        store = mockStore({
            todo: {
                tasks: [],
            },
        });
    });

    test('renders TodoCard component', () => {
        render(
            <Provider store={store}>
                <TodoCard/>
            </Provider>
        );

        expect(screen.getByPlaceholderText('Whats needs to be done?')).toBeInTheDocument();
    });

    test('adds a new task on Enter key press', () => {
        render(
            <Provider store={store}>
                <TodoCard/>
            </Provider>
        );

        const input = screen.getByPlaceholderText('Whats needs to be done?');
        fireEvent.change(input, {target: {value: 'New Task'}});
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'});

        const actions = store.getActions();
        expect(actions).toContainEqual({type: 'todo/addTask', payload: 'New Task'});
    });
});