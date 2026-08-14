import React from 'react';

const variants = {
  primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-md',
  outline: 'border border-orange-500 text-orange-500 hover:bg-orange-50',
  ghost: 'text-orange-500 hover:bg-orange-50',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5',
  lg: 'px-7 py-3 text-lg',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}