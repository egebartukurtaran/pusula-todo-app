import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCompleted, setFilter, setSorting } from '../store/todoSlice'
import ConfirmModal from './ConfirmModal'

// Filter component - handles filtering, sorting, and bulk delete operations
const Filter = () => {

    // Get state from Redux store
    const { filter, sortBy, sortOrder, items } = useSelector(state => state.todos)
    const dispatch = useDispatch()

    // Local state for delete confirmation modal
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false)

    // Filter options for dropdown
    const filters = [
        { key: 'all', label: 'Tümü', emoji: '📋' },
        { key: 'active', label: 'Aktif', emoji: '⏳' },
        { key: 'completed', label: 'Tamamlanan', emoji: '✅' }
    ]

    // Sort options for dropdown
    const sortOptions = [
        { value: 'newest', label: 'En Yeni', icon: '🆕' },
        { value: 'oldest', label: 'En Eski', icon: '📅' }
    ]


    // Handle sort change with smart order toggling
    const handleSortChange = (newSortBy) => {
        // If same sort type selected, toggle order; otherwise default to desc
        const newSortOrder = sortBy === newSortBy && sortOrder === 'desc' ? 'asc' : 'desc'
        dispatch(setSorting({ sortBy: newSortBy, sortOrder: newSortOrder }))
    }

    // Count completed todos for delete button
    const completedCount = items.filter(todo => todo.completed).length

    // Handle bulk delete of completed todos
    const handleDeleteAll = () => {
        dispatch(clearCompleted())
        setShowDeleteAllModal(false)
    }

    return (
        <>
            <div className="mb-6">
                {/* Main controls container - responsive layout */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-4">

                    {/* Delete completed todos button */}
                    <div className="flex items-center gap-3">
                        {completedCount > 0 && (
                            <button
                                onClick={() => setShowDeleteAllModal(true)}
                                className="px-4 py-2 bg-red-500 text-white border border-red-500 rounded-lg hover:bg-red-600 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer transition-colors duration-200 text-sm font-medium"
                            >
                                🗑️ Tamamlananları Sil ({completedCount})
                            </button>
                        )}
                    </div>

                    {/* Filter dropdown */}
                    <div className="flex items-center gap-3">
                        <label htmlFor="filter-select" className="text-sm font-medium text-gray-700 flex-shrink-0">
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

                    {/* Sort dropdown */}
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-gray-700 flex-shrink-0">
                            Sırala:
                        </label>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors duration-200"
                            >
                                {sortOptions.map(({ value, label, icon }) => (
                                    <option key={value} value={value}>
                                        {icon} {label}
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
            </div>

            {/* Confirmation modal for delete all action */}
            <ConfirmModal
                isOpen={showDeleteAllModal}
                onClose={() => setShowDeleteAllModal(false)}
                onConfirm={handleDeleteAll}
                title="Tamamlanan Görevleri Sil"
                message={`${completedCount} adet tamamlanmış görevi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
                confirmText="Evet, Hepsini Sil"
                cancelText="İptal"
                type="danger"
            />
        </>
    )
}

export default Filter