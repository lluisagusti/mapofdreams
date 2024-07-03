import React from 'react';

export const Button = ({ children, className = '', ...props }) => (
  <button 
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`} 
    {...props}
  >
    {children}
  </button>
);

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => (
  <div className="mt-2">{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const DialogFooter = ({ children }) => (
  <div className="mt-4 flex justify-end">{children}</div>
);

export const Input = ({ className = '', ...props }) => (
  <input 
    className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} 
    {...props} 
  />
);

export const Select = ({ children, className = '', ...props }) => (
  <select 
    className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} 
    {...props}
  >
    {children}
  </select>
);