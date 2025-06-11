import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const useTodos = () => {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    // Save to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    // Load from localStorage on initial render
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos')
        if (savedTodos) {
            // You'll need to add a loadTodos action to your slice
            // dispatch(loadTodos(JSON.parse(savedTodos)))
        }
    }, [dispatch])

    return todos
}