import { createSlice } from '@reduxjs/toolkit'

// Load initial state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('todos')
        if (serializedState === null) {
            return {
                items: [],
                filter: 'all'
            }
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return {
            items: [],
            filter: 'all'
        }
    }
}

// Save state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('todos', serializedState)
    } catch (err) {
        // Handle write errors
    }
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: loadState(), // Load from localStorage
    reducers: {
        addTodo: (state, action) => {
            state.items.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
                createdAt: new Date().toISOString()
            })
            saveState(state) // Save after each change
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find(item => item.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
            saveState(state)
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            saveState(state)
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload
            const todo = state.items.find(item => item.id === id)
            if (todo) {
                todo.text = text
            }
            saveState(state)
        },
        setFilter: (state, action) => {
            state.filter = action.payload
            saveState(state)
        },
        clearCompleted: (state) => {
            state.items = state.items.filter(item => !item.completed)
            saveState(state)
        }
    }
})

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilter, clearCompleted } = todoSlice.actions
export default todoSlice.reducer