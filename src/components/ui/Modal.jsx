import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
    if (!isOpen) return null;

    // Size classes
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col overflow-hidden transform transition-all scale-100`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    {children}
                </div>
                {footer && (
                    <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50 flex-shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
