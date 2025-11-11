const Button = ({ variant = "primary", onClick, children }) => {
  const baseStyles =
    "px-5 py-2 rounded-md font-semibold transition-all duration-200 focus:outline-none";

  const variantStyles = {
    primary: "bg-orange-600 text-white",
    secondary:
      "bg-white text-black border  hover:bg-orange-600 hover:text-white",
  };
  return (
    <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all">
      <button
        className={`${baseStyles} ${variantStyles[variant]}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
