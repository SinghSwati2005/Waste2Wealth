import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-[#1c2d22] rounded-xl shadow-md border dark:border-[#2c3e30] ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

export function Button({ children, className = '', variant = 'default', ...props }) {
  const base = 'px-4 py-2 rounded-md text-sm font-medium transition duration-200';
  const variants = {
    default: 'bg-[#1eb980] text-white hover:bg-[#169d6c]',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-[#1c2d22] dark:text-white dark:hover:bg-[#263c2b]',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
