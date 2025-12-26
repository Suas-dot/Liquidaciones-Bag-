import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    icon: Icon,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500 shadow-sm",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-transparent",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && Icon && <Icon className="mr-2 h-4 w-4" />}
            {children}
        </button>
    );
};

export default Button;
