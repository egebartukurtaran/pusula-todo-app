import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useLocalStorage = () => {
    const todos = useSelector(state => state.todos)

    // Save todos to localStorage whenever todos state changes
    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos))
        } catch (error) {
            console.error('Error saving to localStorage:', error)
        }
    }, [todos])

    return todos
}