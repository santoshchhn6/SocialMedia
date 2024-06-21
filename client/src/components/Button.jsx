const Button = ({ type = "button", children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex items-center gap-3 border border-gray-600 py-1 px-2 rounded-md hover:text-gray-500 hover:border-gray-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
