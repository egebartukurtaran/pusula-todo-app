// TodoInput.js - Input form for adding new todos with loading states
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'

const TodoInput = () => {
    // Local state for input text and loading
    const [text, setText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch()

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Only submit if text exists and not already submitting
        if (text.trim() && !isSubmitting) {
            setIsSubmitting(true)

            // Add delay to show loading state for better UX
            setTimeout(() => {
                dispatch(addTodo(text.trim()))
                setText('') // Clear input after adding
                setIsSubmitting(false)
            }, 200)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            {/* Responsive layout - stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row gap-3">

                {/* Text input field */}
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Bir yapılacak nesne ekleyin..."
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 sm:py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base placeholder-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* Submit button with loading state */}
                <button
                    type="submit"
                    disabled={!text.trim() || isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-base sm:text-sm flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            {/* Loading spinner */}
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                            </svg>
                            Ekleniyor...
                        </>
                    ) : (
                        <>
                            + Ekle
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

export default TodoInput