import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-brand-dark text-white hover:bg-brand-green",
    secondary: "bg-brand-cream text-brand-dark hover:bg-white",
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  );
};

export default Button;