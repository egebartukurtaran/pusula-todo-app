// store/index.js - Redux store configuration
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'

// Configure Redux store with todo reducer
export const store = configureStore({
    reducer: {
        todos: todoReducer // Mount todo reducer under 'todos' key
    }
})