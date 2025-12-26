import React from 'react';
import { X } from 'lucide-react';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showClose = true
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'max-w-7xl'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className={`
            relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]}
            transform transition-all
          `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    {(title || showClose) && (
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            {title && (
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {title}
                                </h2>
                            )}
                            {showClose && (
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
