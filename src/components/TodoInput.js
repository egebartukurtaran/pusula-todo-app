import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'

const TodoInput = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim()) {
            dispatch(addTodo(text.trim()))
            setText('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            {/* Stack on mobile, flex on desktop */}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Bir yapılacak nesne ekleyin..."
                    className="flex-1 px-4 py-3 sm:py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base placeholder-gray-400 transition-all duration-200"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-base sm:text-sm"
                >
                    + Ekle
                </button>
            </div>
        </form>
    )
}

export default TodoInput