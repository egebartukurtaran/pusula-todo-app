// Filter.js - Dropdown filter menu
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../store/todoSlice'

const Filter = () => {
    const filter = useSelector(state => state.todos.filter)
    const dispatch = useDispatch()

    const filters = [
        { key: 'all', label: 'Tümü', emoji: '📋' },
        { key: 'active', label: 'Aktif', emoji: '⏳' },
        { key: 'completed', label: 'Tamamlanan', emoji: '✅' }
    ]

    return (
        <div className="mb-6">
            <div className="flex items-center justify-end gap-3">
                <label htmlFor="filter-select" className="text-sm font-medium text-gray-700">
                    Filtrele:
                </label>
                <div className="relative">
                    <select
                        id="filter-select"
                        value={filter}
                        onChange={(e) => dispatch(setFilter(e.target.value))}
                        className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors duration-200"
                    >
                        {filters.map(({ key, label, emoji }) => (
                            <option key={key} value={key}>
                                {emoji} {label}
                            </option>
                        ))}
                    </select>

                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter