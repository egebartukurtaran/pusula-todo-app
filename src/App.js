import React from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import Filter from './components/Filter'
import TodoList from './components/TodoList'

function App() {
    useLocalStorage()

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-4 sm:py-8">
            <div className="container bg-white rounded-xl mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
                <Header />
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                    <TodoInput />
                    <Filter />
                    <TodoList />
                </div>
            </div>
        </div>
    )
}

export default App