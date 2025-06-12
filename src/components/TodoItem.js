// TodoItem.js - Individual todo item with edit, delete, and completion functionality
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, editTodo } from '../store/todoSlice'
import ConfirmModal from './ConfirmModal'

const TodoItem = ({ todo }) => {
    // Local state for editing and modal management
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const dispatch = useDispatch()

    // Handle edit save - show confirmation if text changed
    const handleEdit = () => {
        if (editText.trim() && editText !== todo.text) {
            setShowEditModal(true)
        } else {
            setIsEditing(false)
        }
    }

    // Confirm and save edit changes
    const confirmEdit = () => {
        dispatch(editTodo({ id: todo.id, text: editText.trim() }))
        setIsEditing(false)
    }

    // Confirm and delete todo
    const confirmDelete = () => {
        dispatch(deleteTodo(todo.id))
    }

    // Cancel editing and restore original text
    const cancelEdit = () => {
        setEditText(todo.text)
        setIsEditing(false)
    }

    // Handle keyboard shortcuts in edit mode
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEdit()
        } else if (e.key === 'Escape') {
            cancelEdit()
        }
    }

    return (
        <>
            {/* Main todo item container with dynamic styling */}
            <div className={`group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 rounded-xl transition-all duration-200 ${
                todo.completed
                    ? 'bg-gray-50 border-gray-200 opacity-75'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}>

                {/* Completion checkbox */}
                <div className="flex-shrink-0">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleTodo(todo.id))}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                </div>

                {/* Todo text content - either edit mode or display mode */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        // Edit mode - input field with save/cancel buttons
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                autoFocus
                            />
                            {/* Edit action buttons */}
                            <div className="flex gap-2 sm:flex-shrink-0">
                                <button
                                    onClick={handleEdit}
                                    className="flex-1 sm:flex-none px-2 py-1 sm:px-3 sm:py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm font-medium transition-colors duration-200"
                                    title="Kaydet"
                                >
                                    ✓ Kaydet
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="flex-1 sm:flex-none px-2 py-1 sm:px-3 sm:py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-xs sm:text-sm font-medium transition-colors duration-200"
                                    title="İptal"
                                >
                                    ✕ İptal
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Display mode - todo text with completion styling
                        <span
                            className={`block cursor-pointer text-sm sm:text-base leading-relaxed ${
                                todo.completed
                                    ? 'line-through text-gray-500 hover:text-gray-700'
                                    : 'text-gray-900 hover:text-blue-600'
                            }`}
                            onDoubleClick={() => setIsEditing(true)}
                            style={{ wordBreak: 'break-word' }}
                        >
                            {todo.text}
                        </span>
                    )}
                </div>

                {/* Action buttons - edit and delete (hidden during editing) */}
                <div className="flex-shrink-0 flex gap-1 sm:gap-2">
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className={`p-2 rounded-lg transition-colors duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 ${
                                todo.completed
                                    ? 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                    : 'text-blue-600 hover:bg-blue-50'
                            }`}
                            title={todo.completed ? "Tamamlanan görevi düzenle" : "Düzenle"}
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    )}

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                        title="Sil"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Delete confirmation modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Görevi Sil"
                message={`"${todo.text}" görevini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
                confirmText="Sil"
                cancelText="İptal"
                type="danger"
            />

            {/* Edit confirmation modal */}
            <ConfirmModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onConfirm={confirmEdit}
                title="Değişiklikleri Kaydet"
                message={`"${todo.text}" görevini "${editText}" olarak değiştirmek istediğinize emin misiniz?`}
                confirmText="Kaydet"
                cancelText="İptal"
                type="warning"
            />
        </>
    )
}

export default TodoItem