// TodoList.js - Scrollable list with fixed height (Pure Tailwind)
import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const TodoList = () => {
    const { items, filter } = useSelector(state => state.todos)

    const filteredTodos = items.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })

    const getEmptyMessage = () => {
        if (filter === 'all') return 'Henüz bir görev eklenmedi 📝'
        if (filter === 'active') return 'Aktif görev yok! 🎉'
        return 'Tamamlanmış görev yok 📋'
    }

    return (
        <div className="relative">
            {/* Fixed height container with scroll - Pure Tailwind */}
            <div className="h-64 sm:h-80 lg:h-96 overflow-y-auto overflow-x-hidden border border-gray-200 rounded-lg bg-gray-50 p-2 sm:p-3 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
                {filteredTodos.length === 0 ? (
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
                        {filteredTodos.map(todo => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                )}
            </div>

            {/* Scroll indicator */}
            {filteredTodos.length > 3 && (
                <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full opacity-60 pointer-events-none">
                    {filteredTodos.length} items
                </div>
            )}
        </div>
    )
}

export default TodoList