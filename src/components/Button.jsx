import React from 'react';

const Button = ({ text, onClick, variant = 'primary', type = 'button', className }) => {
  const baseStyle = "w-full py-3 px-6 rounded-full font-bold transition duration-300 ease-in-out";
  const styles = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-lg", 
    secondary: "bg-transparent border border-white text-white hover:bg-white hover:text-black", 
    dark: "bg-gray-800 text-white hover:bg-gray-700" 
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseStyle} ${styles[variant]} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;