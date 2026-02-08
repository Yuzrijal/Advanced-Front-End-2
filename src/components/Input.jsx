import React from 'react';

const Input = ({ label, type, placeholder, name }) => {
  return (
    <div className="mb-5">
      <label className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-[#1e1e1e] text-white rounded-full py-3 px-5 border border-gray-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
      />
    </div>
  );
};

export default Input;