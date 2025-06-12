// Header.js - Displays app title and todo statistics
import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
    // Get todos from Redux store
    const { items } = useSelector(state => state.todos)

    // Calculate statistics
    const activeCount = items.filter(todo => !todo.completed).length
    const completedCount = items.filter(todo => todo.completed).length

    return (
        <div className="text-center mb-6 sm:mb-8">
            {/* App title with responsive sizing */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                📝 Pusula ToDo App
            </h1>

            {/* Statistics badges - responsive layout */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                <div className="flex gap-4 sm:gap-6">
                    {/* Total todos count */}
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        Toplam: {items.length}
                    </span>

                    {/* Active todos count */}
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        Aktif: {activeCount}
                    </span>

                    {/* Completed todos count */}
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                        Tamamlanan: {completedCount}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header