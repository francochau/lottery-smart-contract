import React from 'react';

const Button = ({ text, color, background, onClick }) => {
  return (
    <div
      className={`rounded-xl ${
        background ?? 'bg-white'
      } ${
        color ?? 'text-gray-800'
      } text-center cursor-pointer py-2 px-5 font-semibold`}
      onClick={onClick}
    >
      <span>{text}</span>
    </div>
  );
};

export default Button;
