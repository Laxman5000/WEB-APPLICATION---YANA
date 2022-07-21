import { createSlice } from "@reduxjs/toolkit";
import http from "../utils/http";

export const saveTodo = (todo) => localStorage.setItem('todo', JSON.stringify(todo));

const createTodo = async (data) => {
    const dblist = await http.post('/api/v1/users/addTodo', data).then((res) => res).catch((err) => console.log(err));
    if (dblist) {
        return dblist;
    }
}

export const getUserTodo = async () => {
    const todo = await http.get('/api/v1/users/getTodo').then((res) => res).catch((err) => console.log(err));
    if (todo) {
        return todo;
    }
    return [];
        
}

const deleteTodoItemFromServer = async (id) => {
    const todo = await http.post('/api/v1/users/deleteTodo', { id }).then((res) => res).catch((err) => console.log(err));
    return todo;
}
export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todoitems: JSON.parse(localStorage.getItem('todo')) || [],
        raw: {
            id: 0,
            title: "",
            completed: false,
            synced: false,
            level: 2,
        },
    },
    reducers: {
        addTodo: (state, action) => {
            state.raw.id = Math.random().toString(36).substr(2, 4);
            state.todoitems.push(state.raw);
            if (localStorage.getItem('token')) {
                const data = createTodo(state.raw)
                data.then((v) => v && saveTodo(v))
            } else {
                saveTodo(state.todoitems);
            }
            state.raw = { id: 0, title: "", completed: false, synced: false, level: 2 };
            return state;
        },
        createTodoItem: (state, action) => {
            state.raw.title = action.payload;
        },
        deleteTodoItem: (state, action) => {
            state.todoitems = state.todoitems.filter(item => item.id !== action.payload);
            if (localStorage.getItem('token')) {
                deleteTodoItemFromServer(action.payload).then((v) => v && setTodos(v))
            }
            saveTodo(state.todoitems);
            return state;
        },
        toggleTodoItem: (state, action) => {
            state.todoitems = state.todoitems.map(item => {
                if (item.id === action.payload) {
                    item.completed = !item.completed;
                }
                return item;
            });
            saveTodo(state.todoitems);
        },
        setTodos: (state, action) => {
            state.todoitems = !action.payload.success ? state.todoitems : action.payload;
            saveTodo(state.todoitems);
        },
        refresh :(state, action) => {
            state.todoitems = action.payload;
            return state;
        }



    },
    extraReducers: {}
});



export const { addTodo, createTodoItem, deleteTodoItem, toggleTodoItem, setTodos,refresh } = todoSlice.actions;
export const todoSelector = state => state.todo;