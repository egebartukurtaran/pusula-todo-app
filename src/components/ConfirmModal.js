import React from 'react'

// Reusable confirmation modal with danger/warning themes
const ConfirmModal = ({
                          isOpen,
                          onClose,
                          onConfirm,
                          title,
                          message,
                          confirmText = "Evet",
                          cancelText = "İptal",
                          type = "danger" // "danger" or "warning"
                      }) => {
    // Don't render if modal is closed
    if (!isOpen) return null

    // Styling for different modal types
    const typeStyles = {
        danger: {
            confirmButton: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
            icon: "🗑️",
            iconBg: "bg-red-100"
        },
        warning: {
            confirmButton: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500",
            icon: "⚠️",
            iconBg: "bg-yellow-100"
        }
    }

    const styles = typeStyles[type]

    return (
        // Modal overlay
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Background - click to close */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal container - centered */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 transform transition-all">

                    <div className="p-6">
                        {/* Header with icon and title */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center text-xl`}>
                                {styles.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {title}
                                </h3>
                            </div>
                        </div>

                        {/* Message text */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {message}
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 sm:justify-end">
                            {/* Cancel button */}
                            <button
                                onClick={onClose}
                                className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                {cancelText}
                            </button>

                            {/* Confirm button */}
                            <button
                                onClick={() => {
                                    onConfirm()
                                    onClose()
                                }}
                                className={`w-full sm:w-auto px-4 py-2 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 ${styles.confirmButton}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal