// todoSlice.js - Redux slice for todo state management with localStorage persistence
import { createSlice } from '@reduxjs/toolkit'

// Load initial state from localStorage on app startup
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('todos')
        if (serializedState === null) {
            // Return default state if no saved data
            return {
                items: [],
                filter: 'all',
                sortBy: 'newest',
                sortOrder: 'desc'
            }
        }
        const state = JSON.parse(serializedState)
        // Merge saved state with defaults to handle missing properties
        return {
            items: state.items || [],
            filter: state.filter || 'all',
            sortBy: state.sortBy || 'newest',
            sortOrder: state.sortOrder || 'desc'
        }
    } catch (err) {
        // Return default state if localStorage is corrupted or unavailable
        return {
            items: [],
            filter: 'all',
            sortBy: 'newest',
            sortOrder: 'desc'
        }
    }
}

// Save current state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('todos', serializedState)
    } catch (err) {
        // Silently fail if localStorage is not available
    }
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: loadState(), // Load persisted state
    reducers: {
        // Add new todo with timestamp
        addTodo: (state, action) => {
            state.items.push({
                id: Date.now(), // Simple ID generation
                text: action.payload,
                completed: false,
                createdAt: new Date().toISOString()
            })
            saveState(state)
        },

        // Toggle todo completion status
        toggleTodo: (state, action) => {
            const todo = state.items.find(item => item.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
            saveState(state)
        },

        // Remove todo by ID
        deleteTodo: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            saveState(state)
        },

        // Update todo text
        editTodo: (state, action) => {
            const { id, text } = action.payload
            const todo = state.items.find(item => item.id === id)
            if (todo) {
                todo.text = text
            }
            saveState(state)
        },

        // Set filter type (all/active/completed)
        setFilter: (state, action) => {
            state.filter = action.payload
            saveState(state)
        },

        // Remove all completed todos
        clearCompleted: (state) => {
            state.items = state.items.filter(item => !item.completed)
            saveState(state)
        },

        // Update sorting preferences
        setSorting: (state, action) => {
            const { sortBy, sortOrder } = action.payload
            state.sortBy = sortBy
            state.sortOrder = sortOrder
            saveState(state)
        }
    }
})

// Export action creators
export const {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    clearCompleted,
    setSorting
} = todoSlice.actions

// Export reducer
export default todoSlice.reducer