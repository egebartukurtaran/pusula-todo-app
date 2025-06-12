// useLocalStorage.js - Custom hook for persisting todos to localStorage
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useLocalStorage = () => {
    // Get entire todos state from Redux store
    const todos = useSelector(state => state.todos)

    // Automatically save todos to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos))
        } catch (error) {
            // Handle localStorage errors (e.g., quota exceeded, disabled storage)
            console.error('Error saving to localStorage:', error)
        }
    }, [todos]) // Re-run effect when todos state changes

    // Return todos state for component use
    return todos
}