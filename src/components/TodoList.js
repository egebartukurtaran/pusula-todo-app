import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const TodoList = () => {
    const { items, filter, sortBy, sortOrder } = useSelector(state => state.todos)

    // Filter todos first
    const filteredTodos = items.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })

    // Then sort the filtered todos by date only
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        let comparison = 0

        switch (sortBy) {
            case 'newest':
                comparison = new Date(a.createdAt) - new Date(b.createdAt)

                break
            case 'oldest':
                comparison = new Date(b.createdAt) - new Date(a.createdAt)
                break
            default:
                // Default to newest
                comparison = new Date(b.createdAt) - new Date(a.createdAt)
        }

        // Apply sort order
        return sortOrder === 'asc' ? comparison : -comparison
    })

    const getEmptyMessage = () => {
        if (filter === 'all') return 'Henüz bir görev eklenmedi 📝'
        if (filter === 'active') return 'Aktif görev yok! 🎉'
        return 'Tamamlanmış görev yok 📋'
    }

    return (
        <div className="relative">
            {/* Fixed height container with scroll */}
            <div className="h-64 sm:h-80 lg:h-96 overflow-y-auto overflow-x-hidden border border-gray-200 rounded-lg bg-gray-50 p-2 sm:p-3 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
                {sortedTodos.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                        <div>
                            <div className="text-4xl sm:text-6xl mb-4">😴</div>
                            <p className="text-gray-500 text-base sm:text-lg font-medium">
                                {getEmptyMessage()}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2 sm:space-y-3 pb-2">
                        {sortedTodos.map((todo, index) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                index={index + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoList